import { defineComponent, ref, watch, computed, withAsyncContext, unref, withCtx, createVNode, mergeProps, resolveDynamicComponent, openBlock, createBlock, toDisplayString, createCommentVNode, Fragment, renderList, useSSRContext } from 'file:///Users/jb/code/VAN-frontend/node_modules/vue/index.mjs';
import { ssrRenderComponent, ssrInterpolate, ssrIncludeBooleanAttr, ssrLooseContain, ssrRenderList, ssrRenderAttrs, ssrRenderAttr, ssrRenderClass, ssrRenderVNode } from 'file:///Users/jb/code/VAN-frontend/node_modules/vue/server-renderer/index.mjs';
import { PuzzlePieceIcon, BeakerIcon, MapIcon, WrenchScrewdriverIcon, MagnifyingGlassIcon, XMarkIcon } from 'file:///Users/jb/code/VAN-frontend/node_modules/@heroicons/vue/24/outline/esm/index.js';
import { u as useFetch, _ as __nuxt_component_0$1, a as __nuxt_component_1 } from './fetch-3X_CteDi.mjs';
import { _ as __nuxt_component_0$2 } from './server.mjs';
import { _ as __nuxt_component_4 } from './SurfacePanel-C-pYXDA3.mjs';
import { u as useServerSeoMeta } from './_plugin-vue_export-helper-2L1tSCQb.mjs';
import 'file:///Users/jb/code/VAN-frontend/node_modules/ohash/dist/index.mjs';
import 'file:///Users/jb/code/VAN-frontend/node_modules/@vue/shared/dist/shared.cjs.prod.js';
import 'file:///Users/jb/code/VAN-frontend/node_modules/perfect-debounce/dist/index.mjs';
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

