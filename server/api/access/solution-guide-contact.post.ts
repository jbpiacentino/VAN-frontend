type ContactPayload = {
  documentType?: string;
  guideSlug?: string;
  guideTitle?: string;
  eventType?: string;
  accessMethod?: string;
  fullName?: string;
  email?: string;
  company?: string;
  jobTitle?: string;
  country?: string;
  optIn?: boolean;
  pageUrl?: string;
  referrer?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
};

export default defineEventHandler(async (event) => {
  const { writeSolutionGuideLeadToGrist } = await import('~/server/utils/grist');
  const body = (await readBody(event)) as ContactPayload;

  const fullName = String(body?.fullName || '').trim();
  const email = String(body?.email || '').trim().toLowerCase();
  const company = String(body?.company || '').trim();
  const jobTitle = String(body?.jobTitle || '').trim();
  const country = String(body?.country || '').trim();
  const guideSlug = String(body?.guideSlug || '').trim();
  const guideTitle = String(body?.guideTitle || '').trim();
  const documentType = String(body?.documentType || 'SG').trim() || 'SG';
  const eventType = String(body?.eventType || 'unlock').trim() || 'unlock';
  const accessMethod = String(body?.accessMethod || 'form_submit').trim() || 'form_submit';
  const optIn = Boolean(body?.optIn);
  const pageUrl = String(body?.pageUrl || '').trim();
  const referrer = String(body?.referrer || '').trim();
  const utmSource = String(body?.utmSource || '').trim();
  const utmMedium = String(body?.utmMedium || '').trim();
  const utmCampaign = String(body?.utmCampaign || '').trim();

  if (!guideSlug || !fullName || !email || !company || !jobTitle) {
    throw createError({ statusCode: 400, statusMessage: 'Missing required contact fields.' });
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid email format.' });
  }

  const leadRecord = {
    at: new Date().toISOString(),
    documentType,
    guideSlug,
    guideTitle,
    eventType,
    accessGranted: true,
    accessMethod,
    fullName,
    email,
    company,
    jobTitle,
    country,
    optIn,
    pageUrl,
    referrer,
    utmSource,
    utmMedium,
    utmCampaign,
    ip:
      getRequestHeader(event, 'x-forwarded-for') ||
      getRequestIP(event, { xForwardedFor: true }) ||
      '',
    userAgent: getRequestHeader(event, 'user-agent') || '',
  };

  const gristResult = await writeSolutionGuideLeadToGrist(leadRecord);
  if (!gristResult.written) {
    // Fallback logging ensures no lead is lost if Grist is unavailable or not configured.
    console.log('[solution-guide-contact]', JSON.stringify(leadRecord));
    if (gristResult.reason === 'request_failed') {
      console.error('[solution-guide-contact][grist_error]', gristResult.error);
    }
  }

  return { ok: true };
});
