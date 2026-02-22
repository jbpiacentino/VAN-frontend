import { f as cachedEventHandler, h as getRequestURL, a as getQuery } from '../../../nitro/nitro.mjs';
import { s as strapiFetchAll, c as buildMembershipMap, m as mapVendor, d as markdownToPreviewText, b as relationFirst, r as relationItems, w as words, f as fuzzyIncludes, l as levenshtein } from '../../../_/strapi.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';

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
        populate: "*",
        "sort[0]": "name:asc"
      }),
      strapiFetchAll("VAN-members", {
        populate: "*",
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
        populate: "*",
        "pagination[pageSize]": 200
      };
      const solutionHitsAll = await strapiFetchAll("solutions", solutionParams);
      const solutionHits = solutionHitsAll.filter((row) => {
        const fields = [
          row == null ? void 0 : row.name,
          row == null ? void 0 : row.title,
          row == null ? void 0 : row.slug,
          row == null ? void 0 : row.short_description,
          row == null ? void 0 : row.summary,
          row == null ? void 0 : row.description
        ].map((value) => markdownToPreviewText(value).toLowerCase()).filter(Boolean);
        return fields.some((text) => fuzzyNameMatch(text, q));
      });
      const vendorIds = new Set(
        solutionHits.map((row) => {
          const relVendor = relationFirst(row == null ? void 0 : row.vendor);
          return String((relVendor == null ? void 0 : relVendor.documentId) || (relVendor == null ? void 0 : relVendor.id) || "");
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
    const solutionsByVendor = Object.fromEntries(items.map((vendor) => [vendor.documentId, []]));
    const memberVendorIds = new Set(
      items.filter((vendor) => vendor.isVanMember).map((vendor) => String(vendor.documentId || ""))
    );
    if (items.length > 0) {
      const vendorSlugSet = new Set(items.map((vendor) => String(vendor.slug || "")).filter(Boolean));
      const allSolutions = await strapiFetchAll("solutions", {
        populate: "*",
        "pagination[pageSize]": 200
      });
      const solutions = allSolutions.filter(
        (solution) => {
          var _a2;
          return vendorSlugSet.has(String(((_a2 = relationFirst(solution == null ? void 0 : solution.vendor)) == null ? void 0 : _a2.slug) || ""));
        }
      );
      const solutionOwner = /* @__PURE__ */ new Map();
      const solutionIds = [];
      for (const solution of solutions) {
        const owner = String(((_a = relationFirst(solution == null ? void 0 : solution.vendor)) == null ? void 0 : _a.documentId) || "");
        const sid = String((solution == null ? void 0 : solution.documentId) || "");
        if (!owner || !sid) continue;
        solutionOwner.set(sid, owner);
        solutionIds.push(sid);
        if (countsByVendor[owner]) countsByVendor[owner].solutions += 1;
        if (solutionsByVendor[owner]) {
          solutionsByVendor[owner].push({
            id: solution.id,
            documentId: solution.documentId,
            slug: solution.slug,
            name: solution.name || solution.title
          });
        }
      }
      if (solutionIds.length > 0) {
        const solutionIdSet = new Set(solutionIds);
        const relatedParams = {
          populate: "*",
          "pagination[pageSize]": 200
        };
        const [allGuides, allBriefs, allKbs] = await Promise.all([
          strapiFetchAll("solution-guides", relatedParams),
          strapiFetchAll("solution-briefs", relatedParams),
          strapiFetchAll("kb-articles", relatedParams)
        ]);
        const guides = allGuides.filter(
          (row) => relationItems(row == null ? void 0 : row.solutions).some((rel) => solutionIdSet.has(String((rel == null ? void 0 : rel.documentId) || "")))
        );
        const briefs = allBriefs.filter(
          (row) => relationItems(row == null ? void 0 : row.solution).some((rel) => solutionIdSet.has(String((rel == null ? void 0 : rel.documentId) || "")))
        );
        const kbs = allKbs.filter(
          (row) => relationItems(row == null ? void 0 : row.solutions).some((rel) => solutionIdSet.has(String((rel == null ? void 0 : rel.documentId) || "")))
        );
        const bump = (rows, field) => {
          for (const row of rows) {
            const owners = /* @__PURE__ */ new Set();
            const relSolutions = field === "briefs" ? relationItems(row == null ? void 0 : row.solution) : relationItems(row == null ? void 0 : row.solutions);
            for (const rel of relSolutions) {
              const owner = solutionOwner.get(String((rel == null ? void 0 : rel.documentId) || ""));
              if (owner) owners.add(owner);
            }
            owners.forEach((owner) => {
              if ((field === "guides" || field === "briefs") && !memberVendorIds.has(owner)) return;
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
        resources: countsByVendor[vendor.documentId] || resourceCountInit(vendor),
        solutions: (solutionsByVendor[vendor.documentId] || []).filter((entry) => String(entry.slug || "").trim()).sort((a, b) => String(a.name || "").localeCompare(String(b.name || "")))
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
