import { _ as __nuxt_component_0 } from "./nuxt-link-B2doaXW1.js";
import { defineComponent, ref, withAsyncContext, mergeProps, withCtx, createTextVNode, unref, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderClass, ssrIncludeBooleanAttr, ssrRenderList, ssrRenderAttr } from "vue/server-renderer";
import "C:/laragon/www/ecom-wms/storefront-pwa/node_modules/hookable/dist/index.mjs";
import { u as useRoute } from "../server.mjs";
import { u as useUiStore } from "./ui-CDZkXfd4.js";
import { u as useAsyncData } from "./asyncData-DBk6s2t8.js";
import "C:/laragon/www/ecom-wms/storefront-pwa/node_modules/defu/dist/defu.mjs";
import "C:/laragon/www/ecom-wms/storefront-pwa/node_modules/ofetch/dist/node.mjs";
import "#internal/nuxt/paths";
import "C:/laragon/www/ecom-wms/storefront-pwa/node_modules/unctx/dist/index.mjs";
import "C:/laragon/www/ecom-wms/storefront-pwa/node_modules/h3/dist/index.mjs";
import "pinia";
import "vue-router";
import "C:/laragon/www/ecom-wms/storefront-pwa/node_modules/klona/dist/index.mjs";
import "C:/laragon/www/ecom-wms/storefront-pwa/node_modules/nuxt/node_modules/cookie-es/dist/index.mjs";
import "C:/laragon/www/ecom-wms/storefront-pwa/node_modules/destr/dist/index.mjs";
import "C:/laragon/www/ecom-wms/storefront-pwa/node_modules/ohash/dist/index.mjs";
import "@vue/devtools-api";
import "C:/laragon/www/ecom-wms/storefront-pwa/node_modules/perfect-debounce/dist/index.mjs";
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
    const isCancellable = (status) => ["pending", "approved", "picking", "picked", "packed"].includes(status ?? "");
    const statusLabel = (s) => ({
      pending: "Chờ xác nhận",
      approved: "Đã duyệt",
      picking: "Đang lấy hàng",
      packed: "Đóng gói",
      shipped: "Đang giao",
      delivered: "Đã giao",
      cancelled: "Đã hủy"
    })[s ?? ""] ?? s;
    const statusClass = (s) => ({
      delivered: "bg-green-100 text-green-700",
      shipped: "bg-blue-100 text-blue-700",
      cancelled: "bg-red-100 text-red-700"
    })[s ?? ""] ?? "bg-gray-100 text-gray-600";
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "bg-white rounded-xl border p-6 space-y-6" }, _attrs))}><div class="flex items-center justify-between"><div>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/account/orders",
        class: "text-sm text-indigo-600 hover:underline"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`← Đơn hàng của tôi`);
          } else {
            return [
              createTextVNode("← Đơn hàng của tôi")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<h1 class="text-xl font-bold mt-1">Đơn hàng #${ssrInterpolate(unref(order)?.id)}</h1></div><div class="flex items-center gap-3"><span class="${ssrRenderClass([statusClass(unref(order)?.status), "px-3 py-1 rounded-full text-sm font-medium"])}">${ssrInterpolate(statusLabel(unref(order)?.status))}</span>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: `/account/orders/${unref(route).params.id}/tracking`,
        class: "text-sm border border-indigo-500 text-indigo-600 px-3 py-1.5 rounded-lg hover:bg-indigo-50"
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
        _: 1
      }, _parent));
      if (unref(order) && isCancellable(unref(order).status)) {
        _push(`<button${ssrIncludeBooleanAttr(unref(cancelling)) ? " disabled" : ""} class="text-sm border border-red-400 text-red-500 px-3 py-1.5 rounded-lg hover:bg-red-50 disabled:opacity-50">${ssrInterpolate(unref(cancelling) ? "Đang hủy..." : "Hủy đơn")}</button>`);
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
        _push(`<div class="border rounded-xl overflow-hidden"><div class="px-4 py-3 bg-gray-50 border-b"><h2 class="font-semibold text-sm text-gray-600 uppercase tracking-wide">Sản phẩm</h2></div><div class="divide-y"><!--[-->`);
        ssrRenderList(unref(order)?.items, (item) => {
          _push(`<div class="flex items-center gap-4 px-4 py-3"><div class="w-14 h-14 bg-gray-100 rounded-lg flex-shrink-0 overflow-hidden">`);
          if (item.product?.productImages?.[0]?.image_url) {
            _push(`<img${ssrRenderAttr("src", item.product.productImages[0].image_url)} class="w-full h-full object-cover">`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div><div class="flex-1 min-w-0"><p class="font-medium text-sm truncate">${ssrInterpolate(item.product?.name ?? `Sản phẩm #${item.product_id}`)}</p><p class="text-xs text-gray-400 mt-0.5">SKU: ${ssrInterpolate(item.product?.sku ?? "—")}</p></div><div class="text-right flex-shrink-0"><p class="text-sm text-gray-500">× ${ssrInterpolate(item.quantity)}</p><p class="font-semibold text-sm">${ssrInterpolate(fmt(item.unit_price * item.quantity))}</p></div></div>`);
        });
        _push(`<!--]--></div></div>`);
      }
      _push(`<div class="grid grid-cols-1 md:grid-cols-2 gap-4"><div class="border rounded-xl p-4 space-y-2 text-sm"><h2 class="font-semibold text-gray-600 uppercase tracking-wide text-xs mb-3">Tổng tiền</h2><div class="flex justify-between text-gray-600"><span>Tạm tính</span><span>${ssrInterpolate(fmt(unref(order)?.subtotal ?? 0))}</span></div><div class="flex justify-between text-gray-600"><span>Vận chuyển</span><span>${ssrInterpolate(fmt(unref(order)?.shipping ?? 0))}</span></div><div class="flex justify-between text-gray-600"><span>Thuế</span><span>${ssrInterpolate(fmt(unref(order)?.tax ?? 0))}</span></div>`);
      if ((unref(order)?.discount ?? 0) > 0) {
        _push(`<div class="flex justify-between text-green-600"><span>Giảm giá</span><span>-${ssrInterpolate(fmt(unref(order)?.discount ?? 0))}</span></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="flex justify-between font-bold text-base pt-2 border-t"><span>Tổng cộng</span><span class="text-red-600">${ssrInterpolate(fmt(unref(order)?.total ?? 0))}</span></div></div><div class="border rounded-xl p-4 space-y-2 text-sm"><h2 class="font-semibold text-gray-600 uppercase tracking-wide text-xs mb-3">Thông tin giao hàng</h2><p class="text-gray-700">${ssrInterpolate(unref(order)?.delivery_address ?? "—")}</p>`);
      if (unref(order)?.coupon_code) {
        _push(`<div class="flex items-center gap-2 mt-2"><span class="text-gray-500">Mã giảm giá:</span><span class="bg-green-100 text-green-700 px-2 py-0.5 rounded text-xs font-mono">${ssrInterpolate(unref(order).coupon_code)}</span></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="pt-2 border-t space-y-1 text-xs text-gray-400"><p>Đặt lúc: ${ssrInterpolate(unref(order)?.created_at ? fmtDate(unref(order).created_at) : "—")}</p>`);
      if (unref(order)?.approved_at) {
        _push(`<p>Duyệt lúc: ${ssrInterpolate(fmtDate(unref(order).approved_at))}</p>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(order)?.shipped_at) {
        _push(`<p>Giao lúc: ${ssrInterpolate(fmtDate(unref(order).shipped_at))}</p>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(order)?.delivered_at) {
        _push(`<p>Nhận lúc: ${ssrInterpolate(fmtDate(unref(order).delivered_at))}</p>`);
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
export {
  _sfc_main as default
};
//# sourceMappingURL=index-6dZTdm7p.js.map
