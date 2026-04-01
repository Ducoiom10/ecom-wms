import { defineComponent, ref, reactive, mergeProps, unref, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderClass, ssrInterpolate, ssrIncludeBooleanAttr } from "vue/server-renderer";
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
  __name: "profile",
  __ssrInlineRender: true,
  setup(__props) {
    const authStore = useAuthStore();
    const saving = ref(false);
    const msg = ref(null);
    const form = reactive({ name: authStore.user?.name ?? "", password: "", password_confirmation: "" });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "bg-white rounded-xl border p-6 space-y-6" }, _attrs))}><h1 class="text-xl font-bold">Hồ sơ cá nhân</h1><form class="space-y-4 max-w-md"><div><label class="block text-sm font-medium mb-1">Họ tên</label><input${ssrRenderAttr("value", unref(form).name)} class="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-400 focus:outline-none"></div><div><label class="block text-sm font-medium mb-1">Email</label><input${ssrRenderAttr("value", unref(authStore).user?.email)} disabled class="w-full border rounded-lg px-3 py-2 bg-gray-50 text-gray-400"></div><div class="border-t pt-4"><p class="text-sm font-semibold mb-3">Đổi mật khẩu</p><input${ssrRenderAttr("value", unref(form).password)} type="password" placeholder="Mật khẩu mới" class="w-full border rounded-lg px-3 py-2 mb-2 focus:outline-none"><input${ssrRenderAttr("value", unref(form).password_confirmation)} type="password" placeholder="Xác nhận mật khẩu" class="w-full border rounded-lg px-3 py-2 focus:outline-none"></div>`);
      if (unref(msg)) {
        _push(`<p class="${ssrRenderClass([unref(msg).type === "success" ? "text-green-600" : "text-red-600", "text-sm"])}">${ssrInterpolate(unref(msg).text)}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<button type="submit"${ssrIncludeBooleanAttr(unref(saving)) ? " disabled" : ""} class="bg-indigo-600 text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-indigo-700 disabled:opacity-50">${ssrInterpolate(unref(saving) ? "Đang lưu..." : "Lưu thay đổi")}</button></form></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/account/profile.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=profile-DgnUqXmQ.js.map
