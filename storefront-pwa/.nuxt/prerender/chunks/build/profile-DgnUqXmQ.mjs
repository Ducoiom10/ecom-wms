import { defineComponent, ref, reactive, mergeProps, unref, useSSRContext } from 'file://C:/laragon/www/ecom-wms/storefront-pwa/node_modules/vue/index.mjs';
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderClass, ssrInterpolate, ssrIncludeBooleanAttr } from 'file://C:/laragon/www/ecom-wms/storefront-pwa/node_modules/vue/server-renderer/index.mjs';
import { u as useAuthStore } from './auth-rbnhynP_.mjs';
import './server.mjs';
import 'file://C:/laragon/www/ecom-wms/storefront-pwa/node_modules/ofetch/dist/node.mjs';
import '../_/nitro.mjs';
import 'file://C:/laragon/www/ecom-wms/storefront-pwa/node_modules/h3/dist/index.mjs';
import 'file://C:/laragon/www/ecom-wms/storefront-pwa/node_modules/destr/dist/index.mjs';
import 'file://C:/laragon/www/ecom-wms/storefront-pwa/node_modules/hookable/dist/index.mjs';
import 'file://C:/laragon/www/ecom-wms/storefront-pwa/node_modules/node-mock-http/dist/index.mjs';
import 'file://C:/laragon/www/ecom-wms/storefront-pwa/node_modules/klona/dist/index.mjs';
import 'file://C:/laragon/www/ecom-wms/storefront-pwa/node_modules/defu/dist/defu.mjs';
import 'file://C:/laragon/www/ecom-wms/storefront-pwa/node_modules/scule/dist/index.mjs';
import 'file://C:/laragon/www/ecom-wms/storefront-pwa/node_modules/radix3/dist/index.mjs';
import 'node:fs';
import 'node:url';
import 'file://C:/laragon/www/ecom-wms/storefront-pwa/node_modules/pathe/dist/index.mjs';
import 'file://C:/laragon/www/ecom-wms/storefront-pwa/node_modules/ipx/dist/index.mjs';
import 'file://C:/laragon/www/ecom-wms/storefront-pwa/node_modules/unstorage/dist/index.mjs';
import 'file://C:/laragon/www/ecom-wms/storefront-pwa/node_modules/unstorage/drivers/fs.mjs';
import 'file:///C:/laragon/www/ecom-wms/storefront-pwa/node_modules/@nuxt/nitro-server/dist/runtime/utils/cache-driver.js';
import 'file://C:/laragon/www/ecom-wms/storefront-pwa/node_modules/unstorage/drivers/fs-lite.mjs';
import 'file://C:/laragon/www/ecom-wms/storefront-pwa/node_modules/ohash/dist/index.mjs';
import 'file://C:/laragon/www/ecom-wms/storefront-pwa/node_modules/unctx/dist/index.mjs';
import 'file://C:/laragon/www/ecom-wms/storefront-pwa/node_modules/pinia/dist/pinia.prod.cjs';
import 'file://C:/laragon/www/ecom-wms/storefront-pwa/node_modules/vue-router/vue-router.node.mjs';
import 'file://C:/laragon/www/ecom-wms/storefront-pwa/node_modules/nuxt/node_modules/cookie-es/dist/index.mjs';
import 'file://C:/laragon/www/ecom-wms/storefront-pwa/node_modules/vue-devtools-stub/dist/index.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "profile",
  __ssrInlineRender: true,
  setup(__props) {
    var _a, _b;
    const authStore = useAuthStore();
    const saving = ref(false);
    const msg = ref(null);
    const form = reactive({ name: (_b = (_a = authStore.user) == null ? void 0 : _a.name) != null ? _b : "", password: "", password_confirmation: "" });
    return (_ctx, _push, _parent, _attrs) => {
      var _a2;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "bg-white rounded-xl border p-6 space-y-6" }, _attrs))}><h1 class="text-xl font-bold">H\u1ED3 s\u01A1 c\xE1 nh\xE2n</h1><form class="space-y-4 max-w-md"><div><label class="block text-sm font-medium mb-1">H\u1ECD t\xEAn</label><input${ssrRenderAttr("value", unref(form).name)} class="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-400 focus:outline-none"></div><div><label class="block text-sm font-medium mb-1">Email</label><input${ssrRenderAttr("value", (_a2 = unref(authStore).user) == null ? void 0 : _a2.email)} disabled class="w-full border rounded-lg px-3 py-2 bg-gray-50 text-gray-400"></div><div class="border-t pt-4"><p class="text-sm font-semibold mb-3">\u0110\u1ED5i m\u1EADt kh\u1EA9u</p><input${ssrRenderAttr("value", unref(form).password)} type="password" placeholder="M\u1EADt kh\u1EA9u m\u1EDBi" class="w-full border rounded-lg px-3 py-2 mb-2 focus:outline-none"><input${ssrRenderAttr("value", unref(form).password_confirmation)} type="password" placeholder="X\xE1c nh\u1EADn m\u1EADt kh\u1EA9u" class="w-full border rounded-lg px-3 py-2 focus:outline-none"></div>`);
      if (unref(msg)) {
        _push(`<p class="${ssrRenderClass([unref(msg).type === "success" ? "text-green-600" : "text-red-600", "text-sm"])}">${ssrInterpolate(unref(msg).text)}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<button type="submit"${ssrIncludeBooleanAttr(unref(saving)) ? " disabled" : ""} class="bg-indigo-600 text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-indigo-700 disabled:opacity-50">${ssrInterpolate(unref(saving) ? "\u0110ang l\u01B0u..." : "L\u01B0u thay \u0111\u1ED5i")}</button></form></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/account/profile.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=profile-DgnUqXmQ.mjs.map
