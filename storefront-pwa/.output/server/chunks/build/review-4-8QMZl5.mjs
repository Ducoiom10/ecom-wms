import { defineComponent, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderList, ssrInterpolate, ssrIncludeBooleanAttr } from 'vue/server-renderer';
import { u as useCheckoutStore } from './checkout-CuEQ3r30.mjs';
import { u as useCartStore } from './cart-TRz18UDQ.mjs';
import 'pinia';
import './ui-CDZkXfd4.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "review",
  __ssrInlineRender: true,
  setup(__props) {
    const cs = useCheckoutStore();
    const cartStore = useCartStore();
    const fmt = (n) => new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(n);
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b, _c, _d, _e;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "max-w-2xl mx-auto py-10 px-4 space-y-6" }, _attrs))}><h1 class="text-2xl font-bold">Xem l\u1EA1i \u0111\u01A1n h\xE0ng</h1><div class="bg-white rounded-xl border p-5 space-y-3"><h2 class="font-semibold text-sm text-gray-500 uppercase tracking-wide">S\u1EA3n ph\u1EA9m</h2><!--[-->`);
      ssrRenderList((_a = unref(cartStore).cart) == null ? void 0 : _a.items, (item) => {
        _push(`<div class="flex justify-between text-sm"><span>Product #${ssrInterpolate(item.product_id)} \xD7 ${ssrInterpolate(item.quantity)}</span><span class="font-medium">${ssrInterpolate(fmt(item.price * item.quantity))}</span></div>`);
      });
      _push(`<!--]--></div><div class="bg-white rounded-xl border p-5 space-y-2 text-sm"><h2 class="font-semibold text-sm text-gray-500 uppercase tracking-wide mb-2">Giao h\xE0ng</h2><p><strong>${ssrInterpolate(unref(cs).customer.fullName)}</strong> \u2014 ${ssrInterpolate(unref(cs).customer.phone)}</p><p>${ssrInterpolate(unref(cs).address.street)}, ${ssrInterpolate(unref(cs).address.ward)}, ${ssrInterpolate(unref(cs).address.district)}, ${ssrInterpolate(unref(cs).address.province)}</p><p class="text-gray-500">${ssrInterpolate(unref(cs).shipping === "express" ? "Nhanh (1-2 ng\xE0y)" : "Ti\xEAu chu\u1EA9n (3-5 ng\xE0y)")}</p></div><div class="bg-white rounded-xl border p-5 space-y-2 text-sm"><div class="flex justify-between text-gray-600"><span>T\u1EA1m t\xEDnh</span><span>${ssrInterpolate(fmt((_c = (_b = unref(cartStore).cart) == null ? void 0 : _b.subtotal) != null ? _c : 0))}</span></div><div class="flex justify-between text-gray-600"><span>V\u1EADn chuy\u1EC3n</span><span>${ssrInterpolate(fmt(unref(cs).shippingFee))}</span></div><div class="flex justify-between font-bold text-base pt-2 border-t"><span>T\u1ED5ng c\u1ED9ng</span><span class="text-red-600">${ssrInterpolate(fmt(((_e = (_d = unref(cartStore).cart) == null ? void 0 : _d.subtotal) != null ? _e : 0) + unref(cs).shippingFee))}</span></div></div><div class="flex gap-3"><button class="px-6 py-2.5 border rounded-lg text-sm">\u2190 Quay l\u1EA1i</button><button${ssrIncludeBooleanAttr(unref(cs).isSubmitting) ? " disabled" : ""} class="flex-1 bg-green-600 text-white py-2.5 rounded-lg font-semibold hover:bg-green-700 disabled:opacity-50">${ssrInterpolate(unref(cs).isSubmitting ? "\u0110ang \u0111\u1EB7t h\xE0ng..." : "\u2713 \u0110\u1EB7t h\xE0ng")}</button></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/checkout/review.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=review-4-8QMZl5.mjs.map
