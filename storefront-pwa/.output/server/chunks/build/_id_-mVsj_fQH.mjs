import { defineComponent, ref, withAsyncContext, unref, mergeProps, computed, hasInjectionContext, inject, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrIncludeBooleanAttr, ssrRenderList, ssrRenderClass, ssrRenderStyle } from 'vue/server-renderer';
import { _ as _sfc_main$4 } from './ProductCard-KEPk7OKU.mjs';
import { u as useRoute, t as tryUseNuxtApp } from './server.mjs';
import { u as useCartStore } from './cart-TRz18UDQ.mjs';
import { u as useAsyncData } from './asyncData-DBk6s2t8.mjs';
import { u as useSeoMeta$1, h as headSymbol } from '../routes/renderer.mjs';
import './nuxt-link-B2doaXW1.mjs';
import 'pinia';
import '../_/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:url';
import 'ipx';
import 'node:path';
import 'node:crypto';
import 'vue-router';
import './ui-CDZkXfd4.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/plugins';
import 'unhead/utils';

function injectHead(nuxtApp) {
  var _a;
  const nuxt = nuxtApp || tryUseNuxtApp();
  return ((_a = nuxt == null ? void 0 : nuxt.ssrContext) == null ? void 0 : _a.head) || (nuxt == null ? void 0 : nuxt.runWithContext(() => {
    if (hasInjectionContext()) {
      return inject(headSymbol);
    }
  }));
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
    var _a, _b;
    const props = __props;
    const main = ref((_b = (_a = props.images[0]) == null ? void 0 : _a.image_url) != null ? _b : "/placeholder.png");
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
      var _a;
      const map = {};
      (_a = props.product.productVariants) == null ? void 0 : _a.forEach(
        (v) => {
          var _a2;
          return Object.entries((_a2 = v.attributes) != null ? _a2 : {}).forEach(([k, val]) => {
            if (!map[k]) map[k] = /* @__PURE__ */ new Set();
            map[k].add(val);
          });
        }
      );
      return Object.entries(map).map(([name, values]) => ({ name, values: [...values] }));
    });
    const matched = computed(
      () => {
        var _a, _b;
        return (_b = (_a = props.product.productVariants) == null ? void 0 : _a.find(
          (v) => Object.entries(selected.value).every(([k, val]) => {
            var _a2;
            return ((_a2 = v.attributes) == null ? void 0 : _a2[k]) === val;
          })
        )) != null ? _b : null;
      }
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
        _push(`<div class="bg-indigo-50 rounded-lg p-3 text-sm"> Bi\u1EBFn th\u1EC3: <strong>${ssrInterpolate(unref(matched).variant_name)}</strong>`);
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
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex items-center gap-2" }, _attrs))}><span class="${ssrRenderClass([__props.stock > 10 ? "text-green-600" : "text-orange-500", "text-sm"])}">${ssrInterpolate(__props.stock > 10 ? "C\xF2n h\xE0ng" : `C\xF2n ${__props.stock} s\u1EA3n ph\u1EA9m`)}</span><div class="w-24 h-1.5 bg-gray-200 rounded-full overflow-hidden"><div class="${ssrRenderClass([__props.stock > 10 ? "bg-green-500" : "bg-orange-400", "h-full rounded-full transition-all"])}" style="${ssrRenderStyle({ width: `${Math.min(100, __props.stock / 20 * 100)}%` })}"></div></div></div>`);
      } else {
        _push(`<p${ssrRenderAttrs(mergeProps({ class: "text-red-600 font-semibold text-sm" }, _attrs))}>H\u1EBFt h\xE0ng</p>`);
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
      title: () => {
        var _a, _b;
        return (_b = (_a = product.value) == null ? void 0 : _a.name) != null ? _b : "";
      },
      description: () => {
        var _a, _b;
        return (_b = (_a = product.value) == null ? void 0 : _a.description) != null ? _b : "";
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b, _c, _d, _e, _f;
      const _component_ProductGallery = _sfc_main$3;
      const _component_ProductVariantSelector = _sfc_main$2;
      const _component_ProductStockIndicator = _sfc_main$1;
      const _component_ProductCard = _sfc_main$4;
      if (unref(product)) {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "max-w-7xl mx-auto px-4 py-8" }, _attrs))}><div class="grid grid-cols-1 md:grid-cols-2 gap-12">`);
        _push(ssrRenderComponent(_component_ProductGallery, {
          images: (_a = unref(product).productImages) != null ? _a : []
        }, null, _parent));
        _push(`<div class="space-y-5"><div><h1 class="text-2xl font-bold">${ssrInterpolate(unref(product).name)}</h1><p class="text-gray-400 text-sm mt-1">SKU: ${ssrInterpolate(unref(product).sku)}</p></div><p class="text-3xl font-bold text-red-600">${ssrInterpolate(formatPrice(unref(product).price))}</p>`);
        if ((_b = unref(product).productVariants) == null ? void 0 : _b.length) {
          _push(ssrRenderComponent(_component_ProductVariantSelector, {
            product: unref(product),
            onSelect: (v) => selectedVariant.value = v
          }, null, _parent));
        } else {
          _push(`<!---->`);
        }
        _push(ssrRenderComponent(_component_ProductStockIndicator, {
          stock: (_e = (_d = (_c = unref(selectedVariant)) == null ? void 0 : _c.stock) != null ? _d : unref(product).available_stock) != null ? _e : 0
        }, null, _parent));
        _push(`<div class="flex items-center gap-3"><span class="text-sm font-medium">S\u1ED1 l\u01B0\u1EE3ng:</span><div class="flex items-center border rounded-lg"><button class="px-3 py-2">\u2212</button><input${ssrRenderAttr("value", unref(qty))} type="number" min="1" class="w-12 text-center border-0 py-2 focus:outline-none"><button class="px-3 py-2">+</button></div></div><div class="flex gap-3"><button${ssrIncludeBooleanAttr(unref(cartStore).loading || !unref(product).available_stock) ? " disabled" : ""} class="flex-1 bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 disabled:opacity-50">${ssrInterpolate(!unref(product).available_stock ? "H\u1EBFt h\xE0ng" : "Th\xEAm v\xE0o gi\u1ECF")}</button></div>`);
        if (unref(product).productImages) {
          _push(`<div class="border-t pt-5"><h3 class="font-semibold mb-2">M\xF4 t\u1EA3</h3><p class="text-gray-600 text-sm">${ssrInterpolate(unref(product).description)}</p></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div><div class="mt-16"><h2 class="text-xl font-bold mb-6">S\u1EA3n ph\u1EA9m li\xEAn quan</h2><div class="grid grid-cols-2 md:grid-cols-4 gap-6"><!--[-->`);
        ssrRenderList((_f = unref(related)) == null ? void 0 : _f.data, (r) => {
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

export { _sfc_main as default };
//# sourceMappingURL=_id_-mVsj_fQH.mjs.map
