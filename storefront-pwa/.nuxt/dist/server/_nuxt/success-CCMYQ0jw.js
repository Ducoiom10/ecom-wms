import { _ as __nuxt_component_0 } from "./nuxt-link-B2doaXW1.js";
import { defineComponent, mergeProps, unref, withCtx, createTextVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrInterpolate, ssrRenderComponent } from "vue/server-renderer";
import "C:/laragon/www/ecom-wms/storefront-pwa/node_modules/hookable/dist/index.mjs";
import { u as useCheckoutStore } from "./checkout-CuEQ3r30.js";
import { n as navigateTo } from "../server.mjs";
import "C:/laragon/www/ecom-wms/storefront-pwa/node_modules/defu/dist/defu.mjs";
import "C:/laragon/www/ecom-wms/storefront-pwa/node_modules/klona/dist/index.mjs";
import "#internal/nuxt/paths";
import "pinia";
import "./cart-TRz18UDQ.js";
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
  __name: "success",
  __ssrInlineRender: true,
  setup(__props) {
    const cs = useCheckoutStore();
    const fmt = (n) => new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(n);
    if (!cs.order) navigateTo("/");
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen flex items-center justify-center bg-gray-50 px-4" }, _attrs))}><div class="bg-white rounded-2xl shadow p-10 max-w-md w-full text-center space-y-5"><div class="text-6xl">🎉</div><h1 class="text-2xl font-bold text-green-600">Đặt hàng thành công!</h1><p class="text-gray-600 text-sm"> Đơn hàng <strong>#${ssrInterpolate(unref(cs).order?.id)}</strong> đã được tiếp nhận.<br> Chúng tôi sẽ liên hệ xác nhận trong thời gian sớm nhất. </p><div class="bg-gray-50 rounded-lg p-4 text-sm text-left space-y-1"><div class="flex justify-between"><span class="text-gray-500">Tổng tiền</span><span class="font-bold text-red-600">${ssrInterpolate(fmt(unref(cs).order?.total ?? 0))}</span></div><div class="flex justify-between"><span class="text-gray-500">Thanh toán</span><span>${ssrInterpolate(unref(cs).payment === "cod" ? "COD" : unref(cs).payment)}</span></div></div><div class="flex gap-3 pt-2">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/account/orders",
        class: "flex-1 border border-indigo-600 text-indigo-600 py-2.5 rounded-lg text-sm font-semibold hover:bg-indigo-50"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Xem đơn hàng `);
          } else {
            return [
              createTextVNode(" Xem đơn hàng ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/",
        onClick: ($event) => unref(cs).reset(),
        class: "flex-1 bg-indigo-600 text-white py-2.5 rounded-lg text-sm font-semibold hover:bg-indigo-700"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Tiếp tục mua sắm `);
          } else {
            return [
              createTextVNode(" Tiếp tục mua sắm ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/checkout/success.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=success-CCMYQ0jw.js.map
