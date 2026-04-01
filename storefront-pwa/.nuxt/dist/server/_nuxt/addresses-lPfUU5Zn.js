import { _ as _sfc_main$1 } from "./EmptyState-DTWoF1UD.js";
import { defineComponent, ref, reactive, withAsyncContext, mergeProps, unref, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrInterpolate, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderAttr } from "vue/server-renderer";
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
  __name: "addresses",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const showForm = ref(false);
    const form = reactive({ type: "home", street: "", city: "", postal_code: "", country: "VN", is_default: false });
    const { data: addresses, refresh } = ([__temp, __restore] = withAsyncContext(() => useAsyncData("addresses", () => useApi()("crm/v1/addresses"))), __temp = await __temp, __restore(), __temp);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UiEmptyState = _sfc_main$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "bg-white rounded-xl border p-6 space-y-5" }, _attrs))}><div class="flex items-center justify-between"><h1 class="text-xl font-bold">Sổ địa chỉ</h1><button class="text-sm bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700">+ Thêm địa chỉ</button></div>`);
      if (!unref(addresses)?.length) {
        _push(ssrRenderComponent(_component_UiEmptyState, {
          icon: "📍",
          title: "Chưa có địa chỉ",
          message: "Thêm địa chỉ để thanh toán nhanh hơn"
        }, null, _parent));
      } else {
        _push(`<div class="space-y-3"><!--[-->`);
        ssrRenderList(unref(addresses), (a) => {
          _push(`<div class="border rounded-xl p-4 flex justify-between items-start"><div class="text-sm"><p class="font-semibold">${ssrInterpolate(a.type === "home" ? "🏠 Nhà" : a.type === "work" ? "🏢 Công ty" : "📍 Khác")}</p><p class="text-gray-600 mt-1">${ssrInterpolate(a.street)}, ${ssrInterpolate(a.city)}</p>`);
          if (a.is_default) {
            _push(`<span class="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full mt-1 inline-block">Mặc định</span>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div><button class="text-xs text-red-500 hover:underline">Xóa</button></div>`);
        });
        _push(`<!--]--></div>`);
      }
      if (unref(showForm)) {
        _push(`<div class="fixed inset-0 bg-black/40 z-50 flex items-center justify-center"><div class="bg-white rounded-xl p-6 w-full max-w-md space-y-4"><h2 class="font-bold">Thêm địa chỉ mới</h2><select class="w-full border rounded-lg px-3 py-2 text-sm"><option value="home"${ssrIncludeBooleanAttr(Array.isArray(unref(form).type) ? ssrLooseContain(unref(form).type, "home") : ssrLooseEqual(unref(form).type, "home")) ? " selected" : ""}>Nhà riêng</option><option value="work"${ssrIncludeBooleanAttr(Array.isArray(unref(form).type) ? ssrLooseContain(unref(form).type, "work") : ssrLooseEqual(unref(form).type, "work")) ? " selected" : ""}>Công ty</option><option value="other"${ssrIncludeBooleanAttr(Array.isArray(unref(form).type) ? ssrLooseContain(unref(form).type, "other") : ssrLooseEqual(unref(form).type, "other")) ? " selected" : ""}>Khác</option></select><input${ssrRenderAttr("value", unref(form).street)} placeholder="Số nhà, tên đường *" class="w-full border rounded-lg px-3 py-2 text-sm"><input${ssrRenderAttr("value", unref(form).city)} placeholder="Thành phố *" class="w-full border rounded-lg px-3 py-2 text-sm"><input${ssrRenderAttr("value", unref(form).postal_code)} placeholder="Mã bưu chính" class="w-full border rounded-lg px-3 py-2 text-sm"><div class="flex gap-3"><button class="flex-1 border rounded-lg py-2 text-sm">Hủy</button><button class="flex-1 bg-indigo-600 text-white rounded-lg py-2 text-sm hover:bg-indigo-700">Lưu</button></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/account/addresses.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=addresses-lPfUU5Zn.js.map
