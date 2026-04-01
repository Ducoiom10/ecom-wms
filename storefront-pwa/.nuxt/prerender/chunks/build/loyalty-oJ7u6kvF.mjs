import { _ as _sfc_main$1 } from './EmptyState-DTWoF1UD.mjs';
import { defineComponent, withAsyncContext, mergeProps, unref, useSSRContext } from 'file://C:/laragon/www/ecom-wms/storefront-pwa/node_modules/vue/index.mjs';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderComponent, ssrRenderList, ssrRenderClass } from 'file://C:/laragon/www/ecom-wms/storefront-pwa/node_modules/vue/server-renderer/index.mjs';
import { u as useAsyncData } from './asyncData-DBk6s2t8.mjs';
import { u as useApi } from './useApi-BXP922BC.mjs';
import './nuxt-link-B2doaXW1.mjs';
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
import 'file://C:/laragon/www/ecom-wms/storefront-pwa/node_modules/perfect-debounce/dist/index.mjs';
import './auth-rbnhynP_.mjs';
import './ui-CDZkXfd4.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "loyalty",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const { data: loyalty, pending } = ([__temp, __restore] = withAsyncContext(() => useAsyncData("loyalty", () => useApi()("crm/v1/loyalty/benefits"))), __temp = await __temp, __restore(), __temp);
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b, _c, _d;
      const _component_UiEmptyState = _sfc_main$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "bg-white rounded-xl border p-6 space-y-5" }, _attrs))}><h1 class="text-xl font-bold">\u0110i\u1EC3m th\u01B0\u1EDFng</h1>`);
      if (unref(pending)) {
        _push(`<div class="h-32 bg-gray-100 rounded-lg animate-pulse"></div>`);
      } else {
        _push(`<div><div class="bg-indigo-50 rounded-xl p-5 flex items-center justify-between mb-6"><div><p class="text-sm text-gray-500">\u0110i\u1EC3m hi\u1EC7n t\u1EA1i</p><p class="text-4xl font-bold text-indigo-600">${ssrInterpolate((_b = (_a = unref(loyalty)) == null ? void 0 : _a.points) != null ? _b : 0)}</p></div><span class="text-5xl">\u2B50</span></div><h2 class="font-semibold mb-3 text-sm text-gray-500 uppercase tracking-wide">L\u1ECBch s\u1EED \u0111i\u1EC3m</h2>`);
        if (!((_d = (_c = unref(loyalty)) == null ? void 0 : _c.transactions) == null ? void 0 : _d.length)) {
          _push(ssrRenderComponent(_component_UiEmptyState, {
            icon: "\u2B50",
            title: "Ch\u01B0a c\xF3 giao d\u1ECBch \u0111i\u1EC3m",
            message: "Mua h\xE0ng \u0111\u1EC3 t\xEDch \u0111i\u1EC3m th\u01B0\u1EDFng"
          }, null, _parent));
        } else {
          _push(`<div class="space-y-2"><!--[-->`);
          ssrRenderList(unref(loyalty).transactions, (t) => {
            _push(`<div class="flex justify-between items-center border-b py-2 text-sm"><span class="text-gray-600">${ssrInterpolate(t.description)}</span><span class="${ssrRenderClass(t.points > 0 ? "text-green-600 font-bold" : "text-red-500")}">${ssrInterpolate(t.points > 0 ? "+" : "")}${ssrInterpolate(t.points)}</span></div>`);
          });
          _push(`<!--]--></div>`);
        }
        _push(`</div>`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/account/loyalty.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=loyalty-oJ7u6kvF.mjs.map
