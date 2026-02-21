import { u as useFetch, _ as __nuxt_component_0, a as __nuxt_component_1 } from './fetch-S_GgILK8.mjs';
import { _ as __nuxt_component_2 } from './MarkdownContent-6LZkOAZf.mjs';
import { defineComponent, computed, withAsyncContext, unref, mergeProps, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderAttrs, ssrInterpolate, ssrRenderAttr, ssrRenderList } from 'vue/server-renderer';
import { a as useRoute } from './server.mjs';
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
import 'perfect-debounce';
import 'markdown-it';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/plugins';
import 'unhead/utils';
import 'vue-router';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "[slug]",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const route = useRoute();
    const slug = computed(() => String(route.params.slug || ""));
    const { data, pending, error } = ([__temp, __restore] = withAsyncContext(() => useFetch(
      () => `/api/vendors/${slug.value}`,
      "$0p0LuG1Od3"
      /* nuxt-injected */
    )), __temp = await __temp, __restore(), __temp);
    const vendor = computed(() => data.value?.vendor || null);
    const briefs = computed(() => data.value?.briefs || []);
    const guides = computed(() => data.value?.guides || []);
    const kbArticles = computed(() => data.value?.kbArticles || []);
    const joinedList = (values) => Array.isArray(values) && values.length ? values.join(", ") : "N/A";
    useServerSeoMeta({
      title: () => vendor.value?.name ? `${vendor.value.name} | VAN` : "Vendor | VAN",
      description: () => vendor.value?.shortDescription || "Vendor details in Vates Alliance Network."
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_LoadingState = __nuxt_component_0;
      const _component_ErrorState = __nuxt_component_1;
      const _component_MarkdownContent = __nuxt_component_2;
      if (unref(pending)) {
        _push(ssrRenderComponent(_component_LoadingState, _attrs, null, _parent));
      } else if (unref(error)) {
        _push(ssrRenderComponent(_component_ErrorState, mergeProps({
          message: unref(error).message
        }, _attrs), null, _parent));
      } else if (unref(vendor)) {
        _push(`<section${ssrRenderAttrs(mergeProps({ class: "space-y-6" }, _attrs))}><div class="hero rounded-box bg-base-300"><div class="hero-content w-full flex-col items-start gap-6 px-6 py-8 md:flex-row md:items-center md:justify-between"><div class="space-y-2"><p class="text-xs uppercase tracking-wide text-base-content/60">Vendor profile</p><h1 class="text-4xl font-bold">${ssrInterpolate(unref(vendor).name)}</h1><p class="text-base-content/70">${ssrInterpolate(unref(vendor).shortDescription || "Alliance partner profile and solution highlights.")}</p></div>`);
        if (unref(vendor).logoUrl) {
          _push(`<div class="rounded-box border border-base-300 bg-base-100 p-4"><img${ssrRenderAttr("src", unref(vendor).logoUrl)}${ssrRenderAttr("alt", `${unref(vendor).name} logo`)} class="h-20 w-auto object-contain"></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div><div class="grid gap-6 lg:grid-cols-[2fr_1fr]"><article class="card"><div class="card-body"><h2 class="card-title">About ${ssrInterpolate(unref(vendor).name)}</h2>`);
        if (unref(vendor).description) {
          _push(ssrRenderComponent(_component_MarkdownContent, {
            source: unref(vendor).description
          }, null, _parent));
        } else {
          _push(`<p>${ssrInterpolate(unref(vendor).summary || "No description available yet.")}</p>`);
        }
        _push(`</div></article><aside class="card bg-base-200"><div class="card-body space-y-3"><h2 class="card-title">Partner Details</h2><div><p class="text-sm font-semibold">VAN tier</p><p class="text-base-content/80">${ssrInterpolate(unref(vendor).vanTier || "Not a VAN member")}</p></div><div><p class="text-sm font-semibold">Areas of focus</p><p class="text-base-content/80">${ssrInterpolate(joinedList(unref(vendor).areaOfFocus))}</p></div><div><p class="text-sm font-semibold">Regions</p><p class="text-base-content/80">${ssrInterpolate(joinedList(unref(vendor).regions))}</p></div><div><p class="text-sm font-semibold">Website</p>`);
        if (unref(vendor).website) {
          _push(`<a${ssrRenderAttr("href", unref(vendor).website)} target="_blank" rel="noreferrer" class="link link-primary break-all">${ssrInterpolate(unref(vendor).website)}</a>`);
        } else {
          _push(`<p class="text-base-content/60">N/A</p>`);
        }
        _push(`</div><div><p class="text-sm font-semibold">Links</p>`);
        if (unref(vendor).links?.length) {
          _push(`<ul class="space-y-1"><!--[-->`);
          ssrRenderList(unref(vendor).links, (link) => {
            _push(`<li><a${ssrRenderAttr("href", link.url)} target="_blank" rel="noreferrer" class="link link-primary break-all">${ssrInterpolate(link.label)}</a></li>`);
          });
          _push(`<!--]--></ul>`);
        } else {
          _push(`<p class="text-base-content/60">N/A</p>`);
        }
        _push(`</div></div></aside></div><section class="space-y-3"><h2 class="text-2xl font-bold">Solution Briefs</h2>`);
        if (unref(briefs).length) {
          _push(`<div class="grid gap-4 md:grid-cols-2 xl:grid-cols-3"><!--[-->`);
          ssrRenderList(unref(briefs), (brief) => {
            _push(`<article class="card border border-base-300 bg-base-100"><div class="card-body"><h3 class="card-title text-lg">${ssrInterpolate(brief.title)}</h3><p class="text-sm text-base-content/80">${ssrInterpolate(brief.shortDescription || brief.description || "No summary available.")}</p></div></article>`);
          });
          _push(`<!--]--></div>`);
        } else {
          _push(`<div class="alert border border-base-300 bg-base-100"><span>No solution briefs linked to this vendor.</span></div>`);
        }
        _push(`</section><section class="space-y-3"><h2 class="text-2xl font-bold">Solution Guides</h2>`);
        if (unref(guides).length) {
          _push(`<div class="grid gap-4 md:grid-cols-2 xl:grid-cols-3"><!--[-->`);
          ssrRenderList(unref(guides), (guide) => {
            _push(`<article class="card border border-base-300 bg-base-100"><div class="card-body"><h3 class="card-title text-lg">${ssrInterpolate(guide.title)}</h3><p class="text-sm text-base-content/80">${ssrInterpolate(guide.summary || "No summary available.")}</p></div></article>`);
          });
          _push(`<!--]--></div>`);
        } else {
          _push(`<div class="alert border border-base-300 bg-base-100"><span>No solution guides linked to this vendor.</span></div>`);
        }
        _push(`</section><section class="space-y-3"><h2 class="text-2xl font-bold">KB Articles</h2>`);
        if (unref(kbArticles).length) {
          _push(`<ul class="menu rounded-box border border-base-300 bg-base-100"><!--[-->`);
          ssrRenderList(unref(kbArticles), (kb) => {
            _push(`<li class="border-b border-base-200 last:border-0"><div class="flex items-center justify-between gap-3 py-2"><span class="font-medium">${ssrInterpolate(kb.title)}</span><span class="text-xs text-base-content/60">${ssrInterpolate(kb.type || "article")}</span></div></li>`);
          });
          _push(`<!--]--></ul>`);
        } else {
          _push(`<div class="alert border border-base-300 bg-base-100"><span>No KB articles linked to this vendor.</span></div>`);
        }
        _push(`</section></section>`);
      } else {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "alert border border-base-300 bg-base-100" }, _attrs))}><span>Vendor not found.</span></div>`);
      }
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/vendors/[slug].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=_slug_-CByiNQdt.mjs.map
