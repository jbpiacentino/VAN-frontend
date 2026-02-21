import { u as useFetch, _ as __nuxt_component_0, a as __nuxt_component_1 } from './fetch-3X_CteDi.mjs';
import { _ as __nuxt_component_4 } from './SurfacePanel-C-pYXDA3.mjs';
import { _ as __nuxt_component_2 } from './MarkdownContent-6LZkOAZf.mjs';
import { defineComponent, withAsyncContext, computed, unref, mergeProps, withCtx, createVNode, toDisplayString, openBlock, createBlock, useSSRContext } from 'file:///Users/jb/code/VAN-frontend/node_modules/vue/index.mjs';
import { ssrRenderComponent, ssrInterpolate } from 'file:///Users/jb/code/VAN-frontend/node_modules/vue/server-renderer/index.mjs';
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
import 'file:///Users/jb/code/VAN-frontend/node_modules/markdown-it/index.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const { data, pending, error } = ([__temp, __restore] = withAsyncContext(() => useFetch(
      "/api/landing",
      "$PYw-ykZnwC"
      /* nuxt-injected */
    )), __temp = await __temp, __restore(), __temp);
    const landingTitle = computed(() => {
      var _a, _b;
      return ((_a = data.value) == null ? void 0 : _a.title) || ((_b = data.value) == null ? void 0 : _b.name) || "Alliance Network";
    });
    const landingContent = computed(() => {
      var _a, _b;
      return ((_a = data.value) == null ? void 0 : _a.content) || ((_b = data.value) == null ? void 0 : _b.body) || "";
    });
    useServerSeoMeta({
      title: "Vates Alliance Network",
      description: "Official VAN landing page with alliance overview and resources."
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_LoadingState = __nuxt_component_0;
      const _component_ErrorState = __nuxt_component_1;
      const _component_SurfacePanel = __nuxt_component_4;
      const _component_MarkdownContent = __nuxt_component_2;
      if (unref(pending)) {
        _push(ssrRenderComponent(_component_LoadingState, _attrs, null, _parent));
      } else if (unref(error)) {
        _push(ssrRenderComponent(_component_ErrorState, mergeProps({
          message: unref(error).message
        }, _attrs), null, _parent));
      } else {
        _push(ssrRenderComponent(_component_SurfacePanel, _attrs, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<p class="m-0 text-xs uppercase tracking-[0.08em] text-base-content/60"${_scopeId}>Landing</p><h1 class="mt-1.5 mb-3 text-4xl font-bold"${_scopeId}>${ssrInterpolate(unref(landingTitle))}</h1>`);
              if (unref(landingContent)) {
                _push2(ssrRenderComponent(_component_MarkdownContent, { source: unref(landingContent) }, null, _parent2, _scopeId));
              } else {
                _push2(`<p${_scopeId}>No landing page content found.</p>`);
              }
            } else {
              return [
                createVNode("p", { class: "m-0 text-xs uppercase tracking-[0.08em] text-base-content/60" }, "Landing"),
                createVNode("h1", { class: "mt-1.5 mb-3 text-4xl font-bold" }, toDisplayString(unref(landingTitle)), 1),
                unref(landingContent) ? (openBlock(), createBlock(_component_MarkdownContent, {
                  key: 0,
                  source: unref(landingContent)
                }, null, 8, ["source"])) : (openBlock(), createBlock("p", { key: 1 }, "No landing page content found."))
              ];
            }
          }),
          _: 1
        }, _parent));
      }
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-DZ--RzDt.mjs.map
