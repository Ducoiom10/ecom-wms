import { _ as _sfc_main$1 } from './EmptyState-DTWoF1UD.mjs';
import { _ as __nuxt_component_0 } from './nuxt-link-B2doaXW1.mjs';
import { defineComponent, ref, withAsyncContext, computed, mergeProps, unref, withCtx, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderList, ssrRenderComponent, ssrInterpolate, ssrRenderClass } from 'vue/server-renderer';
import { u as useAsyncData } from './asyncData-DBk6s2t8.mjs';
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
  __name: "orders",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const filter = ref("");
    const { data: orders, pending } = ([__temp, __restore] = withAsyncContext(() => useAsyncData("my-orders", () => useOrderApi().getOrders(1, 50))), __temp = await __temp, __restore(), __temp);
    const filtered = computed(() => {
      var _a, _b;
      const list = (_b = (_a = orders.value) == null ? void 0 : _a.data) != null ? _b : [];
      return filter.value ? list.filter((o) => o.status === filter.value) : list;
    });
    const statusLabel = (s) => {
      var _a;
      return (_a = { pending: "Ch\u1EDD x\xE1c nh\u1EADn", approved: "\u0110\xE3 duy\u1EC7t", picking: "\u0110ang l\u1EA5y", packed: "\u0110\xF3ng g\xF3i", shipped: "\u0110ang giao", delivered: "\u0110\xE3 giao", cancelled: "\u0110\xE3 h\u1EE7y" }[s]) != null ? _a : s;
    };
    const statusClass = (s) => {
      var _a;
      return (_a = { delivered: "bg-green-100 text-green-700", shipped: "bg-blue-100 text-blue-700", cancelled: "bg-red-100 text-red-700" }[s]) != null ? _a : "bg-gray-100 text-gray-600";
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UiEmptyState = _sfc_main$1;
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "bg-white rounded-xl border p-6 space-y-5" }, _attrs))}><div class="flex items-center justify-between"><h1 class="text-xl font-bold">\u0110\u01A1n h\xE0ng c\u1EE7a t\xF4i</h1><select class="border rounded-lg px-3 py-1.5 text-sm"><option value=""${ssrIncludeBooleanAttr(Array.isArray(unref(filter)) ? ssrLooseContain(unref(filter), "") : ssrLooseEqual(unref(filter), "")) ? " selected" : ""}>T\u1EA5t c\u1EA3</option><option value="pending"${ssrIncludeBooleanAttr(Array.isArray(unref(filter)) ? ssrLooseContain(unref(filter), "pending") : ssrLooseEqual(unref(filter), "pending")) ? " selected" : ""}>Ch\u1EDD x\xE1c nh\u1EADn</option><option value="shipped"${ssrIncludeBooleanAttr(Array.isArray(unref(filter)) ? ssrLooseContain(unref(filter), "shipped") : ssrLooseEqual(unref(filter), "shipped")) ? " selected" : ""}>\u0110ang giao</option><option value="delivered"${ssrIncludeBooleanAttr(Array.isArray(unref(filter)) ? ssrLooseContain(unref(filter), "delivered") : ssrLooseEqual(unref(filter), "delivered")) ? " selected" : ""}>\u0110\xE3 giao</option><option value="cancelled"${ssrIncludeBooleanAttr(Array.isArray(unref(filter)) ? ssrLooseContain(unref(filter), "cancelled") : ssrLooseEqual(unref(filter), "cancelled")) ? " selected" : ""}>\u0110\xE3 h\u1EE7y</option></select></div>`);
      if (unref(pending)) {
        _push(`<div class="space-y-3"><!--[-->`);
        ssrRenderList(3, (i) => {
          _push(`<div class="h-24 bg-gray-100 rounded-lg animate-pulse"></div>`);
        });
        _push(`<!--]--></div>`);
      } else if (!unref(filtered).length) {
        _push(ssrRenderComponent(_component_UiEmptyState, {
          icon: "\u{1F4E6}",
          title: "Ch\u01B0a c\xF3 \u0111\u01A1n h\xE0ng",
          message: "H\xE3y mua s\u1EAFm ngay!",
          "action-link": "/category",
          "action-label": "Kh\xE1m ph\xE1 s\u1EA3n ph\u1EA9m"
        }, null, _parent));
      } else {
        _push(`<div class="space-y-3"><!--[-->`);
        ssrRenderList(unref(filtered), (o) => {
          _push(`<div class="border rounded-xl p-4 hover:shadow-sm transition"><div class="flex justify-between items-start mb-3"><div><p class="font-semibold">#${ssrInterpolate(o.id)}</p><p class="text-xs text-gray-400">${ssrInterpolate(new Date(o.created_at).toLocaleDateString("vi-VN"))}</p></div><span class="${ssrRenderClass([statusClass(o.status), "px-2 py-0.5 rounded-full text-xs font-medium"])}">${ssrInterpolate(statusLabel(o.status))}</span></div><div class="flex gap-2 mt-3">`);
          _push(ssrRenderComponent(_component_NuxtLink, {
            to: `/account/orders/${o.id}/tracking`,
            class: "text-xs border border-indigo-500 text-indigo-600 px-3 py-1.5 rounded-lg hover:bg-indigo-50"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(` V\u1EADn tr\xECnh `);
              } else {
                return [
                  createTextVNode(" V\u1EADn tr\xECnh ")
                ];
              }
            }),
            _: 2
          }, _parent));
          _push(`<span class="ml-auto font-bold text-sm text-red-600">${ssrInterpolate(new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(o.total))}</span></div></div>`);
        });
        _push(`<!--]--></div>`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/account/orders.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=orders-JQx7P-wa.mjs.map
