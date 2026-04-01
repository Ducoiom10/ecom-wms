import { defineComponent, mergeProps, unref, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderList, ssrInterpolate, ssrIncludeBooleanAttr } from "vue/server-renderer";
import "C:/laragon/www/ecom-wms/storefront-pwa/node_modules/hookable/dist/index.mjs";
import { u as useCheckoutStore } from "./checkout-CuEQ3r30.js";
import { u as useCartStore } from "./cart-TRz18UDQ.js";
import "../server.mjs";
import "C:/laragon/www/ecom-wms/storefront-pwa/node_modules/klona/dist/index.mjs";
import "#internal/nuxt/paths";
import "C:/laragon/www/ecom-wms/storefront-pwa/node_modules/defu/dist/defu.mjs";
import "pinia";
import "./ui-CDZkXfd4.js";
import "C:/laragon/www/ecom-wms/storefront-pwa/node_modules/ofetch/dist/node.mjs";
import "C:/laragon/www/ecom-wms/storefront-pwa/node_modules/unctx/dist/index.mjs";
import "C:/laragon/www/ecom-wms/storefront-pwa/node_modules/h3/dist/index.mjs";
import "vue-router";
import "C:/laragon/www/ecom-wms/storefront-pwa/node_modules/nuxt/node_modules/cookie-es/dist/index.mjs";
import "C:/laragon/www/ecom-wms/storefront-pwa/node_modules/destr/dist/index.mjs";
import "C:/laragon/www/ecom-wms/storefront-pwa/node_modules/ohash/dist/index.mjs";
import "@vue/devtools-api";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "review",
  __ssrInlineRender: true,
  setup(__props) {
    const cs = useCheckoutStore();
    const cartStore = useCartStore();
    const fmt = (n) => new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(n);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "max-w-2xl mx-auto py-10 px-4 space-y-6" }, _attrs))}><h1 class="text-2xl font-bold">Xem lại đơn hàng</h1><div class="bg-white rounded-xl border p-5 space-y-3"><h2 class="font-semibold text-sm text-gray-500 uppercase tracking-wide">Sản phẩm</h2><!--[-->`);
      ssrRenderList(unref(cartStore).cart?.items, (item) => {
        _push(`<div class="flex justify-between text-sm"><span>Product #${ssrInterpolate(item.product_id)} × ${ssrInterpolate(item.quantity)}</span><span class="font-medium">${ssrInterpolate(fmt(item.price * item.quantity))}</span></div>`);
      });
      _push(`<!--]--></div><div class="bg-white rounded-xl border p-5 space-y-2 text-sm"><h2 class="font-semibold text-sm text-gray-500 uppercase tracking-wide mb-2">Giao hàng</h2><p><strong>${ssrInterpolate(unref(cs).customer.fullName)}</strong> — ${ssrInterpolate(unref(cs).customer.phone)}</p><p>${ssrInterpolate(unref(cs).address.street)}, ${ssrInterpolate(unref(cs).address.ward)}, ${ssrInterpolate(unref(cs).address.district)}, ${ssrInterpolate(unref(cs).address.province)}</p><p class="text-gray-500">${ssrInterpolate(unref(cs).shipping === "express" ? "Nhanh (1-2 ngày)" : "Tiêu chuẩn (3-5 ngày)")}</p></div><div class="bg-white rounded-xl border p-5 space-y-2 text-sm"><div class="flex justify-between text-gray-600"><span>Tạm tính</span><span>${ssrInterpolate(fmt(unref(cartStore).cart?.subtotal ?? 0))}</span></div><div class="flex justify-between text-gray-600"><span>Vận chuyển</span><span>${ssrInterpolate(fmt(unref(cs).shippingFee))}</span></div><div class="flex justify-between font-bold text-base pt-2 border-t"><span>Tổng cộng</span><span class="text-red-600">${ssrInterpolate(fmt((unref(cartStore).cart?.subtotal ?? 0) + unref(cs).shippingFee))}</span></div></div><div class="flex gap-3"><button class="px-6 py-2.5 border rounded-lg text-sm">← Quay lại</button><button${ssrIncludeBooleanAttr(unref(cs).isSubmitting) ? " disabled" : ""} class="flex-1 bg-green-600 text-white py-2.5 rounded-lg font-semibold hover:bg-green-700 disabled:opacity-50">${ssrInterpolate(unref(cs).isSubmitting ? "Đang đặt hàng..." : "✓ Đặt hàng")}</button></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/checkout/review.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=review-4-8QMZl5.js.map
