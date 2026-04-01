import { defineComponent, reactive, ref, mergeProps, unref, useSSRContext } from 'file://C:/laragon/www/ecom-wms/storefront-pwa/node_modules/vue/index.mjs';
import { ssrRenderAttrs, ssrRenderAttr, ssrInterpolate, ssrIncludeBooleanAttr } from 'file://C:/laragon/www/ecom-wms/storefront-pwa/node_modules/vue/server-renderer/index.mjs';
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
  __name: "auth",
  __ssrInlineRender: true,
  setup(__props) {
    const authStore = useAuthStore();
    const form = reactive({ email: "", password: "" });
    const error = ref("");
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4" }, _attrs))}><div class="w-full max-w-md bg-white rounded-xl shadow p-8 space-y-5"><h1 class="text-2xl font-bold">\u0110\u0103ng nh\u1EADp \u0111\u1EC3 thanh to\xE1n</h1><form class="space-y-4"><div><label class="block text-sm font-medium mb-1">Email</label><input${ssrRenderAttr("value", unref(form).email)} type="email" required class="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-400 focus:outline-none"></div><div><label class="block text-sm font-medium mb-1">M\u1EADt kh\u1EA9u</label><input${ssrRenderAttr("value", unref(form).password)} type="password" required class="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-400 focus:outline-none"></div>`);
      if (unref(error)) {
        _push(`<p class="text-red-600 text-sm">${ssrInterpolate(unref(error))}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<button type="submit"${ssrIncludeBooleanAttr(unref(authStore).loading) ? " disabled" : ""} class="w-full bg-indigo-600 text-white py-2.5 rounded-lg font-semibold hover:bg-indigo-700 disabled:opacity-50">${ssrInterpolate(unref(authStore).loading ? "\u0110ang x\u1EED l\xFD..." : "Ti\u1EBFp t\u1EE5c")}</button></form><div class="text-center border-t pt-4"><button class="text-sm text-gray-500 hover:text-indigo-600"> Thanh to\xE1n kh\xF4ng c\u1EA7n \u0111\u0103ng nh\u1EADp \u2192 </button></div></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/checkout/auth.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=auth-CCjTczbG.mjs.map
