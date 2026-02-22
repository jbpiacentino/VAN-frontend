type SolutionGuideLead = {
  at: string;
  documentType: string;
  guideSlug: string;
  guideTitle: string;
  eventType: string;
  accessGranted: boolean;
  accessMethod: string;
  fullName: string;
  email: string;
  company: string;
  jobTitle: string;
  country: string;
  optIn: boolean;
  pageUrl: string;
  referrer: string;
  utmSource: string;
  utmMedium: string;
  utmCampaign: string;
  ip: string;
  userAgent: string;
};

type GristWriteResult =
  | { written: true }
  | { written: false; reason: 'not_configured' | 'request_failed'; error?: string };

type GristColumnSpec = {
  id: string;
  type: string;
};

const ensuredTables = new Set<string>();

const REQUIRED_COLUMNS: GristColumnSpec[] = [
  { id: 'timestamp', type: 'DateTime' },
  { id: 'document_type', type: 'Text' },
  { id: 'guide_slug', type: 'Text' },
  { id: 'guide_title', type: 'Text' },
  { id: 'event_type', type: 'Text' },
  { id: 'access_granted', type: 'Bool' },
  { id: 'access_method', type: 'Text' },
  { id: 'full_name', type: 'Text' },
  { id: 'email', type: 'Text' },
  { id: 'company', type: 'Text' },
  { id: 'job_title', type: 'Text' },
  { id: 'country', type: 'Text' },
  { id: 'opt_in', type: 'Bool' },
  { id: 'page_url', type: 'Text' },
  { id: 'referrer', type: 'Text' },
  { id: 'utm_source', type: 'Text' },
  { id: 'utm_medium', type: 'Text' },
  { id: 'utm_campaign', type: 'Text' },
  { id: 'ip', type: 'Text' },
  { id: 'user_agent', type: 'Text' },
];

function normalizeBaseUrl(value: string) {
  return value.replace(/\/+$/, '');
}

function buildApiBase(baseUrl: string, docId: string, tableId: string) {
  return `${normalizeBaseUrl(baseUrl)}/api/docs/${encodeURIComponent(docId)}/tables/${encodeURIComponent(
    tableId
  )}`;
}

function buildDocApiBase(baseUrl: string, docId: string) {
  return `${normalizeBaseUrl(baseUrl)}/api/docs/${encodeURIComponent(docId)}`;
}

function collectColumnIds(payload: any): Set<string> {
  const ids = new Set<string>();
  const columns = Array.isArray(payload?.columns) ? payload.columns : [];

  for (const col of columns) {
    const candidateIds = [
      col?.id,
      col?.colId,
      col?.fields?.id,
      col?.fields?.colId,
      col?.fields?.label,
      col?.label,
    ];
    for (const value of candidateIds) {
      if (typeof value === 'string' && value.trim()) ids.add(value.trim());
    }
  }
  return ids;
}

async function ensureSchema(
  baseUrl: string,
  apiKey: string,
  docId: string,
  tableId: string
): Promise<{ ok: true } | { ok: false; error: string }> {
  const tableKey = `${docId}::${tableId}`;
  if (ensuredTables.has(tableKey)) return { ok: true };

  const apiBase = buildApiBase(baseUrl, docId, tableId);
  const docApiBase = buildDocApiBase(baseUrl, docId);
  const headers = { Authorization: `Bearer ${apiKey}` };

  let existing = new Set<string>();
  try {
    const payload = await $fetch<any>(`${apiBase}/columns`, { headers });
    existing = collectColumnIds(payload);
  } catch (error: any) {
    const message = String(error?.data?.error || error?.message || '');
    if (!/table not found/i.test(message)) {
      return {
        ok: false,
        error: message || 'Unable to fetch existing Grist columns',
      };
    }

    const tablePayloadVariants = [
      {
        tables: [
          {
            id: tableId,
            columns: REQUIRED_COLUMNS.map((col) => ({ id: col.id, type: col.type })),
          },
        ],
      },
      {
        tables: [
          {
            id: tableId,
            columns: REQUIRED_COLUMNS.map((col) => ({ id: col.id, fields: { type: col.type } })),
          },
        ],
      },
      {
        tables: [
          {
            id: tableId,
            columns: REQUIRED_COLUMNS.map((col) => ({
              fields: { colId: col.id, type: col.type },
            })),
          },
        ],
      },
    ];

    let created = false;
    let createError = 'Unknown Grist table creation error';
    for (const body of tablePayloadVariants) {
      try {
        await $fetch(`${docApiBase}/tables`, {
          method: 'POST',
          headers,
          body,
        });
        created = true;
        break;
      } catch (createErr: any) {
        createError = createErr?.data?.error || createErr?.message || createError;
      }
    }

    if (!created) {
      return { ok: false, error: createError };
    }

    ensuredTables.add(tableKey);
    return { ok: true };
  }

  const missing = REQUIRED_COLUMNS.filter((col) => !existing.has(col.id));
  if (!missing.length) {
    ensuredTables.add(tableKey);
    return { ok: true };
  }

  const payloadVariants = [
    { columns: missing.map((col) => ({ id: col.id, type: col.type })) },
    { columns: missing.map((col) => ({ id: col.id, fields: { type: col.type } })) },
    { columns: missing.map((col) => ({ fields: { colId: col.id, type: col.type } })) },
  ];

  let lastError = 'Unknown Grist column creation error';
  for (const body of payloadVariants) {
    try {
      await $fetch(`${apiBase}/columns`, {
        method: 'POST',
        headers,
        body,
      });
      ensuredTables.add(tableKey);
      return { ok: true };
    } catch (error: any) {
      lastError = error?.data?.error || error?.message || lastError;
    }
  }

  return { ok: false, error: lastError };
}

export async function writeSolutionGuideLeadToGrist(lead: SolutionGuideLead): Promise<GristWriteResult> {
  const config = useRuntimeConfig();
  const baseUrl = String(config.gristBaseUrl || '').trim();
  const apiKey = String(config.gristApiKey || '').trim();
  const docId = String(config.gristDocId || '').trim();
  const tableId = String(config.gristTableId || '').trim();

  if (!baseUrl || !apiKey || !docId || !tableId) {
    return { written: false, reason: 'not_configured' };
  }

  const schemaResult = await ensureSchema(baseUrl, apiKey, docId, tableId);
  if (!schemaResult.ok) {
    return { written: false, reason: 'request_failed', error: schemaResult.error };
  }

  const url = `${buildApiBase(baseUrl, docId, tableId)}/records`;

  try {
    await $fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
      body: {
        records: [
          {
            fields: {
              timestamp: lead.at,
              document_type: lead.documentType,
              guide_slug: lead.guideSlug,
              guide_title: lead.guideTitle,
              event_type: lead.eventType,
              access_granted: lead.accessGranted,
              access_method: lead.accessMethod,
              full_name: lead.fullName,
              email: lead.email,
              company: lead.company,
              job_title: lead.jobTitle,
              country: lead.country,
              opt_in: lead.optIn,
              page_url: lead.pageUrl,
              referrer: lead.referrer,
              utm_source: lead.utmSource,
              utm_medium: lead.utmMedium,
              utm_campaign: lead.utmCampaign,
              ip: lead.ip,
              user_agent: lead.userAgent,
            },
          },
        ],
      },
    });
    return { written: true };
  } catch (error: any) {
    return {
      written: false,
      reason: 'request_failed',
      error: error?.data?.error || error?.message || 'Unknown Grist write error',
    };
  }
}
