import { c as cachedEventHandler } from '../../../nitro/nitro.mjs';
import { getRouterParam, createError } from 'file:///Users/jb/code/VAN-frontend/node_modules/h3/dist/index.mjs';
import { a as strapiFetchAll, m as mapVendor, b as buildMembershipMap } from '../../../_/strapi.mjs';
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

const _slug__get = cachedEventHandler(
  async (event) => {
    const slug = getRouterParam(event, "slug");
    if (!slug) {
      throw createError({ statusCode: 400, statusMessage: "Missing slug" });
    }
    const vendorRows = await strapiFetchAll("vendors", {
      populate: "logo,solutions,areas_of_focus,regions,links",
      "filters[slug][$eq]": slug,
      "pagination[pageSize]": 1
    });
    const rawVendor = vendorRows[0];
    if (!rawVendor) {
      throw createError({ statusCode: 404, statusMessage: "Vendor not found" });
    }
    const membershipRows = await strapiFetchAll("VAN-members", {
      populate: "vendor",
      "filters[vendor][slug][$eq]": slug,
      "pagination[pageSize]": 5
    });
    const vendor = mapVendor(rawVendor, buildMembershipMap(membershipRows));
    const solutionIds = (Array.isArray(rawVendor.solutions) ? rawVendor.solutions : []).map((solution) => String((solution == null ? void 0 : solution.documentId) || "")).filter(Boolean);
    const addInFilter = (params, path, values) => {
      values.forEach((value, index) => {
        params[`filters[${path}][$in][${index}]`] = value;
      });
    };
    const briefsParams = {
      populate: "solutions,products",
      "sort[0]": "title:asc",
      "pagination[pageSize]": 200
    };
    const guidesParams = {
      populate: "solutions,products",
      "sort[0]": "title:asc",
      "pagination[pageSize]": 200
    };
    const kbParams = {
      populate: "solution,solutions,product,products",
      "sort[0]": "title:asc",
      "pagination[pageSize]": 200
    };
    if (solutionIds.length > 0) {
      addInFilter(briefsParams, "solutions][documentId", solutionIds);
      addInFilter(guidesParams, "solutions][documentId", solutionIds);
      addInFilter(kbParams, "solution][documentId", solutionIds);
    }
    const [briefsRows, guidesRows, kbRows] = solutionIds.length ? await Promise.all([
      strapiFetchAll("solution-briefs", briefsParams),
      strapiFetchAll("solution-guides", guidesParams),
      strapiFetchAll("kb-articles", kbParams)
    ]) : [[], [], []];
    return {
      vendor,
      briefs: briefsRows.map((row) => ({
        id: row.id,
        documentId: row.documentId,
        slug: row.slug,
        title: row.title,
        shortDescription: row.short_description,
        description: row.description
      })),
      guides: guidesRows.map((row) => ({
        id: row.id,
        documentId: row.documentId,
        slug: row.slug,
        title: row.title,
        summary: row.summary
      })),
      kbArticles: kbRows.map((row) => ({
        id: row.id,
        documentId: row.documentId,
        slug: row.slug,
        title: row.title,
        type: row.type
      }))
    };
  },
  { maxAge: 180, staleMaxAge: 600 }
);

export { _slug__get as default };
//# sourceMappingURL=_slug_.get.mjs.map
