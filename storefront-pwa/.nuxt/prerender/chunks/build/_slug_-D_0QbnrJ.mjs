import { defineComponent, ref, withAsyncContext, computed, watch, mergeProps, unref, useSSRContext } from 'file://C:/laragon/www/ecom-wms/storefront-pwa/node_modules/vue/index.mjs';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderList, ssrRenderAttr, ssrRenderClass } from 'file://C:/laragon/www/ecom-wms/storefront-pwa/node_modules/vue/server-renderer/index.mjs';
import { u as useAsyncData } from './asyncData-DBk6s2t8.mjs';
import { _ as __nuxt_component_1 } from './SkeletonCard-Dzn9IcWD.mjs';
import { _ as _sfc_main$3 } from './ProductCard-KEPk7OKU.mjs';
import { u as useRoute } from './server.mjs';
import 'file://C:/laragon/www/ecom-wms/storefront-pwa/node_modules/perfect-debounce/dist/index.mjs';
import './nuxt-link-B2doaXW1.mjs';
import './cart-TRz18UDQ.mjs';
import 'file://C:/laragon/www/ecom-wms/storefront-pwa/node_modules/pinia/dist/pinia.prod.cjs';
import './ui-CDZkXfd4.mjs';
import 'file://C:/laragon/www/ecom-wms/storefront-pwa/node_modules/ofetch/dist/node.mjs';
import '../_/nitro.mjs';
import 'file://C:/laragon/www/ecom-wms/storefront-pwa/node_modules/h3/dist/index.mjs';
import 'file://C:/laragon/www/ecom-wms/storefront-pwa/node_modules/destr/dist/index.mjs';
import 'file://C:/laragon/www/ecom-wms/storefront-pwa/node_modules/hookable/dist/index.mjs';
import 'file://C:/laragon/www/ecom-wms/storefront-pwa/node_modules/node-mock-http/dist/index.mjs';
import 'file://C:/laragon/www/ecom-wms/storefront-pwa/node_modules/klona/dist/index.mjs';
import 'file://C:/laragon/www/ecom-wms/storefront-pwa/node_modules/defu/dist/defu.mjs';
import 'file://C:/laragon/www/ecom-wms/storefront-pwa/node_modules/scule/dist/index.mjs';
import 'file://C:/laragon/www/ecom-wms/storefront-pwa/node_modules/radix3/dist/index.mjs';
import 'node:fs';
import 'node:url';
import 'file://C:/laragon/www/ecom-wms/storefront-pwa/node_modules/pathe/dist/index.mjs';
import 'file://C:/laragon/www/ecom-wms/storefront-pwa/node_modules/ipx/dist/index.mjs';
import 'file://C:/laragon/www/ecom-wms/storefront-pwa/node_modules/unstorage/dist/index.mjs';
import 'file://C:/laragon/www/ecom-wms/storefront-pwa/node_modules/unstorage/drivers/fs.mjs';
import 'file:///C:/laragon/www/ecom-wms/storefront-pwa/node_modules/@nuxt/nitro-server/dist/runtime/utils/cache-driver.js';
import 'file://C:/laragon/www/ecom-wms/storefront-pwa/node_modules/unstorage/drivers/fs-lite.mjs';
import 'file://C:/laragon/www/ecom-wms/storefront-pwa/node_modules/ohash/dist/index.mjs';
import 'file://C:/laragon/www/ecom-wms/storefront-pwa/node_modules/unctx/dist/index.mjs';
import 'file://C:/laragon/www/ecom-wms/storefront-pwa/node_modules/vue-router/vue-router.node.mjs';
import 'file://C:/laragon/www/ecom-wms/storefront-pwa/node_modules/nuxt/node_modules/cookie-es/dist/index.mjs';
import 'file://C:/laragon/www/ecom-wms/storefront-pwa/node_modules/vue-devtools-stub/dist/index.mjs';

