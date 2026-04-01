import { _ as __nuxt_component_0 } from './nuxt-link-B2doaXW1.mjs';
import { defineComponent, computed, mergeProps, withCtx, createTextVNode, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrRenderClass, ssrInterpolate, ssrRenderSlot } from 'vue/server-renderer';
import { u as useCheckoutStore } from './checkout-CuEQ3r30.mjs';
import './server.mjs';
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
import 'pinia';
import 'vue-router';
import './cart-TRz18UDQ.mjs';
import './ui-CDZkXfd4.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "checkout",
  __ssrInlineRender: true,
  setup(__props) {
    const cs = useCheckoutStore();
    const steps = ["\u0110\u0103ng nh\u1EADp", "Giao h\xE0ng", "Thanh to\xE1n", "Xem l\u1EA1i", "Ho\xE0n t\u1EA5t"];
    const stepMap = { auth: 0, shipping: 1, payment: 2, review: 3, success: 4 };
    const currentIdx = computed(() => {
      var _a;
      return (_a = stepMap[cs.step]) != null ? _a : 0;
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-gray-50" }, _attrs))}><header class="bg-white border-b"><div class="max-w-2xl mx-auto px-4 h-14 flex items-center justify-between">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/",
        class: "text-lg font-bold text-indigo-600"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`EcomWMS`);
          } else {
            return [
              createTextVNode("EcomWMS")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="flex items-center gap-2 text-xs text-gray-400"><!--[-->`);
      ssrRenderList(steps, (s, i) => {
        _push(`<span class="${ssrRenderClass(i <= unref(currentIdx) ? "text-indigo-600 font-semibold" : "")}">${ssrInterpolate(s)}`);
        if (i < steps.length - 1) {
          _push(`<span class="mx-1">\u203A</span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</span>`);
      });
      _push(`<!--]--></div></div></header>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/checkout.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=checkout-iGrpc6cR.mjs.map
