import { _ as _sfc_main$1 } from './EmptyState-DTWoF1UD.mjs';
import { defineComponent, ref, reactive, withAsyncContext, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrInterpolate, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderAttr } from 'vue/server-renderer';
import { u as useAsyncData } from './asyncData-DBk6s2t8.mjs';
import { u as useApi } from './useApi-BXP922BC.mjs';
import './nuxt-link-B2doaXW1.mjs';
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
import './auth-rbnhynP_.mjs';
import './ui-CDZkXfd4.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "addresses",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const showForm = ref(false);
    const form = reactive({ type: "home", street: "", city: "", postal_code: "", country: "VN", is_default: false });
    const { data: addresses, refresh } = ([__temp, __restore] = withAsyncContext(() => useAsyncData("addresses", () => useApi()("crm/v1/addresses"))), __temp = await __temp, __restore(), __temp);
    return (_ctx, _push, _parent, _attrs) => {
      var _a;
      const _component_UiEmptyState = _sfc_main$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "bg-white rounded-xl border p-6 space-y-5" }, _attrs))}><div class="flex items-center justify-between"><h1 class="text-xl font-bold">S\u1ED5 \u0111\u1ECBa ch\u1EC9</h1><button class="text-sm bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700">+ Th\xEAm \u0111\u1ECBa ch\u1EC9</button></div>`);
      if (!((_a = unref(addresses)) == null ? void 0 : _a.length)) {
        _push(ssrRenderComponent(_component_UiEmptyState, {
          icon: "\u{1F4CD}",
          title: "Ch\u01B0a c\xF3 \u0111\u1ECBa ch\u1EC9",
          message: "Th\xEAm \u0111\u1ECBa ch\u1EC9 \u0111\u1EC3 thanh to\xE1n nhanh h\u01A1n"
        }, null, _parent));
      } else {
        _push(`<div class="space-y-3"><!--[-->`);
        ssrRenderList(unref(addresses), (a) => {
          _push(`<div class="border rounded-xl p-4 flex justify-between items-start"><div class="text-sm"><p class="font-semibold">${ssrInterpolate(a.type === "home" ? "\u{1F3E0} Nh\xE0" : a.type === "work" ? "\u{1F3E2} C\xF4ng ty" : "\u{1F4CD} Kh\xE1c")}</p><p class="text-gray-600 mt-1">${ssrInterpolate(a.street)}, ${ssrInterpolate(a.city)}</p>`);
          if (a.is_default) {
            _push(`<span class="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full mt-1 inline-block">M\u1EB7c \u0111\u1ECBnh</span>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div><button class="text-xs text-red-500 hover:underline">X\xF3a</button></div>`);
        });
        _push(`<!--]--></div>`);
      }
      if (unref(showForm)) {
        _push(`<div class="fixed inset-0 bg-black/40 z-50 flex items-center justify-center"><div class="bg-white rounded-xl p-6 w-full max-w-md space-y-4"><h2 class="font-bold">Th\xEAm \u0111\u1ECBa ch\u1EC9 m\u1EDBi</h2><select class="w-full border rounded-lg px-3 py-2 text-sm"><option value="home"${ssrIncludeBooleanAttr(Array.isArray(unref(form).type) ? ssrLooseContain(unref(form).type, "home") : ssrLooseEqual(unref(form).type, "home")) ? " selected" : ""}>Nh\xE0 ri\xEAng</option><option value="work"${ssrIncludeBooleanAttr(Array.isArray(unref(form).type) ? ssrLooseContain(unref(form).type, "work") : ssrLooseEqual(unref(form).type, "work")) ? " selected" : ""}>C\xF4ng ty</option><option value="other"${ssrIncludeBooleanAttr(Array.isArray(unref(form).type) ? ssrLooseContain(unref(form).type, "other") : ssrLooseEqual(unref(form).type, "other")) ? " selected" : ""}>Kh\xE1c</option></select><input${ssrRenderAttr("value", unref(form).street)} placeholder="S\u1ED1 nh\xE0, t\xEAn \u0111\u01B0\u1EDDng *" class="w-full border rounded-lg px-3 py-2 text-sm"><input${ssrRenderAttr("value", unref(form).city)} placeholder="Th\xE0nh ph\u1ED1 *" class="w-full border rounded-lg px-3 py-2 text-sm"><input${ssrRenderAttr("value", unref(form).postal_code)} placeholder="M\xE3 b\u01B0u ch\xEDnh" class="w-full border rounded-lg px-3 py-2 text-sm"><div class="flex gap-3"><button class="flex-1 border rounded-lg py-2 text-sm">H\u1EE7y</button><button class="flex-1 bg-indigo-600 text-white rounded-lg py-2 text-sm hover:bg-indigo-700">L\u01B0u</button></div></div></div>`);
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

export { _sfc_main as default };
//# sourceMappingURL=addresses-lPfUU5Zn.mjs.map
