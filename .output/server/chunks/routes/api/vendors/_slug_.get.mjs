import { d as defineEventHandler, g as getRouterParam, a as getQuery, c as createError } from '../../../nitro/nitro.mjs';
import { s as strapiFetchAll, m as mapVendor, c as buildMembershipMap, b as relationFirst, r as relationItems } from '../../../_/strapi.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';

const _slug__get = defineEventHandler(async (event) => {
  const slug = getRouterParam(event, "slug");
  const query = getQuery(event);
  const debug = String(query.debug || query._debug || "").trim().toLowerCase() === "1" || String(query.debug || query._debug || "").trim().toLowerCase() === "true";
  if (!slug) {
    throw createError({ statusCode: 400, statusMessage: "Missing slug" });
  }
  const vendorRows = await strapiFetchAll("vendors", {
    populate: "*",
    "filters[slug][$eq]": slug,
    "pagination[pageSize]": 1
  });
  const rawVendor = vendorRows[0];
  if (!rawVendor) {
    throw createError({ statusCode: 404, statusMessage: "Vendor not found" });
  }
  const membershipRows = await strapiFetchAll("VAN-members", {
    populate: "*",
    "filters[vendor][slug][$eq]": slug,
    "pagination[pageSize]": 5
  });
  const vendor = mapVendor(rawVendor, buildMembershipMap(membershipRows));
  const allSolutions = await strapiFetchAll("solutions", {
    populate: "*",
    "pagination[pageSize]": 200
  });
  const ownedSolutions = allSolutions.filter(
    (solution) => {
      var _a;
      return String(((_a = relationFirst(solution == null ? void 0 : solution.vendor)) == null ? void 0 : _a.slug) || "") === slug;
    }
  );
  const solutionIds = ownedSolutions.map((solution) => String((solution == null ? void 0 : solution.documentId) || "")).filter(Boolean);
  const briefsParams = {
    populate: "*",
    "sort[0]": "title:asc",
    "pagination[pageSize]": 200
  };
  const guidesParams = {
    populate: "*",
    "sort[0]": "title:asc",
    "pagination[pageSize]": 200
  };
  const kbParams = {
    populate: "*",
    "sort[0]": "title:asc",
    "pagination[pageSize]": 200
  };
  const [briefsRows, guidesRows, kbRows] = solutionIds.length ? await Promise.all([
    strapiFetchAll("solution-briefs", briefsParams),
    strapiFetchAll("solution-guides", guidesParams),
    strapiFetchAll("kb-articles", kbParams)
  ]) : [[], [], []];
  const solutionIdSet = new Set(solutionIds);
  const briefFilteredRaw = briefsRows.filter(
    (row) => relationItems(row == null ? void 0 : row.solution).some((rel) => solutionIdSet.has(String((rel == null ? void 0 : rel.documentId) || "")))
  );
  const guideFilteredRaw = guidesRows.filter(
    (row) => relationItems(row == null ? void 0 : row.solutions).some((rel) => solutionIdSet.has(String((rel == null ? void 0 : rel.documentId) || "")))
  );
  const kbFiltered = kbRows.filter((row) => {
    const one = relationItems(row == null ? void 0 : row.solution);
    const many = relationItems(row == null ? void 0 : row.solutions);
    return [...one, ...many].some(
      (rel) => solutionIdSet.has(String((rel == null ? void 0 : rel.documentId) || ""))
    );
  });
  const briefFiltered = vendor.isVanMember ? briefFilteredRaw : [];
  const guideFiltered = vendor.isVanMember ? guideFilteredRaw : [];
  if (debug) {
    const debugPayload = {
      slug,
      vendorDocumentId: vendor.documentId,
      vendorName: vendor.name,
      solutionIds,
      sourceCounts: {
        allSolutions: allSolutions.length,
        allBriefs: briefsRows.length,
        allGuides: guidesRows.length,
        allKb: kbRows.length
      },
      matchedCounts: {
        briefs: briefFiltered.length,
        guides: guideFiltered.length,
        kb: kbFiltered.length
      },
      matched: {
        briefs: briefFiltered.map((row) => ({
          title: row.title,
          briefDocumentId: row.documentId,
          linkedSolutionIds: relationItems(row == null ? void 0 : row.solution).map((rel) => rel == null ? void 0 : rel.documentId)
        })),
        guides: guideFiltered.map((row) => ({
          title: row.title,
          guideDocumentId: row.documentId,
          linkedSolutionIds: relationItems(row == null ? void 0 : row.solutions).map((rel) => rel == null ? void 0 : rel.documentId)
        })),
        kb: kbFiltered.map((row) => ({
          title: row.title,
          kbDocumentId: row.documentId,
          linkedSolutionIds: [
            ...relationItems(row == null ? void 0 : row.solution).map((rel) => rel == null ? void 0 : rel.documentId),
            ...relationItems(row == null ? void 0 : row.solutions).map((rel) => rel == null ? void 0 : rel.documentId)
          ]
        }))
      }
    };
    console.log("[vendor-debug]", JSON.stringify(debugPayload));
  }
  const response = {
    vendor: {
      ...vendor,
      solutions: ownedSolutions.map((solution) => ({
        id: solution.id,
        documentId: solution.documentId,
        slug: solution.slug,
        name: solution.name || solution.title,
        shortDescription: solution.short_description,
        workflow: solution.workflow
      }))
    },
    briefs: briefFiltered.map((row) => ({
      id: row.id,
      documentId: row.documentId,
      slug: row.slug,
      title: row.title,
      shortDescription: row.short_description,
      description: row.description
    })),
    guides: guideFiltered.map((row) => ({
      id: row.id,
      documentId: row.documentId,
      slug: row.slug,
      title: row.title,
      summary: row.summary
    })),
    kbArticles: kbFiltered.map((row) => ({
      id: row.id,
      documentId: row.documentId,
      slug: row.slug,
      title: row.title,
      type: row.type
    }))
  };
  if (debug) {
    Object.assign(response, {
      _debug: {
        slug,
        solutionIds,
        sourceCounts: {
          allSolutions: allSolutions.length,
          allBriefs: briefsRows.length,
          allGuides: guidesRows.length,
          allKb: kbRows.length
        },
        matchedCounts: {
          briefs: briefFiltered.length,
          guides: guideFiltered.length,
          kb: kbFiltered.length
        }
      }
    });
  }
  return response;
});

export { _slug__get as default };
//# sourceMappingURL=_slug_.get.mjs.map
