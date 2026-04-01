import { _ as __nuxt_component_0 } from './nuxt-link-B2doaXW1.mjs';
import { defineComponent, computed, mergeProps, unref, withCtx, createVNode, toDisplayString, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderList, ssrRenderComponent, ssrRenderSlot } from 'vue/server-renderer';
import { u as useAuthStore } from './auth-rbnhynP_.mjs';
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

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "account",
  __ssrInlineRender: true,
  setup(__props) {
    const authStore = useAuthStore();
    const initials = computed(() => {
      var _a, _b, _c;
      return (_c = (_b = (_a = authStore.user) == null ? void 0 : _a.name) == null ? void 0 : _b.split(" ").map((w) => w[0]).slice(-2).join("").toUpperCase()) != null ? _c : "?";
    });
    const menu = [
      { to: "/account/orders", icon: "\u{1F4E6}", label: "\u0110\u01A1n h\xE0ng" },
      { to: "/account/loyalty", icon: "\u2B50", label: "\u0110i\u1EC3m th\u01B0\u1EDFng" },
      { to: "/account/addresses", icon: "\u{1F4CD}", label: "\u0110\u1ECBa ch\u1EC9" },
      { to: "/account/wishlist", icon: "\u2764\uFE0F", label: "Y\xEAu th\xEDch" },
      { to: "/account/profile", icon: "\u2699\uFE0F", label: "H\u1ED3 s\u01A1" }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b;
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-gray-50" }, _attrs))}><div class="max-w-6xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-4 gap-6"><aside class="md:col-span-1"><div class="bg-white rounded-xl border p-5 space-y-4"><div class="text-center pb-4 border-b"><div class="w-14 h-14 rounded-full bg-indigo-100 text-indigo-600 font-bold text-xl flex items-center justify-center mx-auto mb-2">${ssrInterpolate(unref(initials))}</div><p class="font-semibold text-sm">${ssrInterpolate((_a = unref(authStore).user) == null ? void 0 : _a.name)}</p><p class="text-xs text-gray-400">${ssrInterpolate((_b = unref(authStore).user) == null ? void 0 : _b.email)}</p></div><nav class="space-y-1 text-sm"><!--[-->`);
      ssrRenderList(menu, (item) => {
        _push(ssrRenderComponent(_component_NuxtLink, {
          key: item.to,
          to: item.to,
          "active-class": "bg-indigo-50 text-indigo-600 font-semibold",
          class: "flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-50 transition text-gray-700"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<span${_scopeId}>${ssrInterpolate(item.icon)}</span>${ssrInterpolate(item.label)}`);
            } else {
              return [
                createVNode("span", null, toDisplayString(item.icon), 1),
                createTextVNode(toDisplayString(item.label), 1)
              ];
            }
          }),
          _: 2
        }, _parent));
      });
      _push(`<!--]--><button class="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-red-500 hover:bg-red-50 transition text-left"> \u{1F6AA} \u0110\u0103ng xu\u1EA5t </button></nav></div></aside><main class="md:col-span-3">`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</main></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/account.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=account-Bh-PWT9J.mjs.map
