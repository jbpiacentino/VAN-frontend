import { fetchCollection, fetchSingleBySlug, fetchSingleType } from './strapiClient';

const strapiBaseUrl = (import.meta.env.VITE_STRAPI_BASE_URL || '').replace(/\/$/, '');
const landingSingleType = import.meta.env.VITE_STRAPI_LANDING_SINGLE_TYPE || 'landing-page';

function getMediaUrl(media) {
  if (!media || typeof media !== 'object') return null;
  const url = media.url || media.formats?.thumbnail?.url || null;
  if (!url) return null;
  if (url.startsWith('http://') || url.startsWith('https://')) return url;
  return `${strapiBaseUrl}${url}`;
}

function pickComponentValue(item, keys) {
  if (!item || typeof item !== 'object') return '';
  for (const key of keys) {
    const value = item[key];
    if (typeof value === 'string' && value.trim()) return value.trim();
  }
  return '';
}

function normalizeComponentStringList(value, keys) {
  if (!Array.isArray(value)) return [];
  return value
    .map((item) => {
      if (typeof item === 'string') return item.trim();
      return pickComponentValue(item, keys);
    })
    .filter(Boolean);
}

function normalizeVendorLinks(value) {
  if (!Array.isArray(value)) return [];
  return value
    .map((item) => {
      if (!item || typeof item !== 'object' || Array.isArray(item)) return null;
      const label = pickComponentValue(item, ['label', 'title', 'name', 'text']);
      const url = pickComponentValue(item, ['url', 'href', 'link', 'website']);
      if (!url) return null;
      return {
        label: label || url,
        url
      };
    })
    .filter(Boolean);
}

function membershipVendorKeys(vendorRel) {
  if (!vendorRel || typeof vendorRel !== 'object') return [];
  return [vendorRel.documentId, vendorRel.id, vendorRel.slug].filter(Boolean).map((key) => String(key));
}

function mapEntry(entry) {
  const attrs = entry || {};
  return {
    id: entry.id,
    documentId: attrs.documentId,
    title: attrs.title,
    name: attrs.name,
    slug: attrs.slug,
    summary: attrs.summary,
    excerpt: attrs.excerpt,
    description: attrs.description,
    content: attrs.content,
    url: attrs.url,
    body: attrs.body,
    visibilityPolicy: attrs.visibility_policy,
    website: attrs.website,
    logoUrl: getMediaUrl(attrs.logo),
    links: normalizeVendorLinks(attrs.links),
    regions: normalizeComponentStringList(attrs.regions, ['region', 'regions', 'name', 'value']),
    areaOfFocus: normalizeComponentStringList(attrs.areas_of_focus, [
      'area',
      'area_of_focus',
      'areas_of_focus',
      'name',
      'value'
    ]),
    workflow: attrs.workflow,
    solutionType: attrs.solution_type,
    integrationPatterns: attrs.integration_patterns,
    licensingModel: attrs.licensing_model,
    visibilityLevel: attrs.visibility_level,
    shortDescription: attrs.short_description,
    integrationType: attrs.integration_type,
    supportedCapabilities: attrs.supported_capabilities,
    requirements: attrs.requirements,
    limitations: attrs.limitations,
    solutions: Array.isArray(attrs.solutions)
      ? attrs.solutions.map((solution) => mapEntry(solution))
      : [],
    raw: attrs
  };
}

export async function getVendors() {
  const [vendorData, membershipData] = await Promise.all([
    fetchCollection('vendors', { sort: ['name:asc'] }),
    fetchCollection('VAN-members', { sort: ['registered_at:desc'] })
  ]);

  const vendors = vendorData.map(mapEntry);
  const membershipByVendorKey = new Map();

  for (const row of membershipData) {
    const member = mapEntry(row);
    const vendorRel = member.raw?.vendor || row?.vendor;
    const keys = membershipVendorKeys(vendorRel);
    for (const key of keys) {
      if (!membershipByVendorKey.has(key)) {
        membershipByVendorKey.set(key, {
          tier: member.raw?.tier || null,
          registeredAt: member.raw?.registered_at || null,
          expiresAt: member.raw?.expires_at || null
        });
      }
    }
  }

  return vendors.map((vendor) => {
    const keys = [vendor.documentId, vendor.id, vendor.slug].filter(Boolean).map((key) => String(key));
    let membership = null;
    for (const key of keys) {
      if (membershipByVendorKey.has(key)) {
        membership = membershipByVendorKey.get(key);
        break;
      }
    }

    return {
      ...vendor,
      membership,
      isVanMember: Boolean(membership),
      vanTier: membership?.tier || null,
      registration: membership?.registeredAt || null,
      renewal: membership?.expiresAt || null
    };
  });
}

export async function getVendorBySlug(slug) {
  const vendors = await getVendors();
  return vendors.find((entry) => entry.slug === slug) || null;
}

export async function getVendorSolutions() {
  const vendors = await getVendors();
  const byId = new Map();

  for (const vendor of vendors) {
    for (const solution of vendor.solutions || []) {
      const key = solution.documentId || solution.id || solution.slug || solution.title;
      if (!key || byId.has(key)) continue;

      byId.set(key, {
        ...solution,
        vendorName: vendor.name,
        vendorSlug: vendor.slug
      });
    }
  }

  return Array.from(byId.values()).sort((a, b) => {
    const aTitle = (a.title || a.name || '').toLowerCase();
    const bTitle = (b.title || b.name || '').toLowerCase();
    return aTitle.localeCompare(bTitle);
  });
}

export async function getSolutions() {
  const data = await fetchCollection('solutions', { sort: ['name:asc'] });
  return data.map(mapEntry);
}

export async function getSolutionGuides() {
  const data = await fetchCollection('solution-guides', { sort: ['title:asc'] });
  return data.map(mapEntry);
}

export async function getSolutionBriefs() {
  const data = await fetchCollection('solution-briefs', { sort: ['title:asc'] });
  return data.map(mapEntry);
}

export async function getKnowledgeArticles() {
  const data = await fetchCollection('kb-articles', { sort: ['title:asc'] });
  return data.map(mapEntry);
}

export async function getCompatibilityRecords() {
  const data = await fetchCollection('compatibility-records', { sort: ['updatedAt:desc'] });
  return data.map(mapEntry);
}

export async function getLandingPage() {
  const entry = await fetchSingleType(landingSingleType);
  return entry ? mapEntry(entry) : null;
}
