function toArray<T>(value: T | T[] | null | undefined): T[] {
  if (!value) return [];
  return Array.isArray(value) ? value : [value];
}

export function getStrapiConfig() {
  const config = useRuntimeConfig();
  const baseUrl = String(config.public.strapiBaseUrl || '').replace(/\/$/, '');
  const prefix = String(config.strapiApiPrefix || '/api');
  const token = String(config.strapiToken || '');
  if (!baseUrl) {
    throw createError({ statusCode: 500, statusMessage: 'Missing NUXT_PUBLIC_STRAPI_BASE_URL / VITE_STRAPI_BASE_URL' });
  }
  return { baseUrl, prefix, token, root: `${baseUrl}${prefix}` };
}

export async function strapiFetch(path: string, params: Record<string, any> = {}) {
  const { root, token } = getStrapiConfig();
  return $fetch<any>(`${root}${path}`, {
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
    query: params,
  });
}

export async function strapiFetchAll(collection: string, params: Record<string, any> = {}, pageSize = 100) {
  const all: any[] = [];
  let page = 1;

  while (true) {
    const data = await strapiFetch(`/${collection}`, {
      ...params,
      'pagination[page]': page,
      'pagination[pageSize]': pageSize,
    });

    const batch = toArray(data?.data);
    all.push(...batch);

    const total = Number(data?.meta?.pagination?.total || 0);
    if (total > 0 && all.length >= total) break;
    if (batch.length < pageSize) break;
    page += 1;
  }

  return all;
}

export function mediaUrl(media: any) {
  const { baseUrl } = getStrapiConfig();
  const url = media?.url || media?.formats?.thumbnail?.url || '';
  if (!url) return '';
  if (String(url).startsWith('http://') || String(url).startsWith('https://')) return String(url);
  return `${baseUrl}${url}`;
}

export function pickComponentValue(item: any, keys: string[]) {
  if (!item || typeof item !== 'object') return '';
  for (const key of keys) {
    const value = item[key];
    if (typeof value === 'string' && value.trim()) return value.trim();
  }
  return '';
}

export function normalizeComponentStringList(value: any, keys: string[]) {
  if (!Array.isArray(value)) return [];
  return value
    .map((item) => {
      if (typeof item === 'string') return item.trim();
      return pickComponentValue(item, keys);
    })
    .filter(Boolean);
}

export function normalizeVendorLinks(value: any) {
  if (!Array.isArray(value)) return [];
  return value
    .map((item) => {
      if (!item || typeof item !== 'object' || Array.isArray(item)) return null;
      const label = pickComponentValue(item, ['label', 'title', 'name', 'text']);
      const url = pickComponentValue(item, ['url', 'href', 'link', 'website']);
      if (!url) return null;
      return { label: label || url, url };
    })
    .filter(Boolean);
}

export function relationItems(value: any) {
  if (!value) return [];
  if (Array.isArray(value)) return value;
  if (Array.isArray(value?.data)) return value.data;
  if (value?.data && typeof value.data === 'object') return [value.data];
  if (typeof value === 'object') return [value];
  return [];
}

export function relationFirst(value: any) {
  const items = relationItems(value);
  return items[0] || null;
}

export function mapVendor(entry: any, membershipByVendorKey: Map<string, any>) {
  const vendor = entry || {};
  const keys = [vendor.documentId, vendor.id, vendor.slug].filter(Boolean).map((v) => String(v));
  let membership = null;
  for (const key of keys) {
    if (membershipByVendorKey.has(key)) {
      membership = membershipByVendorKey.get(key);
      break;
    }
  }

  return {
    id: vendor.id,
    documentId: vendor.documentId,
    slug: vendor.slug,
    name: vendor.name,
    shortDescription: vendor.short_description,
    description: vendor.description,
    summary: vendor.summary,
    website: vendor.website,
    logoUrl: mediaUrl(vendor.logo),
    regions: normalizeComponentStringList(vendor.regions, ['region', 'regions', 'name', 'value']),
    areaOfFocus: normalizeComponentStringList(vendor.areas_of_focus, [
      'area',
      'area_of_focus',
      'areas_of_focus',
      'name',
      'value',
    ]),
    links: normalizeVendorLinks(vendor.links),
    solutions: relationItems(vendor.solutions),
    membership,
    isVanMember: Boolean(membership),
    vanTier: membership?.tier || null,
  };
}

export function buildMembershipMap(rows: any[]) {
  const map = new Map<string, any>();
  for (const item of rows) {
    const rel = relationFirst(item?.vendor) || {};
    const keys = [rel.documentId, rel.id, rel.slug].filter(Boolean).map((v) => String(v));
    const value = {
      tier: item?.tier || null,
      registeredAt: item?.registered_at || null,
      expiresAt: item?.expires_at || null,
    };
    for (const key of keys) {
      if (!map.has(key)) map.set(key, value);
    }
  }
  return map;
}

export function markdownToPreviewText(value: any) {
  const input = String(value || '');
  return input
    .replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '$1')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '$1')
    .replace(/^#{1,6}\s+/gm, '')
    .replace(/[*_`>#-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export function fuzzyIncludes(text: string, query: string) {
  return text.includes(query) || query.includes(text);
}

export function words(input: string) {
  return String(input || '')
    .toLowerCase()
    .split(/\s+/)
    .map((v) => v.trim())
    .filter(Boolean);
}

export function levenshtein(a: string, b: string) {
  if (!a) return b.length;
  if (!b) return a.length;
  const rows = a.length + 1;
  const cols = b.length + 1;
  const dp = Array.from({ length: rows }, () => new Array(cols).fill(0));
  for (let i = 0; i < rows; i += 1) dp[i][0] = i;
  for (let j = 0; j < cols; j += 1) dp[0][j] = j;

  for (let i = 1; i < rows; i += 1) {
    for (let j = 1; j < cols; j += 1) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      dp[i][j] = Math.min(dp[i - 1][j] + 1, dp[i][j - 1] + 1, dp[i - 1][j - 1] + cost);
    }
  }
  return dp[rows - 1][cols - 1];
}
