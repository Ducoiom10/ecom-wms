import { defineComponent, computed, mergeProps, unref, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderList, ssrRenderClass, ssrIncludeBooleanAttr, ssrLooseEqual, ssrInterpolate } from "vue/server-renderer";
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
  __name: "shipping",
  __ssrInlineRender: true,
  setup(__props) {
    const cs = useCheckoutStore();
    const fmt = (n) => new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(n);
    const shippingOpts = [
      { value: "standard", label: "Tiêu chuẩn (3-5 ngày)", fee: 3e4 },
      { value: "express", label: "Nhanh (1-2 ngày)", fee: 5e4 }
    ];
    const valid = computed(
      () => cs.customer.fullName && cs.customer.phone && cs.address.province && cs.address.street
    );
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "max-w-2xl mx-auto py-10 px-4 space-y-8" }, _attrs))}><h1 class="text-2xl font-bold">Địa chỉ giao hàng</h1><div class="bg-white rounded-xl border p-6 space-y-4"><div class="grid grid-cols-2 gap-4"><input${ssrRenderAttr("value", unref(cs).customer.fullName)} placeholder="Họ và tên *" class="col-span-2 border rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-400 focus:outline-none"><input${ssrRenderAttr("value", unref(cs).customer.phone)} placeholder="Số điện thoại *" class="border rounded-lg px-3 py-2 focus:outline-none"><input${ssrRenderAttr("value", unref(cs).customer.email)} placeholder="Email" type="email" class="border rounded-lg px-3 py-2 focus:outline-none"><input${ssrRenderAttr("value", unref(cs).address.province)} placeholder="Tỉnh / Thành phố *" class="border rounded-lg px-3 py-2 focus:outline-none"><input${ssrRenderAttr("value", unref(cs).address.district)} placeholder="Quận / Huyện *" class="border rounded-lg px-3 py-2 focus:outline-none"><input${ssrRenderAttr("value", unref(cs).address.ward)} placeholder="Phường / Xã" class="border rounded-lg px-3 py-2 focus:outline-none"><input${ssrRenderAttr("value", unref(cs).address.street)} placeholder="Số nhà, tên đường *" class="border rounded-lg px-3 py-2 focus:outline-none"></div></div><div class="bg-white rounded-xl border p-6 space-y-3"><h2 class="font-semibold">Phương thức vận chuyển</h2><!--[-->`);
      ssrRenderList(shippingOpts, (opt) => {
        _push(`<label class="${ssrRenderClass([unref(cs).shipping === opt.value ? "border-indigo-600 bg-indigo-50" : "", "flex items-center justify-between p-3 border rounded-lg cursor-pointer hover:border-indigo-400 transition"])}"><div class="flex items-center gap-3"><input type="radio"${ssrRenderAttr("value", opt.value)}${ssrIncludeBooleanAttr(ssrLooseEqual(unref(cs).shipping, opt.value)) ? " checked" : ""} class="accent-indigo-600"><span class="text-sm">${ssrInterpolate(opt.label)}</span></div><span class="text-sm font-semibold">${ssrInterpolate(fmt(opt.fee))}</span></label>`);
      });
      _push(`<!--]--></div><div class="flex gap-3"><button class="px-6 py-2.5 border rounded-lg text-sm hover:bg-gray-50">← Quay lại</button><button${ssrIncludeBooleanAttr(!unref(valid)) ? " disabled" : ""} class="flex-1 bg-indigo-600 text-white py-2.5 rounded-lg font-semibold hover:bg-indigo-700 disabled:opacity-50"> Tiếp tục → </button></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/checkout/shipping.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=shipping-D4dAvuyz.js.map
