import { defineEventHandler } from 'file:///Users/jb/code/VAN-frontend/node_modules/h3/dist/index.mjs';
import { u as useRuntimeConfig } from '../../nitro/nitro.mjs';
import { s as strapiFetch } from '../../_/strapi.mjs';
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

const landing_get = defineEventHandler(async () => {
  const config = useRuntimeConfig();
  const singleType = String(config.landingSingleType || "landing-page");
  const response = await strapiFetch(`/${singleType}`, { populate: "*" });
  return (response == null ? void 0 : response.data) || null;
});

export { landing_get as default };
//# sourceMappingURL=landing.get.mjs.map
