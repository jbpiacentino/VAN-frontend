import { c as cachedEventHandler } from '../../../nitro/nitro.mjs';
import { getRequestURL, getQuery } from 'file:///Users/jb/code/VAN-frontend/node_modules/h3/dist/index.mjs';
import { a as strapiFetchAll, b as buildMembershipMap, m as mapVendor, c as markdownToPreviewText, w as words, f as fuzzyIncludes, l as levenshtein } from '../../../_/strapi.mjs';
import 'file:///Users/jb/code/VAN-frontend/node_modules/destr/dist/index.mjs';
import 'file:///Users/jb/code/VAN-frontend/node_modules/hookable/dist/index.mjs';
import 'file:///Users/jb/code/VAN-frontend/node_modules/ofetch/dist/node.mjs';
import 'file:///Users/jb/code/VAN-frontend/node_modules/node-mock-http/dist/index.mjs';
import 'file:///Users/jb/code/VAN-frontend/node_modules/ufo/dist/index.mjs';
import 'file:///Users/jb/code/VAN-frontend/node_modules/unstorage/dist/index.mjs';
import 'file:///Users/jb/code/VAN-frontend/node_modules/unstorage/drivers/fs.mjs';
import 'node:crypto';
import 'file:///Users/jb/code/VAN-frontend/node_modules/unstorage/drivers/fs-lite.mjs';
import 'file:///Users/jb/code/VAN-frontend/node_modules/unstorage/drivers/lru-cache.mjs';
import 'file:///Users/jb/code/VAN-frontend/node_modules/ohash/dist/index.mjs';
import 'file:///Users/jb/code/VAN-frontend/node_modules/klona/dist/index.mjs';
import 'file:///Users/jb/code/VAN-frontend/node_modules/defu/dist/defu.mjs';
import 'file:///Users/jb/code/VAN-frontend/node_modules/scule/dist/index.mjs';
import 'file:///Users/jb/code/VAN-frontend/node_modules/unctx/dist/index.mjs';
import 'file:///Users/jb/code/VAN-frontend/node_modules/radix3/dist/index.mjs';
import 'node:fs';
import 'node:url';
import 'file:///Users/jb/code/VAN-frontend/node_modules/pathe/dist/index.mjs';

