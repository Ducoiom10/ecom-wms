import { _ as __nuxt_component_0 } from './nuxt-link-B2doaXW1.mjs';
import { defineComponent, ref, withAsyncContext, mergeProps, withCtx, createTextVNode, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderClass, ssrIncludeBooleanAttr, ssrRenderList, ssrRenderAttr } from 'vue/server-renderer';
import { u as useRoute } from './server.mjs';
import { u as useUiStore } from './ui-CDZkXfd4.mjs';
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
  __name: "index",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const route = useRoute();
    useUiStore();
    const cancelling = ref(false);
    const { data: order, pending, refresh } = ([__temp, __restore] = withAsyncContext(() => useAsyncData(
      `order-detail-${route.params.id}`,
      () => useOrderApi().getOrder(Number(route.params.id))
    )), __temp = await __temp, __restore(), __temp);
    const fmt = (n) => new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(n);
    const fmtDate = (d) => new Date(d).toLocaleString("vi-VN", { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" });
    const isCancellable = (status) => ["pending", "approved", "picking", "picked", "packed"].includes(status != null ? status : "");
    const statusLabel = (s) => {
      var _a;
      return (_a = {
        pending: "Ch\u1EDD x\xE1c nh\u1EADn",
        approved: "\u0110\xE3 duy\u1EC7t",
        picking: "\u0110ang l\u1EA5y h\xE0ng",
        packed: "\u0110\xF3ng g\xF3i",
        shipped: "\u0110ang giao",
        delivered: "\u0110\xE3 giao",
        cancelled: "\u0110\xE3 h\u1EE7y"
      }[s != null ? s : ""]) != null ? _a : s;
    };
    const statusClass = (s) => {
      var _a;
      return (_a = {
        delivered: "bg-green-100 text-green-700",
        shipped: "bg-blue-100 text-blue-700",
        cancelled: "bg-red-100 text-red-700"
      }[s != null ? s : ""]) != null ? _a : "bg-gray-100 text-gray-600";
    };
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r, _s, _t, _u, _v, _w;
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "bg-white rounded-xl border p-6 space-y-6" }, _attrs))}><div class="flex items-center justify-between"><div>`);
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
      _push(`<h1 class="text-xl font-bold mt-1">\u0110\u01A1n h\xE0ng #${ssrInterpolate((_a = unref(order)) == null ? void 0 : _a.id)}</h1></div><div class="flex items-center gap-3"><span class="${ssrRenderClass([statusClass((_b = unref(order)) == null ? void 0 : _b.status), "px-3 py-1 rounded-full text-sm font-medium"])}">${ssrInterpolate(statusLabel((_c = unref(order)) == null ? void 0 : _c.status))}</span>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: `/account/orders/${unref(route).params.id}/tracking`,
        class: "text-sm border border-indigo-500 text-indigo-600 px-3 py-1.5 rounded-lg hover:bg-indigo-50"
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
        _: 1
      }, _parent));
      if (unref(order) && isCancellable(unref(order).status)) {
        _push(`<button${ssrIncludeBooleanAttr(unref(cancelling)) ? " disabled" : ""} class="text-sm border border-red-400 text-red-500 px-3 py-1.5 rounded-lg hover:bg-red-50 disabled:opacity-50">${ssrInterpolate(unref(cancelling) ? "\u0110ang h\u1EE7y..." : "H\u1EE7y \u0111\u01A1n")}</button>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div>`);
      if (unref(pending)) {
        _push(`<div class="space-y-3"><!--[-->`);
        ssrRenderList(3, (i) => {
          _push(`<div class="h-20 bg-gray-100 rounded-lg animate-pulse"></div>`);
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<div class="border rounded-xl overflow-hidden"><div class="px-4 py-3 bg-gray-50 border-b"><h2 class="font-semibold text-sm text-gray-600 uppercase tracking-wide">S\u1EA3n ph\u1EA9m</h2></div><div class="divide-y"><!--[-->`);
        ssrRenderList((_d = unref(order)) == null ? void 0 : _d.items, (item) => {
          var _a2, _b2, _c2, _d2, _e2, _f2, _g2;
          _push(`<div class="flex items-center gap-4 px-4 py-3"><div class="w-14 h-14 bg-gray-100 rounded-lg flex-shrink-0 overflow-hidden">`);
          if ((_c2 = (_b2 = (_a2 = item.product) == null ? void 0 : _a2.productImages) == null ? void 0 : _b2[0]) == null ? void 0 : _c2.image_url) {
            _push(`<img${ssrRenderAttr("src", item.product.productImages[0].image_url)} class="w-full h-full object-cover">`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div><div class="flex-1 min-w-0"><p class="font-medium text-sm truncate">${ssrInterpolate((_e2 = (_d2 = item.product) == null ? void 0 : _d2.name) != null ? _e2 : `S\u1EA3n ph\u1EA9m #${item.product_id}`)}</p><p class="text-xs text-gray-400 mt-0.5">SKU: ${ssrInterpolate((_g2 = (_f2 = item.product) == null ? void 0 : _f2.sku) != null ? _g2 : "\u2014")}</p></div><div class="text-right flex-shrink-0"><p class="text-sm text-gray-500">\xD7 ${ssrInterpolate(item.quantity)}</p><p class="font-semibold text-sm">${ssrInterpolate(fmt(item.unit_price * item.quantity))}</p></div></div>`);
        });
        _push(`<!--]--></div></div>`);
      }
      _push(`<div class="grid grid-cols-1 md:grid-cols-2 gap-4"><div class="border rounded-xl p-4 space-y-2 text-sm"><h2 class="font-semibold text-gray-600 uppercase tracking-wide text-xs mb-3">T\u1ED5ng ti\u1EC1n</h2><div class="flex justify-between text-gray-600"><span>T\u1EA1m t\xEDnh</span><span>${ssrInterpolate(fmt((_f = (_e = unref(order)) == null ? void 0 : _e.subtotal) != null ? _f : 0))}</span></div><div class="flex justify-between text-gray-600"><span>V\u1EADn chuy\u1EC3n</span><span>${ssrInterpolate(fmt((_h = (_g = unref(order)) == null ? void 0 : _g.shipping) != null ? _h : 0))}</span></div><div class="flex justify-between text-gray-600"><span>Thu\u1EBF</span><span>${ssrInterpolate(fmt((_j = (_i = unref(order)) == null ? void 0 : _i.tax) != null ? _j : 0))}</span></div>`);
      if (((_l = (_k = unref(order)) == null ? void 0 : _k.discount) != null ? _l : 0) > 0) {
        _push(`<div class="flex justify-between text-green-600"><span>Gi\u1EA3m gi\xE1</span><span>-${ssrInterpolate(fmt((_n = (_m = unref(order)) == null ? void 0 : _m.discount) != null ? _n : 0))}</span></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="flex justify-between font-bold text-base pt-2 border-t"><span>T\u1ED5ng c\u1ED9ng</span><span class="text-red-600">${ssrInterpolate(fmt((_p = (_o = unref(order)) == null ? void 0 : _o.total) != null ? _p : 0))}</span></div></div><div class="border rounded-xl p-4 space-y-2 text-sm"><h2 class="font-semibold text-gray-600 uppercase tracking-wide text-xs mb-3">Th\xF4ng tin giao h\xE0ng</h2><p class="text-gray-700">${ssrInterpolate((_r = (_q = unref(order)) == null ? void 0 : _q.delivery_address) != null ? _r : "\u2014")}</p>`);
      if ((_s = unref(order)) == null ? void 0 : _s.coupon_code) {
        _push(`<div class="flex items-center gap-2 mt-2"><span class="text-gray-500">M\xE3 gi\u1EA3m gi\xE1:</span><span class="bg-green-100 text-green-700 px-2 py-0.5 rounded text-xs font-mono">${ssrInterpolate(unref(order).coupon_code)}</span></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="pt-2 border-t space-y-1 text-xs text-gray-400"><p>\u0110\u1EB7t l\xFAc: ${ssrInterpolate(((_t = unref(order)) == null ? void 0 : _t.created_at) ? fmtDate(unref(order).created_at) : "\u2014")}</p>`);
      if ((_u = unref(order)) == null ? void 0 : _u.approved_at) {
        _push(`<p>Duy\u1EC7t l\xFAc: ${ssrInterpolate(fmtDate(unref(order).approved_at))}</p>`);
      } else {
        _push(`<!---->`);
      }
      if ((_v = unref(order)) == null ? void 0 : _v.shipped_at) {
        _push(`<p>Giao l\xFAc: ${ssrInterpolate(fmtDate(unref(order).shipped_at))}</p>`);
      } else {
        _push(`<!---->`);
      }
      if ((_w = unref(order)) == null ? void 0 : _w.delivered_at) {
        _push(`<p>Nh\u1EADn l\xFAc: ${ssrInterpolate(fmtDate(unref(order).delivered_at))}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/account/orders/[id]/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-6dZTdm7p.mjs.map
