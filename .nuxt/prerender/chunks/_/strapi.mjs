import { u as useRuntimeConfig } from '../nitro/nitro.mjs';
import { createError } from 'file:///Users/jb/code/VAN-frontend/node_modules/h3/dist/index.mjs';

function toArray(value) {
  if (!value) return [];
  return Array.isArray(value) ? value : [value];
}
function getStrapiConfig() {
  const config = useRuntimeConfig();
  const baseUrl = String(config.public.strapiBaseUrl || "").replace(/\/$/, "");
  const prefix = String(config.strapiApiPrefix || "/api");
  const token = String(config.strapiToken || "");
  if (!baseUrl) {
    throw createError({ statusCode: 500, statusMessage: "Missing NUXT_PUBLIC_STRAPI_BASE_URL / VITE_STRAPI_BASE_URL" });
  }
  return { baseUrl, prefix, token, root: `${baseUrl}${prefix}` };
}
async function strapiFetch(path, params = {}) {
  const { root, token } = getStrapiConfig();
  return $fetch(`${root}${path}`, {
    headers: token ? { Authorization: `Bearer ${token}` } : void 0,
    query: params
  });
}
async function strapiFetchAll(collection, params = {}, pageSize = 100) {
  var _a, _b;
  const all = [];
  let page = 1;
  while (true) {
    const data = await strapiFetch(`/${collection}`, {
      ...params,
      "pagination[page]": page,
      "pagination[pageSize]": pageSize
    });
    const batch = toArray(data == null ? void 0 : data.data);
    all.push(...batch);
    const total = Number(((_b = (_a = data == null ? void 0 : data.meta) == null ? void 0 : _a.pagination) == null ? void 0 : _b.total) || 0);
    if (total > 0 && all.length >= total) break;
    if (batch.length < pageSize) break;
    page += 1;
  }
  return all;
}
function mediaUrl(media) {
  var _a, _b;
  const { baseUrl } = getStrapiConfig();
  const url = (media == null ? void 0 : media.url) || ((_b = (_a = media == null ? void 0 : media.formats) == null ? void 0 : _a.thumbnail) == null ? void 0 : _b.url) || "";
  if (!url) return "";
  if (String(url).startsWith("http://") || String(url).startsWith("https://")) return String(url);
  return `${baseUrl}${url}`;
}
function pickComponentValue(item, keys) {
  if (!item || typeof item !== "object") return "";
  for (const key of keys) {
    const value = item[key];
    if (typeof value === "string" && value.trim()) return value.trim();
  }
  return "";
}
function normalizeComponentStringList(value, keys) {
  if (!Array.isArray(value)) return [];
  return value.map((item) => {
    if (typeof item === "string") return item.trim();
    return pickComponentValue(item, keys);
  }).filter(Boolean);
}
function normalizeVendorLinks(value) {
  if (!Array.isArray(value)) return [];
  return value.map((item) => {
    if (!item || typeof item !== "object" || Array.isArray(item)) return null;
    const label = pickComponentValue(item, ["label", "title", "name", "text"]);
    const url = pickComponentValue(item, ["url", "href", "link", "website"]);
    if (!url) return null;
    return { label: label || url, url };
  }).filter(Boolean);
}
function mapVendor(entry, membershipByVendorKey) {
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
    regions: normalizeComponentStringList(vendor.regions, ["region", "regions", "name", "value"]),
    areaOfFocus: normalizeComponentStringList(vendor.areas_of_focus, [
      "area",
      "area_of_focus",
      "areas_of_focus",
      "name",
      "value"
    ]),
    links: normalizeVendorLinks(vendor.links),
    solutions: Array.isArray(vendor.solutions) ? vendor.solutions : [],
    membership,
    isVanMember: Boolean(membership),
    vanTier: (membership == null ? void 0 : membership.tier) || null
  };
}
function buildMembershipMap(rows) {
  const map = /* @__PURE__ */ new Map();
  for (const item of rows) {
    const rel = (item == null ? void 0 : item.vendor) || {};
    const keys = [rel.documentId, rel.id, rel.slug].filter(Boolean).map((v) => String(v));
    const value = {
      tier: (item == null ? void 0 : item.tier) || null,
      registeredAt: (item == null ? void 0 : item.registered_at) || null,
      expiresAt: (item == null ? void 0 : item.expires_at) || null
    };
    for (const key of keys) {
      if (!map.has(key)) map.set(key, value);
    }
  }
  return map;
}
function markdownToPreviewText(value) {
  const input = String(value);
  return input.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, "$1").replace(/\[([^\]]+)\]\(([^)]+)\)/g, "$1").replace(/^#{1,6}\s+/gm, "").replace(/[*_`>#-]/g, " ").replace(/\s+/g, " ").trim();
}
function fuzzyIncludes(text, query) {
  return text.includes(query) || query.includes(text);
}
function words(input) {
  return String(input || "").toLowerCase().split(/\s+/).map((v) => v.trim()).filter(Boolean);
}
function levenshtein(a, b) {
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

export { strapiFetchAll as a, buildMembershipMap as b, markdownToPreviewText as c, fuzzyIncludes as f, levenshtein as l, mapVendor as m, strapiFetch as s, words as w };
//# sourceMappingURL=strapi.mjs.map