const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "VanFinderControls",
  __ssrInlineRender: true,
  props: {
    query: {},
    selectedFocuses: {},
    focusOptions: {}
  },
  emits: ["update:query", "clear-query", "select-all-focuses", "toggle-focus"],
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "mb-6 space-y-5" }, _attrs))}><h1 class="text-center text-4xl font-bold text-base-content md:text-5xl">Vates Alliance Network Members finder</h1><div class="join w-full"><label class="input input-bordered join-item w-full border-base-300 bg-base-100">`);
      _push(ssrRenderComponent(unref(MagnifyingGlassIcon), { class: "h-5 w-5 opacity-60" }, null, _parent));
      _push(`<input id="member-search"${ssrRenderAttr("value", __props.query)} type="search" class="grow" placeholder="Type a member or solution name">`);
      if (__props.query) {
        _push(`<button type="button" class="btn btn-ghost btn-circle btn-xs" title="Clear">`);
        _push(ssrRenderComponent(unref(XMarkIcon), { class: "h-4 w-4" }, null, _parent));
        _push(`</button>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</label><button class="btn btn-primary join-item" type="button" aria-label="Search">`);
      _push(ssrRenderComponent(unref(MagnifyingGlassIcon), { class: "h-5 w-5" }, null, _parent));
      _push(`</button></div><form class="filter flex flex-wrap items-center gap-2"><button type="button" class="${ssrRenderClass([__props.selectedFocuses.length === 0 ? "btn-primary" : "btn-outline", "btn btn-xs btn-soft"])}" aria-label="All"> All </button><!--[-->`);
      ssrRenderList(__props.focusOptions, (focus) => {
        _push(`<button type="button" class="${ssrRenderClass([__props.selectedFocuses.includes(focus) ? "btn-primary" : "btn-outline", "btn btn-xs btn-soft"])}"${ssrRenderAttr("aria-label", focus)}>${ssrInterpolate(focus)}</button>`);
      });
      _push(`<!--]--></form></section>`);
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/VanFinderControls.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const __nuxt_component_0 = Object.assign(_sfc_main$2, { __name: "VanFinderControls" });
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "VanFinderVendorCard",
  __ssrInlineRender: true,
  props: {
    vendor: {},
    tierBadge: {},
    description: {},
    resources: {}
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$2;
      _push(ssrRenderComponent(_component_NuxtLink, mergeProps({
        to: `/vendors/${__props.vendor.slug}`,
        class: "card border border-base-300 bg-base-100 shadow-sm transition hover:shadow-lg"
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          var _a, _b;
          if (_push2) {
            _push2(`<div class="card-body relative p-5"${_scopeId}>`);
            if (__props.tierBadge) {
              _push2(`<span class="badge badge-neutral absolute top-4 right-4"${_scopeId}>${ssrInterpolate(__props.tierBadge)}</span>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<div class="flex h-24 items-center justify-center"${_scopeId}>`);
            if (__props.vendor.logoUrl) {
              _push2(`<img${ssrRenderAttr("src", __props.vendor.logoUrl)}${ssrRenderAttr("alt", `${__props.vendor.name} logo`)} class="max-h-20 w-auto object-contain"${_scopeId}>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><h3 class="card-title mt-2 text-4xl"${_scopeId}>${ssrInterpolate(__props.vendor.name)}</h3>`);
            if ((_a = __props.vendor.areaOfFocus) == null ? void 0 : _a.length) {
              _push2(`<p class="text-sm text-base-content/70"${_scopeId}>${ssrInterpolate(__props.vendor.areaOfFocus.join(", "))}</p>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<p class="line-clamp-6 text-base-content"${_scopeId}>${ssrInterpolate(__props.description)}</p>`);
            if (__props.resources.length) {
              _push2(`<div class="mt-auto flex flex-wrap gap-1.5 pt-2"${_scopeId}><!--[-->`);
              ssrRenderList(__props.resources, (item) => {
                _push2(`<span class="badge badge-outline gap-1 text-xs"${ssrRenderAttr("title", item.label)}${ssrRenderAttr("aria-label", `${item.label}: ${item.count}`)}${_scopeId}>`);
                ssrRenderVNode(_push2, createVNode(resolveDynamicComponent(item.icon), {
                  class: "h-3.5 w-3.5",
                  "aria-hidden": "true"
                }, null), _parent2, _scopeId);
                _push2(`<span${_scopeId}>${ssrInterpolate(item.count)}</span></span>`);
              });
              _push2(`<!--]--></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "card-body relative p-5" }, [
                __props.tierBadge ? (openBlock(), createBlock("span", {
                  key: 0,
                  class: "badge badge-neutral absolute top-4 right-4"
                }, toDisplayString(__props.tierBadge), 1)) : createCommentVNode("", true),
                createVNode("div", { class: "flex h-24 items-center justify-center" }, [
                  __props.vendor.logoUrl ? (openBlock(), createBlock("img", {
                    key: 0,
                    src: __props.vendor.logoUrl,
                    alt: `${__props.vendor.name} logo`,
                    class: "max-h-20 w-auto object-contain"
                  }, null, 8, ["src", "alt"])) : createCommentVNode("", true)
                ]),
                createVNode("h3", { class: "card-title mt-2 text-4xl" }, toDisplayString(__props.vendor.name), 1),
                ((_b = __props.vendor.areaOfFocus) == null ? void 0 : _b.length) ? (openBlock(), createBlock("p", {
                  key: 1,
                  class: "text-sm text-base-content/70"
                }, toDisplayString(__props.vendor.areaOfFocus.join(", ")), 1)) : createCommentVNode("", true),
                createVNode("p", { class: "line-clamp-6 text-base-content" }, toDisplayString(__props.description), 1),
                __props.resources.length ? (openBlock(), createBlock("div", {
                  key: 2,
                  class: "mt-auto flex flex-wrap gap-1.5 pt-2"
                }, [
                  (openBlock(true), createBlock(Fragment, null, renderList(__props.resources, (item) => {
                    return openBlock(), createBlock("span", {
                      key: `${item.key}-${item.count}`,
                      class: "badge badge-outline gap-1 text-xs",
                      title: item.label,
                      "aria-label": `${item.label}: ${item.count}`
                    }, [
                      (openBlock(), createBlock(resolveDynamicComponent(item.icon), {
                        class: "h-3.5 w-3.5",
                        "aria-hidden": "true"
                      })),
                      createVNode("span", null, toDisplayString(item.count), 1)
                    ], 8, ["title", "aria-label"]);
                  }), 128))
                ])) : createCommentVNode("", true)
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/VanFinderVendorCard.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_3 = Object.assign(_sfc_main$1, { __name: "VanFinderVendorCard" });
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "van-finder",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const query = ref("");
    const selectedFocuses = ref([]);
    const includeNonMembers = ref(false);
    const debouncedQuery = ref("");
    let timer = null;
    watch(query, (next) => {
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        debouncedQuery.value = next;
      }, 180);
    });
    const params = computed(() => ({
      q: debouncedQuery.value,
      focuses: selectedFocuses.value.join(","),
      includeNonMembers: includeNonMembers.value ? "true" : "false",
      page: "1",
      pageSize: "30"
    }));
    const { data, pending, error, refresh } = ([__temp, __restore] = withAsyncContext(() => useFetch(
      "/api/van-finder/vendors",
      {
        query: params
      },
      "$ZceytGmXuc"
      /* nuxt-injected */
    )), __temp = await __temp, __restore(), __temp);
    watch(params, () => refresh());
    const items = computed(() => {
      var _a;
      return ((_a = data.value) == null ? void 0 : _a.items) || [];
    });
    const total = computed(() => {
      var _a, _b;
      return Number(((_b = (_a = data.value) == null ? void 0 : _a.meta) == null ? void 0 : _b.total) || 0);
    });
    const focusOptions = computed(() => {
      var _a;
      return ((_a = data.value) == null ? void 0 : _a.focusOptions) || [];
    });
    function clearQuery() {
      query.value = "";
      debouncedQuery.value = "";
    }
    function toggleFocus(focus) {
      if (selectedFocuses.value.includes(focus)) {
        selectedFocuses.value = selectedFocuses.value.filter((item) => item !== focus);
        return;
      }
      selectedFocuses.value = [...selectedFocuses.value, focus];
    }
    function tierBadge(vendor) {
      const tier = String((vendor == null ? void 0 : vendor.vanTier) || "").toLowerCase();
      if (tier === "regular") return "VAN member";
      if (tier === "strategic" || tier === "startegic") return "Strategic";
      return "";
    }
    function visibleResources(vendor) {
      const counts = (vendor == null ? void 0 : vendor.resources) || {};
      const values = [
        { key: "solutions", count: Number(counts.solutions || 0), label: "Solutions", icon: PuzzlePieceIcon },
        { key: "briefs", count: Number(counts.briefs || 0), label: "Solution briefs", icon: BeakerIcon },
        { key: "guides", count: Number(counts.guides || 0), label: "Solution guides", icon: MapIcon },
        { key: "kb", count: Number(counts.kb || 0), label: "Knowledge base articles", icon: WrenchScrewdriverIcon }
      ];
      return values.filter((entry) => entry.count > 0);
    }
    useServerSeoMeta({
      title: "VAN Finder",
      description: "Find Vates Alliance Network members, areas of focus, and linked resources."
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_VanFinderControls = __nuxt_component_0;
      const _component_LoadingState = __nuxt_component_0$1;
      const _component_ErrorState = __nuxt_component_1;
      const _component_VanFinderVendorCard = __nuxt_component_3;
      const _component_SurfacePanel = __nuxt_component_4;
      _push(`<!--[-->`);
      _push(ssrRenderComponent(_component_VanFinderControls, {
        query: unref(query),
        "selected-focuses": unref(selectedFocuses),
        "focus-options": unref(focusOptions),
        "onUpdate:query": ($event) => query.value = $event,
        onClearQuery: clearQuery,
        onSelectAllFocuses: ($event) => selectedFocuses.value = [],
        onToggleFocus: toggleFocus
      }, null, _parent));
      _push(`<section class="space-y-4"><div class="flex items-center justify-between gap-3"><h2 class="text-3xl font-bold text-base-content">${ssrInterpolate(unref(total))} match your search</h2><label class="label cursor-pointer gap-2"><span class="label-text">Include non VAN members</span><input${ssrIncludeBooleanAttr(Array.isArray(unref(includeNonMembers)) ? ssrLooseContain(unref(includeNonMembers), null) : unref(includeNonMembers)) ? " checked" : ""} type="checkbox" class="toggle toggle-sm"></label></div>`);
      if (unref(pending)) {
        _push(ssrRenderComponent(_component_LoadingState, null, null, _parent));
      } else if (unref(error)) {
        _push(ssrRenderComponent(_component_ErrorState, {
          message: unref(error).message
        }, null, _parent));
      } else if (unref(items).length) {
        _push(`<section class="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3"><!--[-->`);
        ssrRenderList(unref(items), (vendor) => {
          _push(ssrRenderComponent(_component_VanFinderVendorCard, {
            key: vendor.documentId || vendor.id || vendor.slug,
            vendor,
            "tier-badge": tierBadge(vendor),
            description: vendor.descriptionPreview,
            resources: visibleResources(vendor)
          }, null, _parent));
        });
        _push(`<!--]--></section>`);
      } else {
        _push(ssrRenderComponent(_component_SurfacePanel, null, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<p${_scopeId}>No matching vendors found.</p>`);
            } else {
              return [
                createVNode("p", null, "No matching vendors found.")
              ];
            }
          }),
          _: 1
        }, _parent));
      }
      _push(`</section><!--]-->`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/van-finder.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=van-finder-BKJCXOX1.mjs.map
