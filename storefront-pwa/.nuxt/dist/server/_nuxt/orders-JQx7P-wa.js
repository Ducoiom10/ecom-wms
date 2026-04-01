import { _ as _sfc_main$1 } from "./EmptyState-DTWoF1UD.js";
import { _ as __nuxt_component_0 } from "./nuxt-link-B2doaXW1.js";
import { defineComponent, ref, withAsyncContext, computed, mergeProps, unref, withCtx, createTextVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderList, ssrRenderComponent, ssrInterpolate, ssrRenderClass } from "vue/server-renderer";
import "C:/laragon/www/ecom-wms/storefront-pwa/node_modules/hookable/dist/index.mjs";
import { u as useAsyncData } from "./asyncData-DBk6s2t8.js";
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
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "orders",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const filter = ref("");
    const { data: orders, pending } = ([__temp, __restore] = withAsyncContext(() => useAsyncData("my-orders", () => useOrderApi().getOrders(1, 50))), __temp = await __temp, __restore(), __temp);
    const filtered = computed(() => {
      const list = orders.value?.data ?? [];
      return filter.value ? list.filter((o) => o.status === filter.value) : list;
    });
    const statusLabel = (s) => ({ pending: "Chờ xác nhận", approved: "Đã duyệt", picking: "Đang lấy", packed: "Đóng gói", shipped: "Đang giao", delivered: "Đã giao", cancelled: "Đã hủy" })[s] ?? s;
    const statusClass = (s) => ({ delivered: "bg-green-100 text-green-700", shipped: "bg-blue-100 text-blue-700", cancelled: "bg-red-100 text-red-700" })[s] ?? "bg-gray-100 text-gray-600";
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UiEmptyState = _sfc_main$1;
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "bg-white rounded-xl border p-6 space-y-5" }, _attrs))}><div class="flex items-center justify-between"><h1 class="text-xl font-bold">Đơn hàng của tôi</h1><select class="border rounded-lg px-3 py-1.5 text-sm"><option value=""${ssrIncludeBooleanAttr(Array.isArray(unref(filter)) ? ssrLooseContain(unref(filter), "") : ssrLooseEqual(unref(filter), "")) ? " selected" : ""}>Tất cả</option><option value="pending"${ssrIncludeBooleanAttr(Array.isArray(unref(filter)) ? ssrLooseContain(unref(filter), "pending") : ssrLooseEqual(unref(filter), "pending")) ? " selected" : ""}>Chờ xác nhận</option><option value="shipped"${ssrIncludeBooleanAttr(Array.isArray(unref(filter)) ? ssrLooseContain(unref(filter), "shipped") : ssrLooseEqual(unref(filter), "shipped")) ? " selected" : ""}>Đang giao</option><option value="delivered"${ssrIncludeBooleanAttr(Array.isArray(unref(filter)) ? ssrLooseContain(unref(filter), "delivered") : ssrLooseEqual(unref(filter), "delivered")) ? " selected" : ""}>Đã giao</option><option value="cancelled"${ssrIncludeBooleanAttr(Array.isArray(unref(filter)) ? ssrLooseContain(unref(filter), "cancelled") : ssrLooseEqual(unref(filter), "cancelled")) ? " selected" : ""}>Đã hủy</option></select></div>`);
      if (unref(pending)) {
        _push(`<div class="space-y-3"><!--[-->`);
        ssrRenderList(3, (i) => {
          _push(`<div class="h-24 bg-gray-100 rounded-lg animate-pulse"></div>`);
        });
        _push(`<!--]--></div>`);
      } else if (!unref(filtered).length) {
        _push(ssrRenderComponent(_component_UiEmptyState, {
          icon: "📦",
          title: "Chưa có đơn hàng",
          message: "Hãy mua sắm ngay!",
          "action-link": "/category",
          "action-label": "Khám phá sản phẩm"
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
                _push2(` Vận trình `);
              } else {
                return [
                  createTextVNode(" Vận trình ")
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
export {
  _sfc_main as default
};
//# sourceMappingURL=orders-JQx7P-wa.js.map
