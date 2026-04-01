import { _ as __nuxt_component_0 } from './nuxt-link-B2doaXW1.mjs';
import { defineComponent, reactive, ref, mergeProps, unref, withCtx, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrInterpolate, ssrIncludeBooleanAttr, ssrRenderComponent } from 'vue/server-renderer';
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
  __name: "login",
  __ssrInlineRender: true,
  setup(__props) {
    const authStore = useAuthStore();
    const form = reactive({ email: "", password: "" });
    const error = ref("");
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen flex items-center justify-center bg-gray-50" }, _attrs))}><div class="w-full max-w-md bg-white rounded-xl shadow p-8"><h1 class="text-2xl font-bold mb-6 text-center">\u0110\u0103ng nh\u1EADp</h1><form class="space-y-4"><div><label class="block text-sm font-medium mb-1">Email</label><input${ssrRenderAttr("value", unref(form).email)} type="email" required class="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"></div><div><label class="block text-sm font-medium mb-1">M\u1EADt kh\u1EA9u</label><input${ssrRenderAttr("value", unref(form).password)} type="password" required class="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"></div>`);
      if (unref(error)) {
        _push(`<p class="text-red-600 text-sm">${ssrInterpolate(unref(error))}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<button type="submit"${ssrIncludeBooleanAttr(unref(authStore).loading) ? " disabled" : ""} class="w-full bg-indigo-600 text-white py-2.5 rounded-lg font-semibold hover:bg-indigo-700 disabled:opacity-50">${ssrInterpolate(unref(authStore).loading ? "\u0110ang \u0111\u0103ng nh\u1EADp..." : "\u0110\u0103ng nh\u1EADp")}</button><p class="text-center text-sm text-gray-500">Ch\u01B0a c\xF3 t\xE0i kho\u1EA3n? `);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/register",
        class: "text-indigo-600 hover:underline"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`\u0110\u0103ng k\xFD`);
          } else {
            return [
              createTextVNode("\u0110\u0103ng k\xFD")
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/login.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=login-D_PYvHiS.mjs.map
