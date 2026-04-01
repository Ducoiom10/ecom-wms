import { defineComponent, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderList, ssrRenderClass, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseEqual, ssrInterpolate } from 'vue/server-renderer';
import { u as useCheckoutStore } from './checkout-CuEQ3r30.mjs';
import 'pinia';
import './cart-TRz18UDQ.mjs';
import './ui-CDZkXfd4.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "payment",
  __ssrInlineRender: true,
  setup(__props) {
    const cs = useCheckoutStore();
    const paymentOpts = [
      { value: "cod", icon: "\u{1F4B5}", label: "Thanh to\xE1n khi nh\u1EADn h\xE0ng (COD)", desc: "Tr\u1EA3 ti\u1EC1n m\u1EB7t khi nh\u1EADn h\xE0ng" },
      { value: "stripe", icon: "\u{1F4B3}", label: "Th\u1EBB t\xEDn d\u1EE5ng / Ghi n\u1EE3", desc: "Visa, Mastercard, JCB" },
      { value: "zalopay", icon: "\u{1F4F1}", label: "ZaloPay", desc: "V\xED \u0111i\u1EC7n t\u1EED ZaloPay" }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "max-w-2xl mx-auto py-10 px-4 space-y-8" }, _attrs))}><h1 class="text-2xl font-bold">Ph\u01B0\u01A1ng th\u1EE9c thanh to\xE1n</h1><div class="bg-white rounded-xl border p-6 space-y-3"><!--[-->`);
      ssrRenderList(paymentOpts, (opt) => {
        _push(`<label class="${ssrRenderClass([unref(cs).payment === opt.value ? "border-indigo-600 bg-indigo-50" : "", "flex items-center gap-3 p-4 border rounded-lg cursor-pointer hover:border-indigo-400 transition"])}"><input type="radio"${ssrRenderAttr("value", opt.value)}${ssrIncludeBooleanAttr(ssrLooseEqual(unref(cs).payment, opt.value)) ? " checked" : ""} class="accent-indigo-600"><span class="text-2xl">${ssrInterpolate(opt.icon)}</span><div><p class="font-medium text-sm">${ssrInterpolate(opt.label)}</p><p class="text-xs text-gray-400">${ssrInterpolate(opt.desc)}</p></div></label>`);
      });
      _push(`<!--]--></div><div class="flex gap-3"><button class="px-6 py-2.5 border rounded-lg text-sm hover:bg-gray-50">\u2190 Quay l\u1EA1i</button><button class="flex-1 bg-indigo-600 text-white py-2.5 rounded-lg font-semibold hover:bg-indigo-700"> Xem l\u1EA1i \u0111\u01A1n h\xE0ng \u2192 </button></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/checkout/payment.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=payment-DPg04Ota.mjs.map
