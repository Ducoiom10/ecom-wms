import { _ as __nuxt_component_0 } from "./nuxt-link-B2doaXW1.js";
import { defineComponent, computed, mergeProps, unref, withCtx, createVNode, toDisplayString, createTextVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrInterpolate, ssrRenderList, ssrRenderComponent, ssrRenderSlot } from "vue/server-renderer";
import "C:/laragon/www/ecom-wms/storefront-pwa/node_modules/hookable/dist/index.mjs";
import { u as useAuthStore } from "./auth-rbnhynP_.js";
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
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "account",
  __ssrInlineRender: true,
  setup(__props) {
    const authStore = useAuthStore();
    const initials = computed(() => authStore.user?.name?.split(" ").map((w) => w[0]).slice(-2).join("").toUpperCase() ?? "?");
    const menu = [
      { to: "/account/orders", icon: "📦", label: "Đơn hàng" },
      { to: "/account/loyalty", icon: "⭐", label: "Điểm thưởng" },
      { to: "/account/addresses", icon: "📍", label: "Địa chỉ" },
      { to: "/account/wishlist", icon: "❤️", label: "Yêu thích" },
      { to: "/account/profile", icon: "⚙️", label: "Hồ sơ" }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-gray-50" }, _attrs))}><div class="max-w-6xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-4 gap-6"><aside class="md:col-span-1"><div class="bg-white rounded-xl border p-5 space-y-4"><div class="text-center pb-4 border-b"><div class="w-14 h-14 rounded-full bg-indigo-100 text-indigo-600 font-bold text-xl flex items-center justify-center mx-auto mb-2">${ssrInterpolate(unref(initials))}</div><p class="font-semibold text-sm">${ssrInterpolate(unref(authStore).user?.name)}</p><p class="text-xs text-gray-400">${ssrInterpolate(unref(authStore).user?.email)}</p></div><nav class="space-y-1 text-sm"><!--[-->`);
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
      _push(`<!--]--><button class="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-red-500 hover:bg-red-50 transition text-left"> 🚪 Đăng xuất </button></nav></div></aside><main class="md:col-span-3">`);
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
export {
  _sfc_main as default
};
//# sourceMappingURL=account-Bh-PWT9J.js.map
