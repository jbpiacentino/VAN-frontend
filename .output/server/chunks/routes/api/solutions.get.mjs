import { d as defineEventHandler } from '../../nitro/nitro.mjs';
import { s as strapiFetchAll } from '../../_/strapi.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';

const solutions_get = defineEventHandler(async () => {
  const rows = await strapiFetchAll("solutions", {
    populate: "*",
    "sort[0]": "name:asc"
  });
  return rows.map((solution) => ({
    id: solution.id,
    documentId: solution.documentId,
    slug: solution.slug,
    name: solution.name,
    title: solution.title,
    summary: solution.summary,
    shortDescription: solution.short_description,
    description: solution.description
  }));
});

export { solutions_get as default };
//# sourceMappingURL=solutions.get.mjs.map
