import { _ as __nuxt_component_4 } from './SurfacePanel-DQt8N3wn.mjs';
import { defineComponent, mergeProps, withCtx, createVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent } from 'vue/server-renderer';
import { u as useServerSeoMeta } from './_plugin-vue_export-helper-CbwHDYEM.mjs';
import './server.mjs';
import '../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/plugins';
import 'unhead/utils';
import 'vue-router';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "program",
  __ssrInlineRender: true,
  setup(__props) {
    useServerSeoMeta({
      title: "VAN Program",
      description: "About the Vates Alliance Network program and value proposition."
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_SurfacePanel = __nuxt_component_4;
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "space-y-4" }, _attrs))}>`);
      _push(ssrRenderComponent(_component_SurfacePanel, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<p class="m-0 text-xs uppercase tracking-[0.08em] text-base-content/60"${_scopeId}>Program</p><h1 class="mt-1.5 mb-3 text-4xl font-bold"${_scopeId}>About the VAN Program</h1><p${_scopeId}> This static page is the foundation for VAN messaging before full CMS integration into the main Vates website. </p><h2 class="mt-5 mb-2 text-2xl font-semibold"${_scopeId}>What VAN delivers</h2><ul class="list-disc pl-5"${_scopeId}><li${_scopeId}>Alliance-based collaboration between Vates and vendor organizations</li><li${_scopeId}>Curated solutions to customer challenges</li><li${_scopeId}>Reusable knowledge assets for implementation and adoption</li></ul>`);
          } else {
            return [
              createVNode("p", { class: "m-0 text-xs uppercase tracking-[0.08em] text-base-content/60" }, "Program"),
              createVNode("h1", { class: "mt-1.5 mb-3 text-4xl font-bold" }, "About the VAN Program"),
              createVNode("p", null, " This static page is the foundation for VAN messaging before full CMS integration into the main Vates website. "),
              createVNode("h2", { class: "mt-5 mb-2 text-2xl font-semibold" }, "What VAN delivers"),
              createVNode("ul", { class: "list-disc pl-5" }, [
                createVNode("li", null, "Alliance-based collaboration between Vates and vendor organizations"),
                createVNode("li", null, "Curated solutions to customer challenges"),
                createVNode("li", null, "Reusable knowledge assets for implementation and adoption")
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</section>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/program.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=program-BZCwP4Pl.mjs.map
