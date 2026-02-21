import { _ as __nuxt_component_4 } from './SurfacePanel-C-pYXDA3.mjs';
import { u as useFetch, _ as __nuxt_component_0, a as __nuxt_component_1 } from './fetch-3X_CteDi.mjs';
import { defineComponent, withAsyncContext, computed, mergeProps, withCtx, createVNode, unref, useSSRContext } from 'file:///Users/jb/code/VAN-frontend/node_modules/vue/index.mjs';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrInterpolate } from 'file:///Users/jb/code/VAN-frontend/node_modules/vue/server-renderer/index.mjs';
import { u as useServerSeoMeta } from './_plugin-vue_export-helper-2L1tSCQb.mjs';
import 'file:///Users/jb/code/VAN-frontend/node_modules/ohash/dist/index.mjs';
import 'file:///Users/jb/code/VAN-frontend/node_modules/@vue/shared/dist/shared.cjs.prod.js';
import './server.mjs';
import 'file:///Users/jb/code/VAN-frontend/node_modules/ofetch/dist/node.mjs';
import '../_/renderer.mjs';
import 'file:///Users/jb/code/VAN-frontend/node_modules/vue-bundle-renderer/dist/runtime.mjs';
import 'file:///Users/jb/code/VAN-frontend/node_modules/h3/dist/index.mjs';
import 'file:///Users/jb/code/VAN-frontend/node_modules/ufo/dist/index.mjs';
import 'file:///Users/jb/code/VAN-frontend/node_modules/destr/dist/index.mjs';
import '../nitro/nitro.mjs';
import 'file:///Users/jb/code/VAN-frontend/node_modules/hookable/dist/index.mjs';
import 'file:///Users/jb/code/VAN-frontend/node_modules/node-mock-http/dist/index.mjs';
import 'file:///Users/jb/code/VAN-frontend/node_modules/unstorage/dist/index.mjs';
import 'file:///Users/jb/code/VAN-frontend/node_modules/unstorage/drivers/fs.mjs';
import 'node:crypto';
import 'file:///Users/jb/code/VAN-frontend/node_modules/unstorage/drivers/fs-lite.mjs';
import 'file:///Users/jb/code/VAN-frontend/node_modules/unstorage/drivers/lru-cache.mjs';
import 'file:///Users/jb/code/VAN-frontend/node_modules/klona/dist/index.mjs';
import 'file:///Users/jb/code/VAN-frontend/node_modules/defu/dist/defu.mjs';
import 'file:///Users/jb/code/VAN-frontend/node_modules/scule/dist/index.mjs';
import 'file:///Users/jb/code/VAN-frontend/node_modules/unctx/dist/index.mjs';
import 'file:///Users/jb/code/VAN-frontend/node_modules/radix3/dist/index.mjs';
import 'node:fs';
import 'node:url';
import 'file:///Users/jb/code/VAN-frontend/node_modules/pathe/dist/index.mjs';
import 'file:///Users/jb/code/VAN-frontend/node_modules/unhead/dist/server.mjs';
import 'file:///Users/jb/code/VAN-frontend/node_modules/devalue/index.js';
import 'file:///Users/jb/code/VAN-frontend/node_modules/unhead/dist/plugins.mjs';
import 'file:///Users/jb/code/VAN-frontend/node_modules/unhead/dist/utils.mjs';
import 'file:///Users/jb/code/VAN-frontend/node_modules/vue-router/vue-router.node.mjs';
import 'file:///Users/jb/code/VAN-frontend/node_modules/perfect-debounce/dist/index.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "solutions",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const { data, pending, error } = ([__temp, __restore] = withAsyncContext(() => useFetch(
      "/api/solutions",
      "$B-V9D0UltY"
      /* nuxt-injected */
    )), __temp = await __temp, __restore(), __temp);
    const solutions = computed(() => data.value || []);
    useServerSeoMeta({
      title: "VAN Solutions",
      description: "Browse VAN partner solutions."
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_SurfacePanel = __nuxt_component_4;
      const _component_LoadingState = __nuxt_component_0;
      const _component_ErrorState = __nuxt_component_1;
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "space-y-4" }, _attrs))}>`);
      _push(ssrRenderComponent(_component_SurfacePanel, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<p class="m-0 text-xs uppercase tracking-[0.08em] text-base-content/60"${_scopeId}>Solutions</p><h1 class="mt-1.5 mb-3 text-4xl font-bold"${_scopeId}>Solutions Catalog</h1>`);
          } else {
            return [
              createVNode("p", { class: "m-0 text-xs uppercase tracking-[0.08em] text-base-content/60" }, "Solutions"),
              createVNode("h1", { class: "mt-1.5 mb-3 text-4xl font-bold" }, "Solutions Catalog")
            ];
          }
        }),
        _: 1
      }, _parent));
      if (unref(pending)) {
        _push(ssrRenderComponent(_component_LoadingState, null, null, _parent));
      } else if (unref(error)) {
        _push(ssrRenderComponent(_component_ErrorState, {
          message: unref(error).message
        }, null, _parent));
      } else if (unref(solutions).length) {
        _push(`<section class="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3"><!--[-->`);
        ssrRenderList(unref(solutions), (item) => {
          _push(`<article class="card border border-base-300 bg-base-100"><div class="card-body"><h2 class="card-title">${ssrInterpolate(item.name || item.title)}</h2><p class="text-sm text-base-content/80">${ssrInterpolate(item.shortDescription || item.summary || "No summary available.")}</p></div></article>`);
        });
        _push(`<!--]--></section>`);
      } else {
        _push(ssrRenderComponent(_component_SurfacePanel, null, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<p${_scopeId}>No solutions available.</p>`);
            } else {
              return [
                createVNode("p", null, "No solutions available.")
              ];
            }
          }),
          _: 1
        }, _parent));
      }
      _push(`</section>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/solutions.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=solutions-CCDpD_sj.mjs.map
