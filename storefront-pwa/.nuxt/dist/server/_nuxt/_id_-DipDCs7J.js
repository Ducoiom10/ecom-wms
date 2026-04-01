import { defineComponent, ref, mergeProps, unref, useSSRContext, computed, withAsyncContext, watch } from "vue";
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderList, ssrRenderClass, ssrInterpolate, ssrRenderStyle, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderComponent } from "vue/server-renderer";
import { _ as _sfc_main$8 } from "./ProductCard-KEPk7OKU.js";
import { _ as _sfc_main$6 } from "./EmptyState-DTWoF1UD.js";
import { _ as _sfc_main$7 } from "./Pagination-CVyWMGGe.js";
import { u as useAsyncData } from "./asyncData-DBk6s2t8.js";
import { u as useApi } from "./useApi-BXP922BC.js";
import "C:/laragon/www/ecom-wms/storefront-pwa/node_modules/hookable/dist/index.mjs";
import "./auth-rbnhynP_.js";
import "./ui-CDZkXfd4.js";
import { u as useRoute } from "../server.mjs";
import { u as useCartStore } from "./cart-TRz18UDQ.js";
import { u as useSeoMeta, a as useHead } from "./v3-DQje9XB8.js";
import "./nuxt-link-B2doaXW1.js";
import "C:/laragon/www/ecom-wms/storefront-pwa/node_modules/defu/dist/defu.mjs";
import "C:/laragon/www/ecom-wms/storefront-pwa/node_modules/klona/dist/index.mjs";
import "#internal/nuxt/paths";
import "pinia";
import "C:/laragon/www/ecom-wms/storefront-pwa/node_modules/perfect-debounce/dist/index.mjs";
import "C:/laragon/www/ecom-wms/storefront-pwa/node_modules/ofetch/dist/node.mjs";
import "C:/laragon/www/ecom-wms/storefront-pwa/node_modules/unctx/dist/index.mjs";
import "C:/laragon/www/ecom-wms/storefront-pwa/node_modules/h3/dist/index.mjs";
import "vue-router";
import "C:/laragon/www/ecom-wms/storefront-pwa/node_modules/nuxt/node_modules/cookie-es/dist/index.mjs";
import "C:/laragon/www/ecom-wms/storefront-pwa/node_modules/destr/dist/index.mjs";
import "C:/laragon/www/ecom-wms/storefront-pwa/node_modules/ohash/dist/index.mjs";
import "@vue/devtools-api";
import "C:/laragon/www/ecom-wms/storefront-pwa/node_modules/@unhead/vue/dist/index.mjs";
const _sfc_main$5 = /* @__PURE__ */ defineComponent({
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
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/product/ProductGallery.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const _sfc_main$4 = /* @__PURE__ */ defineComponent({
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
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/product/ProductVariantSelector.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
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
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/product/ProductStockIndicator.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "ReviewList",
  __ssrInlineRender: true,
  props: {
    productId: {}
  },
  async setup(__props) {
    let __temp, __restore;
    const props = __props;
    const sort = ref("newest");
    const page = ref(1);
    const { data: result, pending, refresh } = ([__temp, __restore] = withAsyncContext(() => useAsyncData(
      `reviews-${props.productId}`,
      () => useApi()(`crm/v1/reviews?product_id=${props.productId}&page=${page.value}&sort=${sort.value}`)
    )), __temp = await __temp, __restore(), __temp);
    const reviews = computed(() => result.value?.data ?? []);
    const totalPages = computed(() => Math.ceil((result.value?.total ?? 0) / 5));
    watch([sort, page], refresh);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UiEmptyState = _sfc_main$6;
      const _component_UiPagination = _sfc_main$7;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-5" }, _attrs))}><div class="flex items-center justify-between"><h3 class="font-semibold">Đánh giá từ khách hàng</h3><select class="border rounded px-2 py-1 text-sm"><option value="newest"${ssrIncludeBooleanAttr(Array.isArray(unref(sort)) ? ssrLooseContain(unref(sort), "newest") : ssrLooseEqual(unref(sort), "newest")) ? " selected" : ""}>Mới nhất</option><option value="highest"${ssrIncludeBooleanAttr(Array.isArray(unref(sort)) ? ssrLooseContain(unref(sort), "highest") : ssrLooseEqual(unref(sort), "highest")) ? " selected" : ""}>Cao nhất</option><option value="lowest"${ssrIncludeBooleanAttr(Array.isArray(unref(sort)) ? ssrLooseContain(unref(sort), "lowest") : ssrLooseEqual(unref(sort), "lowest")) ? " selected" : ""}>Thấp nhất</option></select></div>`);
      if (unref(pending)) {
        _push(`<div class="space-y-3"><!--[-->`);
        ssrRenderList(3, (i) => {
          _push(`<div class="h-24 bg-gray-100 rounded-lg animate-pulse"></div>`);
        });
        _push(`<!--]--></div>`);
      } else if (!unref(reviews)?.length) {
        _push(ssrRenderComponent(_component_UiEmptyState, {
          icon: "💬",
          title: "Chưa có đánh giá",
          message: "Hãy là người đầu tiên đánh giá sản phẩm này"
        }, null, _parent));
      } else {
        _push(`<div class="space-y-4"><!--[-->`);
        ssrRenderList(unref(reviews), (r) => {
          _push(`<div class="border rounded-xl p-4"><div class="flex justify-between items-start mb-2"><div><p class="font-semibold text-sm">${ssrInterpolate(r.user?.name ?? "Khách hàng")}</p><p class="text-xs text-gray-400">${ssrInterpolate(new Date(r.created_at).toLocaleDateString("vi-VN"))}</p></div><span class="text-sm">${ssrInterpolate("⭐".repeat(r.rating))}</span></div><p class="text-sm text-gray-700">${ssrInterpolate(r.content)}</p></div>`);
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
      _push(`</div>`);
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/product/ReviewList.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "ReviewForm",
  __ssrInlineRender: true,
  props: {
    productId: {}
  },
  emits: ["submitted"],
  setup(__props, { emit: __emit }) {
    const rating = ref(0);
    const text = ref("");
    const loading = ref(false);
    const error = ref("");
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<form${ssrRenderAttrs(mergeProps({ class: "bg-gray-50 rounded-xl p-5 space-y-4" }, _attrs))}><h3 class="font-semibold">Viết đánh giá</h3><div><p class="text-sm font-medium mb-2">Đánh giá</p><div class="flex gap-1"><!--[-->`);
      ssrRenderList(5, (s) => {
        _push(`<button type="button" class="text-2xl transition">${ssrInterpolate(s <= unref(rating) ? "⭐" : "☆")}</button>`);
      });
      _push(`<!--]--></div></div><textarea rows="4" maxlength="500" placeholder="Chia sẻ trải nghiệm của bạn..." class="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-400 focus:outline-none resize-none">${ssrInterpolate(unref(text))}</textarea><p class="text-xs text-gray-400 -mt-2">${ssrInterpolate(unref(text).length)}/500</p>`);
      if (unref(error)) {
        _push(`<p class="text-red-600 text-sm">${ssrInterpolate(unref(error))}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<button type="submit"${ssrIncludeBooleanAttr(!unref(rating) || !unref(text) || unref(loading)) ? " disabled" : ""} class="w-full bg-indigo-600 text-white py-2.5 rounded-lg font-semibold hover:bg-indigo-700 disabled:opacity-50">${ssrInterpolate(unref(loading) ? "Đang gửi..." : "Gửi đánh giá")}</button></form>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/product/ReviewForm.vue");
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
    const reviewKey = ref(0);
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
      description: () => product.value?.description ?? "",
      ogTitle: () => product.value?.name ?? "",
      ogDescription: () => product.value?.description ?? "",
      ogImage: () => product.value?.productImages?.[0]?.image_url ?? ""
    });
    useHead({
      script: [{
        type: "application/ld+json",
        children: computed(() => JSON.stringify({
          "@context": "https://schema.org/",
          "@type": "Product",
          name: product.value?.name,
          description: product.value?.description,
          sku: product.value?.sku,
          image: product.value?.productImages?.map((i) => i.image_url),
          offers: {
            "@type": "Offer",
            price: product.value?.price,
            priceCurrency: "VND",
            availability: (product.value?.available_stock ?? 0) > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock"
          }
        }))
      }]
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ProductGallery = _sfc_main$5;
      const _component_ProductVariantSelector = _sfc_main$4;
      const _component_ProductStockIndicator = _sfc_main$3;
      const _component_ProductCard = _sfc_main$8;
      const _component_ProductReviewList = _sfc_main$2;
      const _component_ProductReviewForm = _sfc_main$1;
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
        _push(`<!--]--></div></div><div class="mt-16 border-t pt-10 space-y-8">`);
        _push(ssrRenderComponent(_component_ProductReviewList, {
          "product-id": Number(unref(route).params.id),
          key: unref(reviewKey)
        }, null, _parent));
        _push(ssrRenderComponent(_component_ProductReviewForm, {
          "product-id": Number(unref(route).params.id),
          onSubmitted: ($event) => reviewKey.value++
        }, null, _parent));
        _push(`</div></div>`);
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
//# sourceMappingURL=_id_-DipDCs7J.js.map
