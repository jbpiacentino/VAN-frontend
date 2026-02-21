import { u as useFetch, _ as __nuxt_component_0, a as __nuxt_component_1 } from './fetch-S_GgILK8.mjs';
import { _ as __nuxt_component_4 } from './SurfacePanel-DQt8N3wn.mjs';
import { _ as __nuxt_component_2 } from './MarkdownContent-6LZkOAZf.mjs';
import { defineComponent, withAsyncContext, computed, unref, mergeProps, withCtx, createVNode, toDisplayString, openBlock, createBlock, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrInterpolate } from 'vue/server-renderer';
import { u as useServerSeoMeta } from './_plugin-vue_export-helper-CbwHDYEM.mjs';
import '../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import '@vue/shared';
import './server.mjs';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/plugins';
import 'unhead/utils';
import 'vue-router';
import 'perfect-debounce';
import 'markdown-it';

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
    const landingTitle = computed(() => data.value?.title || data.value?.name || "Alliance Network");
    const landingContent = computed(() => data.value?.content || data.value?.body || "");
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
//# sourceMappingURL=index-B6RpcjG2.mjs.map
