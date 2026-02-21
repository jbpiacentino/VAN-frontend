import { hasInjectionContext, inject } from 'file:///Users/jb/code/VAN-frontend/node_modules/vue/index.mjs';
import { a as useNuxtApp } from './server.mjs';
import { u as useHead$1, h as headSymbol, a as useServerSeoMeta$1 } from '../_/renderer.mjs';

function injectHead(nuxtApp) {
  var _a;
  const nuxt = nuxtApp || useNuxtApp();
  return ((_a = nuxt.ssrContext) == null ? void 0 : _a.head) || nuxt.runWithContext(() => {
    if (hasInjectionContext()) {
      const head = inject(headSymbol);
      if (!head) {
        throw new Error("[nuxt] [unhead] Missing Unhead instance.");
      }
      return head;
    }
  });
}
function useHead(input, options = {}) {
  const head = options.head || injectHead(options.nuxt);
  return useHead$1(input, { head, ...options });
}
function useServerSeoMeta(input, options = {}) {
  const head = options.head || injectHead(options.nuxt);
  return useServerSeoMeta$1(input, { head, ...options });
}
const _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};

export { _export_sfc as _, useHead as a, useServerSeoMeta as u };
//# sourceMappingURL=_plugin-vue_export-helper-2L1tSCQb.mjs.map
