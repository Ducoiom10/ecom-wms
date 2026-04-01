import { _ as __nuxt_component_0 } from "./nuxt-link-B2doaXW1.js";
import { _ as __nuxt_component_1 } from "./SkeletonCard-Dzn9IcWD.js";
import { _ as _sfc_main$1 } from "./ProductCard-KEPk7OKU.js";
import { defineComponent, ref, withAsyncContext, mergeProps, unref, withCtx, createTextVNode, toDisplayString, createVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrInterpolate, ssrRenderComponent, ssrRenderList, ssrRenderClass, ssrRenderAttr, ssrIncludeBooleanAttr } from "vue/server-renderer";
import { u as useSeoMeta } from "./v3-DQje9XB8.js";
import "C:/laragon/www/ecom-wms/storefront-pwa/node_modules/hookable/dist/index.mjs";
import { _ as _export_sfc } from "../server.mjs";
import { u as useAsyncData } from "./asyncData-DBk6s2t8.js";
import "C:/laragon/www/ecom-wms/storefront-pwa/node_modules/defu/dist/defu.mjs";
import "./cart-TRz18UDQ.js";
import "C:/laragon/www/ecom-wms/storefront-pwa/node_modules/klona/dist/index.mjs";
import "#internal/nuxt/paths";
import "pinia";
import "./ui-CDZkXfd4.js";
import "C:/laragon/www/ecom-wms/storefront-pwa/node_modules/@unhead/vue/dist/index.mjs";
import "C:/laragon/www/ecom-wms/storefront-pwa/node_modules/ofetch/dist/node.mjs";
import "C:/laragon/www/ecom-wms/storefront-pwa/node_modules/unctx/dist/index.mjs";
import "C:/laragon/www/ecom-wms/storefront-pwa/node_modules/h3/dist/index.mjs";
import "vue-router";
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
    useSeoMeta({
      title: "Trang chủ | EcomWMS Store",
      description: "Khám phá sản phẩm chất lượng với giá tốt nhất.",
      ogTitle: "EcomWMS Store",
      ogDescription: "Khám phá sản phẩm chất lượng với giá tốt nhất."
    });
    const slides = [
      { tag: "Bộ sưu tập mới", title: "Khám phá Mùa Hè 2026", subtitle: "Phong cách hiện đại, chất lượng vượt trội", link: "/category", cta: "Mua sắm ngay" },
      { tag: "Flash Sale", title: "Giảm đến 50% hôm nay", subtitle: "Chỉ trong 24 giờ — số lượng có hạn", link: "/category", cta: "Xem ưu đãi" },
      { tag: "Hàng mới về", title: "Công nghệ tiên tiến 2026", subtitle: "Trải nghiệm sản phẩm công nghệ mới nhất", link: "/category", cta: "Khám phá ngay" }
    ];
    const slideIdx = ref(0);
    const { data: categories, pending: catPending } = ([__temp, __restore] = withAsyncContext(() => useAsyncData(
      "home-categories",
      () => useProductApi().getFilters()
    )), __temp = await __temp, __restore(), __temp);
    const { data: products, pending: prodPending } = ([__temp, __restore] = withAsyncContext(() => useAsyncData(
      "home-products",
      () => useProductApi().getAll({ limit: 8 })
    )), __temp = await __temp, __restore(), __temp);
    const testimonials = [
      { id: 1, name: "Nguyễn Văn A", rating: 5, comment: "Sản phẩm chất lượng tốt, giao hàng nhanh!", date: "28/03/2026" },
      { id: 2, name: "Trần Thị B", rating: 5, comment: "Dịch vụ khách hàng rất tuyệt vời. Sẽ mua lại!", date: "25/03/2026" },
      { id: 3, name: "Lê Văn C", rating: 4, comment: "Giá cả hợp lý, chất lượng ổn định.", date: "22/03/2026" }
    ];
    const badges = [
      { icon: "🚚", title: "Giao hàng miễn phí", desc: "Cho đơn hàng trên 500.000₫" },
      { icon: "🔒", title: "Thanh toán an toàn", desc: "Nhiều phương thức thanh toán bảo mật" },
      { icon: "↩️", title: "Đổi trả dễ dàng", desc: "30 ngày hoàn tiền 100%" }
    ];
    const email = ref("");
    const subscribing = ref(false);
    const subMsg = ref("");
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      const _component_UiSkeletonCard = __nuxt_component_1;
      const _component_ProductCard = _sfc_main$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen" }, _attrs))} data-v-1e974aa3><section class="relative h-96 overflow-hidden bg-indigo-700" data-v-1e974aa3><div class="absolute inset-0" data-v-1e974aa3><div class="absolute inset-0 bg-gradient-to-r from-indigo-900/80 to-indigo-600/40" data-v-1e974aa3></div><div class="relative h-full flex items-center justify-center text-center text-white px-6" data-v-1e974aa3><div data-v-1e974aa3><p class="text-sm font-semibold uppercase tracking-widest mb-3 opacity-80" data-v-1e974aa3>${ssrInterpolate(slides[unref(slideIdx)].tag)}</p><h1 class="text-4xl md:text-5xl font-bold mb-4" data-v-1e974aa3>${ssrInterpolate(slides[unref(slideIdx)].title)}</h1><p class="text-lg mb-8 opacity-90 max-w-lg mx-auto" data-v-1e974aa3>${ssrInterpolate(slides[unref(slideIdx)].subtitle)}</p>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: slides[unref(slideIdx)].link,
        class: "inline-block px-8 py-3 bg-white text-indigo-700 font-semibold rounded-lg hover:bg-gray-100 transition"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(slides[unref(slideIdx)].cta)}`);
          } else {
            return [
              createTextVNode(toDisplayString(slides[unref(slideIdx)].cta), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></div><div class="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2 z-10" data-v-1e974aa3><!--[-->`);
      ssrRenderList(slides, (_, i) => {
        _push(`<button class="${ssrRenderClass([i === unref(slideIdx) ? "w-8 bg-white" : "w-2 bg-white/50", "h-2 rounded-full transition-all duration-300"])}" data-v-1e974aa3></button>`);
      });
      _push(`<!--]--></div></section><section class="py-14 px-4 bg-white" data-v-1e974aa3><div class="max-w-7xl mx-auto" data-v-1e974aa3><h2 class="text-2xl font-bold mb-8 text-center" data-v-1e974aa3>Danh mục nổi bật</h2>`);
      if (unref(catPending)) {
        _push(`<div class="grid grid-cols-2 md:grid-cols-4 gap-4" data-v-1e974aa3><!--[-->`);
        ssrRenderList(4, (i) => {
          _push(`<div class="h-40 bg-gray-100 rounded-xl animate-pulse" data-v-1e974aa3></div>`);
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<div class="grid grid-cols-2 md:grid-cols-4 gap-4" data-v-1e974aa3><!--[-->`);
        ssrRenderList(unref(categories)?.data?.slice(0, 4), (cat) => {
          _push(ssrRenderComponent(_component_NuxtLink, {
            key: cat.id,
            to: `/category/${cat.slug}`,
            class: "group relative h-40 rounded-xl overflow-hidden bg-indigo-50 flex items-center justify-center hover:shadow-lg transition"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<div class="absolute inset-0 bg-gradient-to-t from-indigo-900/60 to-transparent" data-v-1e974aa3${_scopeId}></div><h3 class="relative z-10 text-white font-bold text-lg text-center px-3" data-v-1e974aa3${_scopeId}>${ssrInterpolate(cat.name)}</h3>`);
              } else {
                return [
                  createVNode("div", { class: "absolute inset-0 bg-gradient-to-t from-indigo-900/60 to-transparent" }),
                  createVNode("h3", { class: "relative z-10 text-white font-bold text-lg text-center px-3" }, toDisplayString(cat.name), 1)
                ];
              }
            }),
            _: 2
          }, _parent));
        });
        _push(`<!--]--></div>`);
      }
      _push(`</div></section><section class="py-14 px-4 bg-gray-50" data-v-1e974aa3><div class="max-w-7xl mx-auto" data-v-1e974aa3><div class="flex items-center justify-between mb-8" data-v-1e974aa3><h2 class="text-2xl font-bold" data-v-1e974aa3>Sản phẩm nổi bật</h2>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/category",
        class: "text-sm text-indigo-600 hover:underline font-medium"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Xem tất cả →`);
          } else {
            return [
              createTextVNode("Xem tất cả →")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
      if (unref(prodPending)) {
        _push(`<div class="grid grid-cols-2 md:grid-cols-4 gap-6" data-v-1e974aa3><!--[-->`);
        ssrRenderList(8, (i) => {
          _push(ssrRenderComponent(_component_UiSkeletonCard, { key: i }, null, _parent));
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<div class="grid grid-cols-2 md:grid-cols-4 gap-6" data-v-1e974aa3><!--[-->`);
        ssrRenderList(unref(products)?.data, (p) => {
          _push(ssrRenderComponent(_component_ProductCard, {
            key: p.id,
            product: p
          }, null, _parent));
        });
        _push(`<!--]--></div>`);
      }
      _push(`</div></section><section class="py-14 px-4 bg-gradient-to-r from-rose-500 to-orange-500" data-v-1e974aa3><div class="max-w-3xl mx-auto text-center text-white" data-v-1e974aa3><p class="text-xs font-bold uppercase tracking-widest mb-2 opacity-80" data-v-1e974aa3>Ưu đãi có hạn</p><h2 class="text-3xl md:text-4xl font-bold mb-4" data-v-1e974aa3>Giảm giá lên đến 50%</h2><p class="text-base mb-8 opacity-90" data-v-1e974aa3>Chỉ áp dụng cho sản phẩm được chọn. Nhanh tay kẻo hết!</p>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/category",
        class: "inline-block px-8 py-3 bg-white text-rose-600 font-semibold rounded-lg hover:bg-gray-100 transition"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Khám phá ưu đãi `);
          } else {
            return [
              createTextVNode(" Khám phá ưu đãi ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></section><section class="py-14 px-4 bg-white" data-v-1e974aa3><div class="max-w-7xl mx-auto" data-v-1e974aa3><h2 class="text-2xl font-bold mb-8 text-center" data-v-1e974aa3>Khách hàng nói gì?</h2><div class="grid grid-cols-1 md:grid-cols-3 gap-6" data-v-1e974aa3><!--[-->`);
      ssrRenderList(testimonials, (t) => {
        _push(`<div class="bg-gray-50 rounded-xl p-6 space-y-3 hover:shadow-md transition" data-v-1e974aa3><div class="flex gap-0.5 text-amber-400" data-v-1e974aa3><!--[-->`);
        ssrRenderList(t.rating, (s) => {
          _push(`<span data-v-1e974aa3>⭐</span>`);
        });
        _push(`<!--]--></div><p class="text-gray-700 text-sm italic" data-v-1e974aa3>&quot;${ssrInterpolate(t.comment)}&quot;</p><div class="flex items-center gap-3 pt-2 border-t" data-v-1e974aa3><div class="w-9 h-9 rounded-full bg-indigo-100 text-indigo-600 font-bold text-sm flex items-center justify-center" data-v-1e974aa3>${ssrInterpolate(t.name[0])}</div><div data-v-1e974aa3><p class="font-semibold text-sm" data-v-1e974aa3>${ssrInterpolate(t.name)}</p><p class="text-xs text-gray-400" data-v-1e974aa3>${ssrInterpolate(t.date)}</p></div></div></div>`);
      });
      _push(`<!--]--></div></div></section><section class="py-10 px-4 bg-gray-50 border-t" data-v-1e974aa3><div class="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6" data-v-1e974aa3><!--[-->`);
      ssrRenderList(badges, (b) => {
        _push(`<div class="flex items-start gap-4" data-v-1e974aa3><span class="text-3xl" data-v-1e974aa3>${ssrInterpolate(b.icon)}</span><div data-v-1e974aa3><h3 class="font-semibold" data-v-1e974aa3>${ssrInterpolate(b.title)}</h3><p class="text-sm text-gray-500" data-v-1e974aa3>${ssrInterpolate(b.desc)}</p></div></div>`);
      });
      _push(`<!--]--></div></section><section class="py-14 px-4 bg-indigo-600 text-white" data-v-1e974aa3><div class="max-w-xl mx-auto text-center" data-v-1e974aa3><h2 class="text-2xl font-bold mb-2" data-v-1e974aa3>Đăng ký nhận tin</h2><p class="text-sm opacity-90 mb-6" data-v-1e974aa3>Nhận thông tin khuyến mãi và sản phẩm mới trước tiên.</p><form class="flex gap-2" data-v-1e974aa3><input${ssrRenderAttr("value", unref(email))} type="email" required placeholder="Email của bạn" class="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none text-sm" data-v-1e974aa3><button type="submit"${ssrIncludeBooleanAttr(unref(subscribing)) ? " disabled" : ""} class="px-6 py-3 bg-white text-indigo-700 font-semibold rounded-lg hover:bg-gray-100 disabled:opacity-50 text-sm transition" data-v-1e974aa3>${ssrInterpolate(unref(subscribing) ? "..." : "Đăng ký")}</button></form>`);
      if (unref(subMsg)) {
        _push(`<p class="mt-3 text-sm opacity-90" data-v-1e974aa3>${ssrInterpolate(unref(subMsg))}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></section></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-1e974aa3"]]);
export {
  index as default
};
//# sourceMappingURL=index-DbZ_RX4I.js.map
