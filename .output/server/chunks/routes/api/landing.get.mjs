import { d as defineEventHandler, u as useRuntimeConfig } from '../../nitro/nitro.mjs';
import { s as strapiFetch } from '../../_/strapi.mjs';
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
  const singleType = String(config.landingSingleType || "landing-page");
  const response = await strapiFetch(`/${singleType}`, { populate: "*" });
  return (response == null ? void 0 : response.data) || null;
});

export { landing_get as default };
//# sourceMappingURL=landing.get.mjs.map