const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "ProductCatalogSidebar",
  __ssrInlineRender: true,
  props: {
    selected: {}
  },
  emits: ["update"],
  async setup(__props, { emit: __emit }) {
    let __temp, __restore;
    const priceMin = ref(0);
    const priceMax = ref(5e7);
    const selectedBrands = ref([]);
    const { data: filters } = ([__temp, __restore] = withAsyncContext(() => useAsyncData("sidebar-filters", () => useProductApi().getFilters())), __temp = await __temp, __restore(), __temp);
    const hasActive = computed(() => selectedBrands.value.length > 0);
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-5" }, _attrs))}>`);
      if (unref(hasActive)) {
        _push(`<button class="text-sm text-indigo-600 hover:underline">X\xF3a b\u1ED9 l\u1ECDc</button>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="border-b pb-4"><h3 class="font-semibold mb-3">Gi\xE1</h3><div class="flex gap-2"><input${ssrRenderAttr("value", unref(priceMin))} type="number" placeholder="T\u1EEB" class="w-1/2 border rounded px-2 py-1 text-sm"><input${ssrRenderAttr("value", unref(priceMax))} type="number" placeholder="\u0110\u1EBFn" class="w-1/2 border rounded px-2 py-1 text-sm"></div><button class="mt-2 w-full bg-indigo-600 text-white text-sm py-1.5 rounded hover:bg-indigo-700">\xC1p d\u1EE5ng</button></div>`);
      if ((_b = (_a = unref(filters)) == null ? void 0 : _a.brands) == null ? void 0 : _b.length) {
        _push(`<div class="border-b pb-4"><h3 class="font-semibold mb-3">Th\u01B0\u01A1ng hi\u1EC7u</h3><div class="space-y-1.5 max-h-40 overflow-y-auto"><!--[-->`);
        ssrRenderList(unref(filters).brands, (b) => {
          _push(`<label class="flex items-center gap-2 cursor-pointer text-sm"><input type="checkbox"${ssrRenderAttr("value", b.id)}${ssrIncludeBooleanAttr(Array.isArray(unref(selectedBrands)) ? ssrLooseContain(unref(selectedBrands), b.id) : unref(selectedBrands)) ? " checked" : ""} class="accent-indigo-600"> ${ssrInterpolate(b.name)}</label>`);
        });
        _push(`<!--]--></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/product/ProductCatalogSidebar.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "Pagination",
  __ssrInlineRender: true,
  props: {
    current: {},
    total: {}
  },
  emits: ["change"],
  setup(__props, { emit: __emit }) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex items-center justify-center gap-1 mt-8" }, _attrs))}><!--[-->`);
      ssrRenderList(__props.total, (p) => {
        _push(`<button class="${ssrRenderClass([p === __props.current ? "bg-indigo-600 text-white" : "bg-gray-100 hover:bg-gray-200", "w-8 h-8 rounded text-sm transition"])}">${ssrInterpolate(p)}</button>`);
      });
      _push(`<!--]--></div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/Pagination.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "[slug]",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const route = useRoute();
    const sort = ref(route.query.sort || "newest");
    const page = ref(Number(route.query.page) || 1);
    const selectedFilters = ref({});
    const { data: products, pending, refresh } = ([__temp, __restore] = withAsyncContext(() => useAsyncData(
      `category-${route.params.slug}`,
      () => useProductApi().getByCategory(route.params.slug, {
        sort: sort.value,
        page: page.value,
        ...selectedFilters.value
      })
    )), __temp = await __temp, __restore(), __temp);
    const totalPages = computed(() => {
      var _a, _b;
      return Math.ceil(((_b = (_a = products.value) == null ? void 0 : _a.total) != null ? _b : 0) / 12);
    });
    const updateFilter = (key, value) => {
      if (key === "reset") {
        selectedFilters.value = {};
      } else {
        selectedFilters.value[key] = value;
      }
      page.value = 1;
      refresh();
    };
    watch([sort, page], refresh);
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b, _c;
      const _component_ProductCatalogSidebar = _sfc_main$2;
      const _component_UiSkeletonCard = __nuxt_component_1;
      const _component_ProductCard = _sfc_main$3;
      const _component_UiPagination = _sfc_main$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "max-w-7xl mx-auto px-4 py-8" }, _attrs))}><div class="grid grid-cols-1 md:grid-cols-4 gap-8"><aside class="md:col-span-1">`);
      _push(ssrRenderComponent(_component_ProductCatalogSidebar, {
        selected: unref(selectedFilters),
        onUpdate: updateFilter
      }, null, _parent));
      _push(`</aside><main class="md:col-span-3"><div class="flex justify-between items-center mb-6"><p class="text-gray-500 text-sm">${ssrInterpolate((_b = (_a = unref(products)) == null ? void 0 : _a.total) != null ? _b : 0)} s\u1EA3n ph\u1EA9m</p><select class="border rounded px-3 py-1.5 text-sm"><option value="newest"${ssrIncludeBooleanAttr(Array.isArray(unref(sort)) ? ssrLooseContain(unref(sort), "newest") : ssrLooseEqual(unref(sort), "newest")) ? " selected" : ""}>M\u1EDBi nh\u1EA5t</option><option value="price-asc"${ssrIncludeBooleanAttr(Array.isArray(unref(sort)) ? ssrLooseContain(unref(sort), "price-asc") : ssrLooseEqual(unref(sort), "price-asc")) ? " selected" : ""}>Gi\xE1 t\u0103ng d\u1EA7n</option><option value="price-desc"${ssrIncludeBooleanAttr(Array.isArray(unref(sort)) ? ssrLooseContain(unref(sort), "price-desc") : ssrLooseEqual(unref(sort), "price-desc")) ? " selected" : ""}>Gi\xE1 gi\u1EA3m d\u1EA7n</option></select></div>`);
      if (unref(pending)) {
        _push(`<div class="grid grid-cols-2 md:grid-cols-3 gap-6"><!--[-->`);
        ssrRenderList(9, (i) => {
          _push(ssrRenderComponent(_component_UiSkeletonCard, { key: i }, null, _parent));
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<div class="grid grid-cols-2 md:grid-cols-3 gap-6"><!--[-->`);
        ssrRenderList((_c = unref(products)) == null ? void 0 : _c.data, (p) => {
          _push(ssrRenderComponent(_component_ProductCard, {
            key: p.id,
            product: p
          }, null, _parent));
        });
        _push(`<!--]--></div>`);
      }
      if (unref(totalPages) > 1) {
        _push(ssrRenderComponent(_component_UiPagination, {
          current: unref(page),
          total: unref(totalPages),
          onChange: (p) => page.value = p
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</main></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/category/[slug].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=_slug_-D_0QbnrJ.mjs.map