function fuzzyNameMatch(text, query) {
  if (!query) return true;
  const n = String(text || "").toLowerCase();
  const q = String(query || "").toLowerCase();
  if (!n) return false;
  if (n.includes(q)) return true;
  const qWords = words(q);
  const nWords = words(n);
  if (!qWords.length) return true;
  if (qWords.every((word) => n.includes(word))) return true;
  return qWords.every(
    (qWord) => nWords.some((nWord) => fuzzyIncludes(nWord, qWord) || levenshtein(nWord, qWord) <= 2)
  );
}
function addInFilter(params, path, values) {
  values.forEach((value, index) => {
    params[`filters[${path}][$in][${index}]`] = value;
  });
}
function membershipPriority(vendor) {
  const tier = String(vendor.vanTier || "").trim().toLowerCase();
  if (tier === "strategic" || tier === "startegic") return 0;
  if (tier === "regular") return 1;
  return 2;
}
function resourceCountInit(vendor) {
  return {
    vendorId: vendor.documentId,
    solutions: 0,
    briefs: 0,
    guides: 0,
    kb: 0
  };
}
const vendors_get = cachedEventHandler(
  async (event) => {
    var _a;
    const query = getQuery(event);
    const q = String(query.q || "").trim().toLowerCase();
    const includeNonMembers = String(query.includeNonMembers || "false") === "true";
    const page = Math.max(1, Number(query.page || 1));
    const pageSize = Math.min(60, Math.max(1, Number(query.pageSize || 24)));
    const focusFilter = String(query.focuses || "").split(",").map((v) => v.trim()).filter(Boolean);
    const [vendorRows, membershipRows] = await Promise.all([
      strapiFetchAll("vendors", {
        populate: "logo,areas_of_focus,regions",
        "sort[0]": "name:asc"
      }),
      strapiFetchAll("VAN-members", {
        populate: "vendor",
        "sort[0]": "registered_at:desc"
      })
    ]);
    const membershipByVendorKey = buildMembershipMap(membershipRows);
    const allVendors = vendorRows.map((row) => mapVendor(row, membershipByVendorKey));
    const scoped = includeNonMembers ? allVendors : allVendors.filter((vendor) => vendor.isVanMember);
    const nameMatches = q ? scoped.filter((vendor) => fuzzyNameMatch(`${vendor.name || ""} ${vendor.slug || ""}`, q)) : scoped;
    let searchScoped = nameMatches;
    if (q && nameMatches.length === 0) {
      const solutionParams = {
        populate: "vendor",
        "pagination[pageSize]": 200
      };
      const orFields = ["name", "title", "slug", "short_description", "summary", "description"];
      orFields.forEach((field, index) => {
        solutionParams[`filters[$or][${index}][${field}][$containsi]`] = q;
      });
      const solutionHits = await strapiFetchAll("solutions", solutionParams);
      const vendorIds = new Set(
        solutionHits.map((row) => {
          var _a2, _b;
          return String(((_a2 = row == null ? void 0 : row.vendor) == null ? void 0 : _a2.documentId) || ((_b = row == null ? void 0 : row.vendor) == null ? void 0 : _b.id) || "");
        }).filter(Boolean)
      );
      searchScoped = scoped.filter((vendor) => vendorIds.has(String(vendor.documentId || vendor.id || "")));
    }
    let filtered = searchScoped;
    if (focusFilter.length > 0) {
      filtered = filtered.filter((vendor) => {
        const values = Array.isArray(vendor.areaOfFocus) ? vendor.areaOfFocus : [];
        return focusFilter.some((focus) => values.includes(focus));
      });
    }
    filtered.sort((a, b) => {
      const p = membershipPriority(a) - membershipPriority(b);
      if (p !== 0) return p;
      return String(a.name || "").localeCompare(String(b.name || ""));
    });
    const total = filtered.length;
    const start = (page - 1) * pageSize;
    const items = filtered.slice(start, start + pageSize);
    const countsByVendor = Object.fromEntries(items.map((vendor) => [vendor.documentId, resourceCountInit(vendor)]));
    if (items.length > 0) {
      const vendorIds = items.map((vendor) => String(vendor.documentId));
      const solutionParams = {
        populate: "vendor",
        "pagination[pageSize]": 200
      };
      addInFilter(solutionParams, "vendor][documentId", vendorIds);
      const solutions = await strapiFetchAll("solutions", solutionParams);
      const solutionOwner = /* @__PURE__ */ new Map();
      const solutionIds = [];
      for (const solution of solutions) {
        const owner = String(((_a = solution == null ? void 0 : solution.vendor) == null ? void 0 : _a.documentId) || "");
        const sid = String((solution == null ? void 0 : solution.documentId) || "");
        if (!owner || !sid) continue;
        solutionOwner.set(sid, owner);
        solutionIds.push(sid);
        if (countsByVendor[owner]) countsByVendor[owner].solutions += 1;
      }
      if (solutionIds.length > 0) {
        const relatedParams = {
          populate: "solutions",
          "pagination[pageSize]": 200
        };
        addInFilter(relatedParams, "solutions][documentId", solutionIds);
        const [guides, briefs, kbs] = await Promise.all([
          strapiFetchAll("solution-guides", relatedParams),
          strapiFetchAll("solution-briefs", relatedParams),
          strapiFetchAll("kb-articles", relatedParams)
        ]);
        const bump = (rows, field) => {
          for (const row of rows) {
            const owners = /* @__PURE__ */ new Set();
            const relSolutions = Array.isArray(row == null ? void 0 : row.solutions) ? row.solutions : [];
            for (const rel of relSolutions) {
              const owner = solutionOwner.get(String((rel == null ? void 0 : rel.documentId) || ""));
              if (owner) owners.add(owner);
            }
            owners.forEach((owner) => {
              if (countsByVendor[owner]) countsByVendor[owner][field] += 1;
            });
          }
        };
        bump(guides, "guides");
        bump(briefs, "briefs");
        bump(kbs, "kb");
      }
    }
    return {
      items: items.map((vendor) => ({
        ...vendor,
        descriptionPreview: markdownToPreviewText(
          vendor.shortDescription || vendor.description || vendor.summary || "No description available."
        ),
        resources: countsByVendor[vendor.documentId] || resourceCountInit(vendor)
      })),
      meta: {
        total,
        page,
        pageSize
      },
      focusOptions: Array.from(
        new Set(
          scoped.flatMap(
            (vendor) => Array.isArray(vendor.areaOfFocus) ? vendor.areaOfFocus : []
          )
        )
      ).sort((a, b) => String(a).localeCompare(String(b)))
    };
  },
  {
    maxAge: 120,
    staleMaxAge: 300,
    getKey: (event) => `finder:${event.path}?${getRequestURL(event).searchParams.toString()}`
  }
);

export { vendors_get as default };
//# sourceMappingURL=vendors.get.mjs.map
