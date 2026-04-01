import { defineComponent, computed, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderList, ssrRenderClass, ssrIncludeBooleanAttr, ssrLooseEqual, ssrInterpolate } from 'vue/server-renderer';
import { u as useCheckoutStore } from './checkout-CuEQ3r30.mjs';
import 'pinia';
import './cart-TRz18UDQ.mjs';
import './ui-CDZkXfd4.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "shipping",
  __ssrInlineRender: true,
  setup(__props) {
    const cs = useCheckoutStore();
    const fmt = (n) => new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(n);
    const shippingOpts = [
      { value: "standard", label: "Ti\xEAu chu\u1EA9n (3-5 ng\xE0y)", fee: 3e4 },
      { value: "express", label: "Nhanh (1-2 ng\xE0y)", fee: 5e4 }
    ];
    const valid = computed(
      () => cs.customer.fullName && cs.customer.phone && cs.address.province && cs.address.street
    );
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "max-w-2xl mx-auto py-10 px-4 space-y-8" }, _attrs))}><h1 class="text-2xl font-bold">\u0110\u1ECBa ch\u1EC9 giao h\xE0ng</h1><div class="bg-white rounded-xl border p-6 space-y-4"><div class="grid grid-cols-2 gap-4"><input${ssrRenderAttr("value", unref(cs).customer.fullName)} placeholder="H\u1ECD v\xE0 t\xEAn *" class="col-span-2 border rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-400 focus:outline-none"><input${ssrRenderAttr("value", unref(cs).customer.phone)} placeholder="S\u1ED1 \u0111i\u1EC7n tho\u1EA1i *" class="border rounded-lg px-3 py-2 focus:outline-none"><input${ssrRenderAttr("value", unref(cs).customer.email)} placeholder="Email" type="email" class="border rounded-lg px-3 py-2 focus:outline-none"><input${ssrRenderAttr("value", unref(cs).address.province)} placeholder="T\u1EC9nh / Th\xE0nh ph\u1ED1 *" class="border rounded-lg px-3 py-2 focus:outline-none"><input${ssrRenderAttr("value", unref(cs).address.district)} placeholder="Qu\u1EADn / Huy\u1EC7n *" class="border rounded-lg px-3 py-2 focus:outline-none"><input${ssrRenderAttr("value", unref(cs).address.ward)} placeholder="Ph\u01B0\u1EDDng / X\xE3" class="border rounded-lg px-3 py-2 focus:outline-none"><input${ssrRenderAttr("value", unref(cs).address.street)} placeholder="S\u1ED1 nh\xE0, t\xEAn \u0111\u01B0\u1EDDng *" class="border rounded-lg px-3 py-2 focus:outline-none"></div></div><div class="bg-white rounded-xl border p-6 space-y-3"><h2 class="font-semibold">Ph\u01B0\u01A1ng th\u1EE9c v\u1EADn chuy\u1EC3n</h2><!--[-->`);
      ssrRenderList(shippingOpts, (opt) => {
        _push(`<label class="${ssrRenderClass([unref(cs).shipping === opt.value ? "border-indigo-600 bg-indigo-50" : "", "flex items-center justify-between p-3 border rounded-lg cursor-pointer hover:border-indigo-400 transition"])}"><div class="flex items-center gap-3"><input type="radio"${ssrRenderAttr("value", opt.value)}${ssrIncludeBooleanAttr(ssrLooseEqual(unref(cs).shipping, opt.value)) ? " checked" : ""} class="accent-indigo-600"><span class="text-sm">${ssrInterpolate(opt.label)}</span></div><span class="text-sm font-semibold">${ssrInterpolate(fmt(opt.fee))}</span></label>`);
      });
      _push(`<!--]--></div><div class="flex gap-3"><button class="px-6 py-2.5 border rounded-lg text-sm hover:bg-gray-50">\u2190 Quay l\u1EA1i</button><button${ssrIncludeBooleanAttr(!unref(valid)) ? " disabled" : ""} class="flex-1 bg-indigo-600 text-white py-2.5 rounded-lg font-semibold hover:bg-indigo-700 disabled:opacity-50"> Ti\u1EBFp t\u1EE5c \u2192 </button></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/checkout/shipping.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=shipping-D4dAvuyz.mjs.map
