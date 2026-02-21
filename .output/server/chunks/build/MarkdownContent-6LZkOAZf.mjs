import { defineComponent, computed, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs } from 'vue/server-renderer';
import MarkdownIt from 'markdown-it';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "MarkdownContent",
  __ssrInlineRender: true,
  props: {
    source: {}
  },
  setup(__props) {
    const props = __props;
    const md = new MarkdownIt({ html: false, linkify: true, breaks: true });
    const html = computed(() => md.render(props.source || ""));
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "prose max-w-none prose-headings:my-3 prose-p:my-2 prose-li:my-1" }, _attrs))}>${unref(html) ?? ""}</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/MarkdownContent.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __nuxt_component_2 = Object.assign(_sfc_main, { __name: "MarkdownContent" });

export { __nuxt_component_2 as _ };
//# sourceMappingURL=MarkdownContent-6LZkOAZf.mjs.map
