import { _ as __nuxt_component_0 } from "./nuxt-link-B2doaXW1.js";
import { defineComponent, withAsyncContext, computed, mergeProps, withCtx, createTextVNode, unref, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderClass } from "vue/server-renderer";
import "C:/laragon/www/ecom-wms/storefront-pwa/node_modules/hookable/dist/index.mjs";
import { u as useRoute } from "../server.mjs";
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
    const stepNames = ["Đặt hàng", "Xác nhận", "Đang lấy hàng", "Đóng gói", "Đang giao", "Đã giao"];
    const steps = computed(() => statusOrder.map((id, i) => ({
      id,
      name: stepNames[i],
      date: tracking.value?.[`${id}_at`] ?? null
    })));
    const currentIdx = computed(() => statusOrder.indexOf(tracking.value?.status ?? "pending"));
    const fmtDate = (d) => new Date(d).toLocaleString("vi-VN", { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "max-w-3xl mx-auto py-10 px-4 space-y-8" }, _attrs))}><div>`);
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
      _push(`<h1 class="text-2xl font-bold mt-2">Vận trình đơn #${ssrInterpolate(unref(tracking)?.order_id)}</h1></div><div class="grid grid-cols-1 md:grid-cols-2 gap-8"><div><h2 class="font-semibold mb-4">Trạng thái đơn hàng</h2><div class="space-y-0"><!--[-->`);
      ssrRenderList(unref(steps), (s, i) => {
        _push(`<div class="flex gap-4"><div class="flex flex-col items-center"><div class="${ssrRenderClass([i <= unref(currentIdx) ? "bg-indigo-600 text-white" : "bg-gray-200 text-gray-400", "w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition"])}">`);
        if (i < unref(currentIdx)) {
          _push(`<span>✓</span>`);
        } else {
          _push(`<span>${ssrInterpolate(i + 1)}</span>`);
        }
        _push(`</div>`);
        if (i < unref(steps).length - 1) {
          _push(`<div class="${ssrRenderClass([i < unref(currentIdx) ? "bg-indigo-600" : "bg-gray-200", "w-0.5 h-8"])}"></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><div class="pb-6 pt-1"><p class="${ssrRenderClass([i <= unref(currentIdx) ? "text-gray-900" : "text-gray-400", "font-semibold text-sm"])}">${ssrInterpolate(s.name)}</p><p class="text-xs text-gray-400 mt-0.5">${ssrInterpolate(s.date ? fmtDate(s.date) : "Chờ xử lý")}</p></div></div>`);
      });
      _push(`<!--]--></div></div><div class="bg-gray-50 rounded-xl p-5 space-y-4 text-sm"><h2 class="font-semibold">Thông tin vận chuyển</h2><div class="grid grid-cols-2 gap-3"><div><p class="text-gray-400">Trạng thái</p><span class="px-2 py-0.5 rounded text-xs font-medium bg-indigo-100 text-indigo-700">${ssrInterpolate(unref(tracking)?.status)}</span></div><div><p class="text-gray-400">Địa chỉ giao</p><p class="font-medium">${ssrInterpolate(unref(tracking)?.delivery_address ?? "—")}</p></div><div><p class="text-gray-400">Ngày duyệt</p><p class="font-medium">${ssrInterpolate(unref(tracking)?.approved_at ? fmtDate(unref(tracking).approved_at) : "—")}</p></div><div><p class="text-gray-400">Ngày giao</p><p class="font-medium">${ssrInterpolate(unref(tracking)?.delivered_at ? fmtDate(unref(tracking).delivered_at) : "—")}</p></div></div></div></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/account/orders/[id]/tracking.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=tracking-BlRfvIwK.js.map
