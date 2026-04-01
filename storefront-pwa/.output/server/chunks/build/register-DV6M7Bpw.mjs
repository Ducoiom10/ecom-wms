import { _ as __nuxt_component_0 } from './nuxt-link-B2doaXW1.mjs';
import { defineComponent, ref, reactive, mergeProps, unref, withCtx, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrInterpolate, ssrIncludeBooleanAttr, ssrRenderComponent } from 'vue/server-renderer';
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
  __name: "register",
  __ssrInlineRender: true,
  setup(__props) {
    const loading = ref(false);
    const error = ref("");
    const form = reactive({ name: "", email: "", password: "", password_confirmation: "" });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen flex items-center justify-center bg-gray-50 px-4" }, _attrs))}><div class="w-full max-w-md bg-white rounded-xl shadow p-8 space-y-5"><h1 class="text-2xl font-bold text-center">T\u1EA1o t\xE0i kho\u1EA3n</h1><form class="space-y-4"><div><label class="block text-sm font-medium mb-1">H\u1ECD t\xEAn</label><input${ssrRenderAttr("value", unref(form).name)} required class="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-400 focus:outline-none"></div><div><label class="block text-sm font-medium mb-1">Email</label><input${ssrRenderAttr("value", unref(form).email)} type="email" required class="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-400 focus:outline-none"></div><div><label class="block text-sm font-medium mb-1">M\u1EADt kh\u1EA9u</label><input${ssrRenderAttr("value", unref(form).password)} type="password" required minlength="8" class="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-400 focus:outline-none"></div><div><label class="block text-sm font-medium mb-1">X\xE1c nh\u1EADn m\u1EADt kh\u1EA9u</label><input${ssrRenderAttr("value", unref(form).password_confirmation)} type="password" required class="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-400 focus:outline-none"></div>`);
      if (unref(error)) {
        _push(`<p class="text-red-600 text-sm">${ssrInterpolate(unref(error))}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<button type="submit"${ssrIncludeBooleanAttr(unref(loading)) ? " disabled" : ""} class="w-full bg-indigo-600 text-white py-2.5 rounded-lg font-semibold hover:bg-indigo-700 disabled:opacity-50">${ssrInterpolate(unref(loading) ? "\u0110ang x\u1EED l\xFD..." : "\u0110\u0103ng k\xFD")}</button><p class="text-center text-sm text-gray-500"> \u0110\xE3 c\xF3 t\xE0i kho\u1EA3n? `);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/login",
        class: "text-indigo-600 hover:underline"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`\u0110\u0103ng nh\u1EADp`);
          } else {
            return [
              createTextVNode("\u0110\u0103ng nh\u1EADp")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</p></form></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/register.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=register-DV6M7Bpw.mjs.map
