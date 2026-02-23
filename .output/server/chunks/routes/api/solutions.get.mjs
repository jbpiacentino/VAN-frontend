import { d as defineEventHandler, e as getQuery } from '../../nitro/nitro.mjs';
import { a as strapiFetch, b as relationFirst } from '../../_/strapi.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';

function parsePositiveInt(value, fallback) {
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed > 0 ? Math.floor(parsed) : fallback;
}
const solutions_get = defineEventHandler(async (event) => {
  var _a;
  const query = getQuery(event);
  const page = parsePositiveInt(query.page, 1);
  const pageSize = Math.min(parsePositiveInt(query.pageSize, 10), 100);
  const response = await strapiFetch("/solutions", {
    populate: "*",
    "sort[0]": "name:asc",
    "pagination[page]": page,
    "pagination[pageSize]": pageSize
  });
  const rows = Array.isArray(response == null ? void 0 : response.data) ? response.data : [];
  const pagination = ((_a = response == null ? void 0 : response.meta) == null ? void 0 : _a.pagination) || {};
  return {
    items: rows.map((solution) => {
      const vendor = relationFirst(solution == null ? void 0 : solution.vendor);
      return {
        id: solution.id,
        documentId: solution.documentId,
        slug: solution.slug,
        name: solution.name || solution.title || "",
        shortDescription: solution.short_description || "",
        summary: solution.summary || "",
        solutionType: solution.solution_type || "",
        workflow: solution.workflow || "",
        vendor: vendor ? {
          slug: vendor.slug || "",
          name: vendor.name || ""
        } : null
      };
    }),
    pagination: {
      page: Number(pagination.page || page),
      pageSize: Number(pagination.pageSize || pageSize),
      pageCount: Number(pagination.pageCount || 1),
      total: Number(pagination.total || rows.length)
    }
  };
});

export { solutions_get as default };
//# sourceMappingURL=solutions.get.mjs.map
