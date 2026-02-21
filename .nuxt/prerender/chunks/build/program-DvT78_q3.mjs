import { _ as __nuxt_component_4 } from './SurfacePanel-C-pYXDA3.mjs';
import { defineComponent, mergeProps, withCtx, createVNode, useSSRContext } from 'file:///Users/jb/code/VAN-frontend/node_modules/vue/index.mjs';
import { ssrRenderAttrs, ssrRenderComponent } from 'file:///Users/jb/code/VAN-frontend/node_modules/vue/server-renderer/index.mjs';
import { u as useServerSeoMeta } from './_plugin-vue_export-helper-2L1tSCQb.mjs';
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
import 'file:///Users/jb/code/VAN-frontend/node_modules/ohash/dist/index.mjs';
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
//# sourceMappingURL=program-DvT78_q3.mjs.map
