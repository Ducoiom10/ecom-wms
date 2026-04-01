import { hasInjectionContext, inject, defineComponent, ref, mergeProps, unref, useSSRContext, computed, withAsyncContext } from "vue";
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderList, ssrRenderClass, ssrInterpolate, ssrRenderStyle, ssrRenderComponent, ssrIncludeBooleanAttr } from "vue/server-renderer";
import { _ as _sfc_main$4 } from "./ProductCard-KEPk7OKU.js";
import { t as tryUseNuxtApp, u as useRoute } from "../server.mjs";
import { u as useCartStore } from "./cart-TRz18UDQ.js";
import { u as useAsyncData } from "./asyncData-DBk6s2t8.js";
import { useSeoMeta as useSeoMeta$1, headSymbol } from "C:/laragon/www/ecom-wms/storefront-pwa/node_modules/@unhead/vue/dist/index.mjs";
import "./nuxt-link-B2doaXW1.js";
import "C:/laragon/www/ecom-wms/storefront-pwa/node_modules/defu/dist/defu.mjs";
import "C:/laragon/www/ecom-wms/storefront-pwa/node_modules/hookable/dist/index.mjs";
import "C:/laragon/www/ecom-wms/storefront-pwa/node_modules/klona/dist/index.mjs";
import "#internal/nuxt/paths";
import "pinia";
import "C:/laragon/www/ecom-wms/storefront-pwa/node_modules/ofetch/dist/node.mjs";
import "C:/laragon/www/ecom-wms/storefront-pwa/node_modules/unctx/dist/index.mjs";
import "C:/laragon/www/ecom-wms/storefront-pwa/node_modules/h3/dist/index.mjs";
import "vue-router";
import "C:/laragon/www/ecom-wms/storefront-pwa/node_modules/nuxt/node_modules/cookie-es/dist/index.mjs";
import "C:/laragon/www/ecom-wms/storefront-pwa/node_modules/destr/dist/index.mjs";
import "C:/laragon/www/ecom-wms/storefront-pwa/node_modules/ohash/dist/index.mjs";
import "@vue/devtools-api";
import "./ui-CDZkXfd4.js";
import "C:/laragon/www/ecom-wms/storefront-pwa/node_modules/perfect-debounce/dist/index.mjs";
function injectHead(nuxtApp) {
  const nuxt = nuxtApp || tryUseNuxtApp();
  return nuxt?.ssrContext?.head || nuxt?.runWithContext(() => {
    if (hasInjectionContext()) {
      return inject(headSymbol);
    }
  });
}
function useSeoMeta(input, options = {}) {
  const head = injectHead(options.nuxt);
  if (head) {
    return useSeoMeta$1(input, { head, ...options });
  }
}
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "ProductGallery",
  __ssrInlineRender: true,
  props: {
    images: {}
  },
  setup(__props) {
    const props = __props;
    const main = ref(props.images[0]?.image_url ?? "/placeholder.png");
    const zoom = ref(false);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-3" }, _attrs))}><div class="aspect-square bg-gray-100 rounded-xl overflow-hidden"><img${ssrRenderAttr("src", unref(main))} alt="Product" class="w-full h-full object-cover cursor-zoom-in"></div><div class="grid grid-cols-4 gap-2"><!--[-->`);
      ssrRenderList(__props.images, (img, i) => {
        _push(`<img${ssrRenderAttr("src", img.image_url)} class="${ssrRenderClass([unref(main) === img.image_url ? "border-indigo-500" : "border-transparent", "aspect-square object-cover rounded cursor-pointer border-2 transition"])}">`);
      });
      _push(`<!--]--></div>`);
      if (unref(zoom)) {
        _push(`<div class="fixed inset-0 bg-black/80 z-50 flex items-center justify-center"><img${ssrRenderAttr("src", unref(main))} class="max-h-screen max-w-screen-md object-contain"></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/product/ProductGallery.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "ProductVariantSelector",
  __ssrInlineRender: true,
  props: {
    product: {}
  },
  emits: ["select"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const selected = ref({});
    const attrs = computed(() => {
      const map = {};
      props.product.productVariants?.forEach(
        (v) => Object.entries(v.attributes ?? {}).forEach(([k, val]) => {
          if (!map[k]) map[k] = /* @__PURE__ */ new Set();
          map[k].add(val);
        })
      );
      return Object.entries(map).map(([name, values]) => ({ name, values: [...values] }));
    });
    const matched = computed(
      () => props.product.productVariants?.find(
        (v) => Object.entries(selected.value).every(([k, val]) => v.attributes?.[k] === val)
      ) ?? null
    );
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-4" }, _attrs))}><!--[-->`);
      ssrRenderList(unref(attrs), (attr) => {
        _push(`<div><p class="text-sm font-semibold mb-2 capitalize">${ssrInterpolate(attr.name)}</p><div class="flex flex-wrap gap-2"><!--[-->`);
        ssrRenderList(attr.values, (val) => {
          _push(`<button class="${ssrRenderClass([unref(selected)[attr.name] === val ? "border-indigo-600 bg-indigo-50 text-indigo-700" : "border-gray-300 hover:border-gray-400", "px-3 py-1.5 text-sm border rounded-lg transition"])}">${ssrInterpolate(val)}</button>`);
        });
        _push(`<!--]--></div></div>`);
      });
      _push(`<!--]-->`);
      if (unref(matched)) {
        _push(`<div class="bg-indigo-50 rounded-lg p-3 text-sm"> Biến thể: <strong>${ssrInterpolate(unref(matched).variant_name)}</strong>`);
        if (unref(matched).price_override) {
          _push(`<span class="ml-2 text-red-600 font-bold">${ssrInterpolate(new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(unref(matched).price_override))}</span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/product/ProductVariantSelector.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "ProductStockIndicator",
  __ssrInlineRender: true,
  props: {
    stock: {}
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      if (__props.stock > 0) {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex items-center gap-2" }, _attrs))}><span class="${ssrRenderClass([__props.stock > 10 ? "text-green-600" : "text-orange-500", "text-sm"])}">${ssrInterpolate(__props.stock > 10 ? "Còn hàng" : `Còn ${__props.stock} sản phẩm`)}</span><div class="w-24 h-1.5 bg-gray-200 rounded-full overflow-hidden"><div class="${ssrRenderClass([__props.stock > 10 ? "bg-green-500" : "bg-orange-400", "h-full rounded-full transition-all"])}" style="${ssrRenderStyle({ width: `${Math.min(100, __props.stock / 20 * 100)}%` })}"></div></div></div>`);
      } else {
        _push(`<p${ssrRenderAttrs(mergeProps({ class: "text-red-600 font-semibold text-sm" }, _attrs))}>Hết hàng</p>`);
      }
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/product/ProductStockIndicator.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "[id]",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const route = useRoute();
    const cartStore = useCartStore();
    const qty = ref(1);
    const selectedVariant = ref(null);
    const { data: product } = ([__temp, __restore] = withAsyncContext(() => useAsyncData(
      `product-${route.params.id}`,
      () => useProductApi().getById(route.params.id)
    )), __temp = await __temp, __restore(), __temp);
    const { data: related } = ([__temp, __restore] = withAsyncContext(() => useAsyncData(
      `related-${route.params.id}`,
      () => useProductApi().getRelated(route.params.id)
    )), __temp = await __temp, __restore(), __temp);
    const formatPrice = (p) => new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(p);
    useSeoMeta({
      title: () => product.value?.name ?? "",
      description: () => product.value?.description ?? ""
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ProductGallery = _sfc_main$3;
      const _component_ProductVariantSelector = _sfc_main$2;
      const _component_ProductStockIndicator = _sfc_main$1;
      const _component_ProductCard = _sfc_main$4;
      if (unref(product)) {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "max-w-7xl mx-auto px-4 py-8" }, _attrs))}><div class="grid grid-cols-1 md:grid-cols-2 gap-12">`);
        _push(ssrRenderComponent(_component_ProductGallery, {
          images: unref(product).productImages ?? []
        }, null, _parent));
        _push(`<div class="space-y-5"><div><h1 class="text-2xl font-bold">${ssrInterpolate(unref(product).name)}</h1><p class="text-gray-400 text-sm mt-1">SKU: ${ssrInterpolate(unref(product).sku)}</p></div><p class="text-3xl font-bold text-red-600">${ssrInterpolate(formatPrice(unref(product).price))}</p>`);
        if (unref(product).productVariants?.length) {
          _push(ssrRenderComponent(_component_ProductVariantSelector, {
            product: unref(product),
            onSelect: (v) => selectedVariant.value = v
          }, null, _parent));
        } else {
          _push(`<!---->`);
        }
        _push(ssrRenderComponent(_component_ProductStockIndicator, {
          stock: unref(selectedVariant)?.stock ?? unref(product).available_stock ?? 0
        }, null, _parent));
        _push(`<div class="flex items-center gap-3"><span class="text-sm font-medium">Số lượng:</span><div class="flex items-center border rounded-lg"><button class="px-3 py-2">−</button><input${ssrRenderAttr("value", unref(qty))} type="number" min="1" class="w-12 text-center border-0 py-2 focus:outline-none"><button class="px-3 py-2">+</button></div></div><div class="flex gap-3"><button${ssrIncludeBooleanAttr(unref(cartStore).loading || !unref(product).available_stock) ? " disabled" : ""} class="flex-1 bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 disabled:opacity-50">${ssrInterpolate(!unref(product).available_stock ? "Hết hàng" : "Thêm vào giỏ")}</button></div>`);
        if (unref(product).productImages) {
          _push(`<div class="border-t pt-5"><h3 class="font-semibold mb-2">Mô tả</h3><p class="text-gray-600 text-sm">${ssrInterpolate(unref(product).description)}</p></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div><div class="mt-16"><h2 class="text-xl font-bold mb-6">Sản phẩm liên quan</h2><div class="grid grid-cols-2 md:grid-cols-4 gap-6"><!--[-->`);
        ssrRenderList(unref(related)?.data, (r) => {
          _push(ssrRenderComponent(_component_ProductCard, {
            key: r.id,
            product: r
          }, null, _parent));
        });
        _push(`<!--]--></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/products/[id].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=_id_-mVsj_fQH.js.map
