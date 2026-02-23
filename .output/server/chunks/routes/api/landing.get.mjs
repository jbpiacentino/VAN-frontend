import { d as defineEventHandler, u as useRuntimeConfig } from '../../nitro/nitro.mjs';
import { a as strapiFetch } from '../../_/strapi.mjs';
import { w as withAttributes, p as pickStaticPageContent, a as pickStaticPageTitle } from '../../_/strapi-richtext.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';

const landing_get = defineEventHandler(async () => {
  const config = useRuntimeConfig();
  const slug = String(config.landingSingleType || "landing-page").trim();
  const response = await strapiFetch("/static-pages", {
    populate: "*",
    "filters[slug][$eq]": slug,
    "pagination[pageSize]": 1
  });
  const raw = withAttributes(Array.isArray(response == null ? void 0 : response.data) ? response.data[0] : null);
  if (!raw || Object.keys(raw).length === 0) return null;
  return {
    ...raw,
    title: pickStaticPageTitle(raw),
    content: pickStaticPageContent(raw)
  };
});

export { landing_get as default };
//# sourceMappingURL=landing.get.mjs.map
