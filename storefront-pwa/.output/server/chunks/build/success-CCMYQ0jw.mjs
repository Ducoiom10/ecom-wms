import { _ as __nuxt_component_0 } from './nuxt-link-B2doaXW1.mjs';
import { defineComponent, mergeProps, unref, withCtx, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderComponent } from 'vue/server-renderer';
import { u as useCheckoutStore } from './checkout-CuEQ3r30.mjs';
import { n as navigateTo } from './server.mjs';
import 'pinia';
import './cart-TRz18UDQ.mjs';
import './ui-CDZkXfd4.mjs';
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

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "success",
  __ssrInlineRender: true,
  setup(__props) {
    const cs = useCheckoutStore();
    const fmt = (n) => new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(n);
    if (!cs.order) navigateTo("/");
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b, _c;
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen flex items-center justify-center bg-gray-50 px-4" }, _attrs))}><div class="bg-white rounded-2xl shadow p-10 max-w-md w-full text-center space-y-5"><div class="text-6xl">\u{1F389}</div><h1 class="text-2xl font-bold text-green-600">\u0110\u1EB7t h\xE0ng th\xE0nh c\xF4ng!</h1><p class="text-gray-600 text-sm"> \u0110\u01A1n h\xE0ng <strong>#${ssrInterpolate((_a = unref(cs).order) == null ? void 0 : _a.id)}</strong> \u0111\xE3 \u0111\u01B0\u1EE3c ti\u1EBFp nh\u1EADn.<br> Ch\xFAng t\xF4i s\u1EBD li\xEAn h\u1EC7 x\xE1c nh\u1EADn trong th\u1EDDi gian s\u1EDBm nh\u1EA5t. </p><div class="bg-gray-50 rounded-lg p-4 text-sm text-left space-y-1"><div class="flex justify-between"><span class="text-gray-500">T\u1ED5ng ti\u1EC1n</span><span class="font-bold text-red-600">${ssrInterpolate(fmt((_c = (_b = unref(cs).order) == null ? void 0 : _b.total) != null ? _c : 0))}</span></div><div class="flex justify-between"><span class="text-gray-500">Thanh to\xE1n</span><span>${ssrInterpolate(unref(cs).payment === "cod" ? "COD" : unref(cs).payment)}</span></div></div><div class="flex gap-3 pt-2">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/account/orders",
        class: "flex-1 border border-indigo-600 text-indigo-600 py-2.5 rounded-lg text-sm font-semibold hover:bg-indigo-50"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Xem \u0111\u01A1n h\xE0ng `);
          } else {
            return [
              createTextVNode(" Xem \u0111\u01A1n h\xE0ng ")
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
            _push2(` Ti\u1EBFp t\u1EE5c mua s\u1EAFm `);
          } else {
            return [
              createTextVNode(" Ti\u1EBFp t\u1EE5c mua s\u1EAFm ")
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

export { _sfc_main as default };
//# sourceMappingURL=success-CCMYQ0jw.mjs.map
