import { _ as _sfc_main$1 } from "./EmptyState-DTWoF1UD.js";
import { defineComponent, withAsyncContext, mergeProps, unref, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrInterpolate, ssrRenderComponent, ssrRenderList, ssrRenderClass } from "vue/server-renderer";
import "C:/laragon/www/ecom-wms/storefront-pwa/node_modules/hookable/dist/index.mjs";
import { u as useAsyncData } from "./asyncData-DBk6s2t8.js";
import { u as useApi } from "./useApi-BXP922BC.js";
import "./nuxt-link-B2doaXW1.js";
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
import "C:/laragon/www/ecom-wms/storefront-pwa/node_modules/perfect-debounce/dist/index.mjs";
import "./auth-rbnhynP_.js";
import "./ui-CDZkXfd4.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "loyalty",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const { data: loyalty, pending } = ([__temp, __restore] = withAsyncContext(() => useAsyncData("loyalty", () => useApi()("crm/v1/loyalty/benefits"))), __temp = await __temp, __restore(), __temp);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UiEmptyState = _sfc_main$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "bg-white rounded-xl border p-6 space-y-5" }, _attrs))}><h1 class="text-xl font-bold">Điểm thưởng</h1>`);
      if (unref(pending)) {
        _push(`<div class="h-32 bg-gray-100 rounded-lg animate-pulse"></div>`);
      } else {
        _push(`<div><div class="bg-indigo-50 rounded-xl p-5 flex items-center justify-between mb-6"><div><p class="text-sm text-gray-500">Điểm hiện tại</p><p class="text-4xl font-bold text-indigo-600">${ssrInterpolate(unref(loyalty)?.points ?? 0)}</p></div><span class="text-5xl">⭐</span></div><h2 class="font-semibold mb-3 text-sm text-gray-500 uppercase tracking-wide">Lịch sử điểm</h2>`);
        if (!unref(loyalty)?.transactions?.length) {
          _push(ssrRenderComponent(_component_UiEmptyState, {
            icon: "⭐",
            title: "Chưa có giao dịch điểm",
            message: "Mua hàng để tích điểm thưởng"
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
export {
  _sfc_main as default
};
//# sourceMappingURL=loyalty-oJ7u6kvF.js.map
