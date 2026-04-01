import { defineComponent, mergeProps, unref, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderList, ssrRenderClass, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseEqual, ssrInterpolate } from "vue/server-renderer";
import "C:/laragon/www/ecom-wms/storefront-pwa/node_modules/hookable/dist/index.mjs";
import { u as useCheckoutStore } from "./checkout-CuEQ3r30.js";
import "../server.mjs";
import "C:/laragon/www/ecom-wms/storefront-pwa/node_modules/ofetch/dist/node.mjs";
import "#internal/nuxt/paths";
import "C:/laragon/www/ecom-wms/storefront-pwa/node_modules/unctx/dist/index.mjs";
import "C:/laragon/www/ecom-wms/storefront-pwa/node_modules/h3/dist/index.mjs";
import "pinia";
import "C:/laragon/www/ecom-wms/storefront-pwa/node_modules/defu/dist/defu.mjs";
import "vue-router";
import "C:/laragon/www/ecom-wms/storefront-pwa/node_modules/klona/dist/index.mjs";
import "C:/laragon/www/ecom-wms/storefront-pwa/node_modules/nuxt/node_modules/cookie-es/dist/index.mjs";
import "C:/laragon/www/ecom-wms/storefront-pwa/node_modules/destr/dist/index.mjs";
import "C:/laragon/www/ecom-wms/storefront-pwa/node_modules/ohash/dist/index.mjs";
import "@vue/devtools-api";
import "./cart-TRz18UDQ.js";
import "./ui-CDZkXfd4.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "payment",
  __ssrInlineRender: true,
  setup(__props) {
    const cs = useCheckoutStore();
    const paymentOpts = [
      { value: "cod", icon: "💵", label: "Thanh toán khi nhận hàng (COD)", desc: "Trả tiền mặt khi nhận hàng" },
      { value: "stripe", icon: "💳", label: "Thẻ tín dụng / Ghi nợ", desc: "Visa, Mastercard, JCB" },
      { value: "zalopay", icon: "📱", label: "ZaloPay", desc: "Ví điện tử ZaloPay" }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "max-w-2xl mx-auto py-10 px-4 space-y-8" }, _attrs))}><h1 class="text-2xl font-bold">Phương thức thanh toán</h1><div class="bg-white rounded-xl border p-6 space-y-3"><!--[-->`);
      ssrRenderList(paymentOpts, (opt) => {
        _push(`<label class="${ssrRenderClass([unref(cs).payment === opt.value ? "border-indigo-600 bg-indigo-50" : "", "flex items-center gap-3 p-4 border rounded-lg cursor-pointer hover:border-indigo-400 transition"])}"><input type="radio"${ssrRenderAttr("value", opt.value)}${ssrIncludeBooleanAttr(ssrLooseEqual(unref(cs).payment, opt.value)) ? " checked" : ""} class="accent-indigo-600"><span class="text-2xl">${ssrInterpolate(opt.icon)}</span><div><p class="font-medium text-sm">${ssrInterpolate(opt.label)}</p><p class="text-xs text-gray-400">${ssrInterpolate(opt.desc)}</p></div></label>`);
      });
      _push(`<!--]--></div><div class="flex gap-3"><button class="px-6 py-2.5 border rounded-lg text-sm hover:bg-gray-50">← Quay lại</button><button class="flex-1 bg-indigo-600 text-white py-2.5 rounded-lg font-semibold hover:bg-indigo-700"> Xem lại đơn hàng → </button></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/checkout/payment.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=payment-DPg04Ota.js.map
