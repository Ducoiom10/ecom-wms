import { _ as __nuxt_component_0 } from './nuxt-link-B2doaXW1.mjs';
import { defineComponent, withAsyncContext, computed, mergeProps, withCtx, createTextVNode, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderClass } from 'vue/server-renderer';
import { u as useRoute } from './server.mjs';
import { u as useAsyncData } from './asyncData-DBk6s2t8.mjs';
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
  __name: "tracking",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const route = useRoute();
    const { data: tracking } = ([__temp, __restore] = withAsyncContext(() => useAsyncData(
      `tracking-${route.params.id}`,
      () => useOrderApi().getTracking(Number(route.params.id))
    )), __temp = await __temp, __restore(), __temp);
    const statusOrder = ["pending", "approved", "picking", "packed", "shipped", "delivered"];
    const stepNames = ["\u0110\u1EB7t h\xE0ng", "X\xE1c nh\u1EADn", "\u0110ang l\u1EA5y h\xE0ng", "\u0110\xF3ng g\xF3i", "\u0110ang giao", "\u0110\xE3 giao"];
    const steps = computed(() => statusOrder.map((id, i) => {
      var _a, _b;
      return {
        id,
        name: stepNames[i],
        date: (_b = (_a = tracking.value) == null ? void 0 : _a[`${id}_at`]) != null ? _b : null
      };
    }));
    const currentIdx = computed(() => {
      var _a, _b;
      return statusOrder.indexOf((_b = (_a = tracking.value) == null ? void 0 : _a.status) != null ? _b : "pending");
    });
    const fmtDate = (d) => new Date(d).toLocaleString("vi-VN", { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" });
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b, _c, _d, _e, _f;
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "max-w-3xl mx-auto py-10 px-4 space-y-8" }, _attrs))}><div>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/account/orders",
        class: "text-sm text-indigo-600 hover:underline"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`\u2190 \u0110\u01A1n h\xE0ng c\u1EE7a t\xF4i`);
          } else {
            return [
              createTextVNode("\u2190 \u0110\u01A1n h\xE0ng c\u1EE7a t\xF4i")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<h1 class="text-2xl font-bold mt-2">V\u1EADn tr\xECnh \u0111\u01A1n #${ssrInterpolate((_a = unref(tracking)) == null ? void 0 : _a.order_id)}</h1></div><div class="grid grid-cols-1 md:grid-cols-2 gap-8"><div><h2 class="font-semibold mb-4">Tr\u1EA1ng th\xE1i \u0111\u01A1n h\xE0ng</h2><div class="space-y-0"><!--[-->`);
      ssrRenderList(unref(steps), (s, i) => {
        _push(`<div class="flex gap-4"><div class="flex flex-col items-center"><div class="${ssrRenderClass([i <= unref(currentIdx) ? "bg-indigo-600 text-white" : "bg-gray-200 text-gray-400", "w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition"])}">`);
        if (i < unref(currentIdx)) {
          _push(`<span>\u2713</span>`);
        } else {
          _push(`<span>${ssrInterpolate(i + 1)}</span>`);
        }
        _push(`</div>`);
        if (i < unref(steps).length - 1) {
          _push(`<div class="${ssrRenderClass([i < unref(currentIdx) ? "bg-indigo-600" : "bg-gray-200", "w-0.5 h-8"])}"></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><div class="pb-6 pt-1"><p class="${ssrRenderClass([i <= unref(currentIdx) ? "text-gray-900" : "text-gray-400", "font-semibold text-sm"])}">${ssrInterpolate(s.name)}</p><p class="text-xs text-gray-400 mt-0.5">${ssrInterpolate(s.date ? fmtDate(s.date) : "Ch\u1EDD x\u1EED l\xFD")}</p></div></div>`);
      });
      _push(`<!--]--></div></div><div class="bg-gray-50 rounded-xl p-5 space-y-4 text-sm"><h2 class="font-semibold">Th\xF4ng tin v\u1EADn chuy\u1EC3n</h2><div class="grid grid-cols-2 gap-3"><div><p class="text-gray-400">Tr\u1EA1ng th\xE1i</p><span class="px-2 py-0.5 rounded text-xs font-medium bg-indigo-100 text-indigo-700">${ssrInterpolate((_b = unref(tracking)) == null ? void 0 : _b.status)}</span></div><div><p class="text-gray-400">\u0110\u1ECBa ch\u1EC9 giao</p><p class="font-medium">${ssrInterpolate((_d = (_c = unref(tracking)) == null ? void 0 : _c.delivery_address) != null ? _d : "\u2014")}</p></div><div><p class="text-gray-400">Ng\xE0y duy\u1EC7t</p><p class="font-medium">${ssrInterpolate(((_e = unref(tracking)) == null ? void 0 : _e.approved_at) ? fmtDate(unref(tracking).approved_at) : "\u2014")}</p></div><div><p class="text-gray-400">Ng\xE0y giao</p><p class="font-medium">${ssrInterpolate(((_f = unref(tracking)) == null ? void 0 : _f.delivered_at) ? fmtDate(unref(tracking).delivered_at) : "\u2014")}</p></div></div></div></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/account/orders/[id]/tracking.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=tracking-BlRfvIwK.mjs.map
