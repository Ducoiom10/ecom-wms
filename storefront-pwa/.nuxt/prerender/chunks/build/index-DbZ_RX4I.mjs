import { _ as __nuxt_component_0 } from './nuxt-link-B2doaXW1.mjs';
import { _ as __nuxt_component_1 } from './SkeletonCard-Dzn9IcWD.mjs';
import { _ as _sfc_main$1 } from './ProductCard-KEPk7OKU.mjs';
import { defineComponent, ref, withAsyncContext, mergeProps, unref, withCtx, createTextVNode, toDisplayString, createVNode, useSSRContext } from 'file://C:/laragon/www/ecom-wms/storefront-pwa/node_modules/vue/index.mjs';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderComponent, ssrRenderList, ssrRenderClass, ssrRenderAttr, ssrIncludeBooleanAttr } from 'file://C:/laragon/www/ecom-wms/storefront-pwa/node_modules/vue/server-renderer/index.mjs';
import { u as useSeoMeta } from './v3-DQje9XB8.mjs';
import { _ as _export_sfc } from './server.mjs';
import { u as useAsyncData } from './asyncData-DBk6s2t8.mjs';
import './cart-TRz18UDQ.mjs';
import 'file://C:/laragon/www/ecom-wms/storefront-pwa/node_modules/pinia/dist/pinia.prod.cjs';
import './ui-CDZkXfd4.mjs';
import '../_/renderer.mjs';
import 'file://C:/laragon/www/ecom-wms/storefront-pwa/node_modules/vue-bundle-renderer/dist/runtime.mjs';
import 'file://C:/laragon/www/ecom-wms/storefront-pwa/node_modules/h3/dist/index.mjs';
import '../_/nitro.mjs';
import 'file://C:/laragon/www/ecom-wms/storefront-pwa/node_modules/destr/dist/index.mjs';
import 'file://C:/laragon/www/ecom-wms/storefront-pwa/node_modules/hookable/dist/index.mjs';
import 'file://C:/laragon/www/ecom-wms/storefront-pwa/node_modules/ofetch/dist/node.mjs';
import 'file://C:/laragon/www/ecom-wms/storefront-pwa/node_modules/node-mock-http/dist/index.mjs';
import 'file://C:/laragon/www/ecom-wms/storefront-pwa/node_modules/klona/dist/index.mjs';
import 'file://C:/laragon/www/ecom-wms/storefront-pwa/node_modules/defu/dist/defu.mjs';
import 'file://C:/laragon/www/ecom-wms/storefront-pwa/node_modules/scule/dist/index.mjs';
import 'file://C:/laragon/www/ecom-wms/storefront-pwa/node_modules/radix3/dist/index.mjs';
import 'node:fs';
import 'node:url';
import 'file://C:/laragon/www/ecom-wms/storefront-pwa/node_modules/pathe/dist/index.mjs';
import 'file://C:/laragon/www/ecom-wms/storefront-pwa/node_modules/ipx/dist/index.mjs';
import 'file://C:/laragon/www/ecom-wms/storefront-pwa/node_modules/unstorage/dist/index.mjs';
import 'file://C:/laragon/www/ecom-wms/storefront-pwa/node_modules/unstorage/drivers/fs.mjs';
import 'file:///C:/laragon/www/ecom-wms/storefront-pwa/node_modules/@nuxt/nitro-server/dist/runtime/utils/cache-driver.js';
import 'file://C:/laragon/www/ecom-wms/storefront-pwa/node_modules/unstorage/drivers/fs-lite.mjs';
import 'file://C:/laragon/www/ecom-wms/storefront-pwa/node_modules/ohash/dist/index.mjs';
import 'file://C:/laragon/www/ecom-wms/storefront-pwa/node_modules/unhead/dist/server.mjs';
import 'file://C:/laragon/www/ecom-wms/storefront-pwa/node_modules/devalue/index.js';
import 'file://C:/laragon/www/ecom-wms/storefront-pwa/node_modules/unhead/dist/plugins.mjs';
import 'file://C:/laragon/www/ecom-wms/storefront-pwa/node_modules/unhead/dist/utils.mjs';
import 'file://C:/laragon/www/ecom-wms/storefront-pwa/node_modules/unctx/dist/index.mjs';
import 'file://C:/laragon/www/ecom-wms/storefront-pwa/node_modules/vue-router/vue-router.node.mjs';
import 'file://C:/laragon/www/ecom-wms/storefront-pwa/node_modules/nuxt/node_modules/cookie-es/dist/index.mjs';
import 'file://C:/laragon/www/ecom-wms/storefront-pwa/node_modules/vue-devtools-stub/dist/index.mjs';
import 'file://C:/laragon/www/ecom-wms/storefront-pwa/node_modules/perfect-debounce/dist/index.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    useSeoMeta({
      title: "Trang ch\u1EE7 | EcomWMS Store",
      description: "Kh\xE1m ph\xE1 s\u1EA3n ph\u1EA9m ch\u1EA5t l\u01B0\u1EE3ng v\u1EDBi gi\xE1 t\u1ED1t nh\u1EA5t.",
      ogTitle: "EcomWMS Store",
      ogDescription: "Kh\xE1m ph\xE1 s\u1EA3n ph\u1EA9m ch\u1EA5t l\u01B0\u1EE3ng v\u1EDBi gi\xE1 t\u1ED1t nh\u1EA5t."
    });
    const slides = [
      { tag: "B\u1ED9 s\u01B0u t\u1EADp m\u1EDBi", title: "Kh\xE1m ph\xE1 M\xF9a H\xE8 2026", subtitle: "Phong c\xE1ch hi\u1EC7n \u0111\u1EA1i, ch\u1EA5t l\u01B0\u1EE3ng v\u01B0\u1EE3t tr\u1ED9i", link: "/category", cta: "Mua s\u1EAFm ngay" },
      { tag: "Flash Sale", title: "Gi\u1EA3m \u0111\u1EBFn 50% h\xF4m nay", subtitle: "Ch\u1EC9 trong 24 gi\u1EDD \u2014 s\u1ED1 l\u01B0\u1EE3ng c\xF3 h\u1EA1n", link: "/category", cta: "Xem \u01B0u \u0111\xE3i" },
      { tag: "H\xE0ng m\u1EDBi v\u1EC1", title: "C\xF4ng ngh\u1EC7 ti\xEAn ti\u1EBFn 2026", subtitle: "Tr\u1EA3i nghi\u1EC7m s\u1EA3n ph\u1EA9m c\xF4ng ngh\u1EC7 m\u1EDBi nh\u1EA5t", link: "/category", cta: "Kh\xE1m ph\xE1 ngay" }
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
      { id: 1, name: "Nguy\u1EC5n V\u0103n A", rating: 5, comment: "S\u1EA3n ph\u1EA9m ch\u1EA5t l\u01B0\u1EE3ng t\u1ED1t, giao h\xE0ng nhanh!", date: "28/03/2026" },
      { id: 2, name: "Tr\u1EA7n Th\u1ECB B", rating: 5, comment: "D\u1ECBch v\u1EE5 kh\xE1ch h\xE0ng r\u1EA5t tuy\u1EC7t v\u1EDDi. S\u1EBD mua l\u1EA1i!", date: "25/03/2026" },
      { id: 3, name: "L\xEA V\u0103n C", rating: 4, comment: "Gi\xE1 c\u1EA3 h\u1EE3p l\xFD, ch\u1EA5t l\u01B0\u1EE3ng \u1ED5n \u0111\u1ECBnh.", date: "22/03/2026" }
    ];
    const badges = [
      { icon: "\u{1F69A}", title: "Giao h\xE0ng mi\u1EC5n ph\xED", desc: "Cho \u0111\u01A1n h\xE0ng tr\xEAn 500.000\u20AB" },
      { icon: "\u{1F512}", title: "Thanh to\xE1n an to\xE0n", desc: "Nhi\u1EC1u ph\u01B0\u01A1ng th\u1EE9c thanh to\xE1n b\u1EA3o m\u1EADt" },
      { icon: "\u21A9\uFE0F", title: "\u0110\u1ED5i tr\u1EA3 d\u1EC5 d\xE0ng", desc: "30 ng\xE0y ho\xE0n ti\u1EC1n 100%" }
    ];
    const email = ref("");
    const subscribing = ref(false);
    const subMsg = ref("");
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b, _c;
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
      _push(`<!--]--></div></section><section class="py-14 px-4 bg-white" data-v-1e974aa3><div class="max-w-7xl mx-auto" data-v-1e974aa3><h2 class="text-2xl font-bold mb-8 text-center" data-v-1e974aa3>Danh m\u1EE5c n\u1ED5i b\u1EADt</h2>`);
      if (unref(catPending)) {
        _push(`<div class="grid grid-cols-2 md:grid-cols-4 gap-4" data-v-1e974aa3><!--[-->`);
        ssrRenderList(4, (i) => {
          _push(`<div class="h-40 bg-gray-100 rounded-xl animate-pulse" data-v-1e974aa3></div>`);
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<div class="grid grid-cols-2 md:grid-cols-4 gap-4" data-v-1e974aa3><!--[-->`);
        ssrRenderList((_b = (_a = unref(categories)) == null ? void 0 : _a.data) == null ? void 0 : _b.slice(0, 4), (cat) => {
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
      _push(`</div></section><section class="py-14 px-4 bg-gray-50" data-v-1e974aa3><div class="max-w-7xl mx-auto" data-v-1e974aa3><div class="flex items-center justify-between mb-8" data-v-1e974aa3><h2 class="text-2xl font-bold" data-v-1e974aa3>S\u1EA3n ph\u1EA9m n\u1ED5i b\u1EADt</h2>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/category",
        class: "text-sm text-indigo-600 hover:underline font-medium"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Xem t\u1EA5t c\u1EA3 \u2192`);
          } else {
            return [
              createTextVNode("Xem t\u1EA5t c\u1EA3 \u2192")
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
        ssrRenderList((_c = unref(products)) == null ? void 0 : _c.data, (p) => {
          _push(ssrRenderComponent(_component_ProductCard, {
            key: p.id,
            product: p
          }, null, _parent));
        });
        _push(`<!--]--></div>`);
      }
      _push(`</div></section><section class="py-14 px-4 bg-gradient-to-r from-rose-500 to-orange-500" data-v-1e974aa3><div class="max-w-3xl mx-auto text-center text-white" data-v-1e974aa3><p class="text-xs font-bold uppercase tracking-widest mb-2 opacity-80" data-v-1e974aa3>\u01AFu \u0111\xE3i c\xF3 h\u1EA1n</p><h2 class="text-3xl md:text-4xl font-bold mb-4" data-v-1e974aa3>Gi\u1EA3m gi\xE1 l\xEAn \u0111\u1EBFn 50%</h2><p class="text-base mb-8 opacity-90" data-v-1e974aa3>Ch\u1EC9 \xE1p d\u1EE5ng cho s\u1EA3n ph\u1EA9m \u0111\u01B0\u1EE3c ch\u1ECDn. Nhanh tay k\u1EBBo h\u1EBFt!</p>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/category",
        class: "inline-block px-8 py-3 bg-white text-rose-600 font-semibold rounded-lg hover:bg-gray-100 transition"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Kh\xE1m ph\xE1 \u01B0u \u0111\xE3i `);
          } else {
            return [
              createTextVNode(" Kh\xE1m ph\xE1 \u01B0u \u0111\xE3i ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></section><section class="py-14 px-4 bg-white" data-v-1e974aa3><div class="max-w-7xl mx-auto" data-v-1e974aa3><h2 class="text-2xl font-bold mb-8 text-center" data-v-1e974aa3>Kh\xE1ch h\xE0ng n\xF3i g\xEC?</h2><div class="grid grid-cols-1 md:grid-cols-3 gap-6" data-v-1e974aa3><!--[-->`);
      ssrRenderList(testimonials, (t) => {
        _push(`<div class="bg-gray-50 rounded-xl p-6 space-y-3 hover:shadow-md transition" data-v-1e974aa3><div class="flex gap-0.5 text-amber-400" data-v-1e974aa3><!--[-->`);
        ssrRenderList(t.rating, (s) => {
          _push(`<span data-v-1e974aa3>\u2B50</span>`);
        });
        _push(`<!--]--></div><p class="text-gray-700 text-sm italic" data-v-1e974aa3>&quot;${ssrInterpolate(t.comment)}&quot;</p><div class="flex items-center gap-3 pt-2 border-t" data-v-1e974aa3><div class="w-9 h-9 rounded-full bg-indigo-100 text-indigo-600 font-bold text-sm flex items-center justify-center" data-v-1e974aa3>${ssrInterpolate(t.name[0])}</div><div data-v-1e974aa3><p class="font-semibold text-sm" data-v-1e974aa3>${ssrInterpolate(t.name)}</p><p class="text-xs text-gray-400" data-v-1e974aa3>${ssrInterpolate(t.date)}</p></div></div></div>`);
      });
      _push(`<!--]--></div></div></section><section class="py-10 px-4 bg-gray-50 border-t" data-v-1e974aa3><div class="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6" data-v-1e974aa3><!--[-->`);
      ssrRenderList(badges, (b) => {
        _push(`<div class="flex items-start gap-4" data-v-1e974aa3><span class="text-3xl" data-v-1e974aa3>${ssrInterpolate(b.icon)}</span><div data-v-1e974aa3><h3 class="font-semibold" data-v-1e974aa3>${ssrInterpolate(b.title)}</h3><p class="text-sm text-gray-500" data-v-1e974aa3>${ssrInterpolate(b.desc)}</p></div></div>`);
      });
      _push(`<!--]--></div></section><section class="py-14 px-4 bg-indigo-600 text-white" data-v-1e974aa3><div class="max-w-xl mx-auto text-center" data-v-1e974aa3><h2 class="text-2xl font-bold mb-2" data-v-1e974aa3>\u0110\u0103ng k\xFD nh\u1EADn tin</h2><p class="text-sm opacity-90 mb-6" data-v-1e974aa3>Nh\u1EADn th\xF4ng tin khuy\u1EBFn m\xE3i v\xE0 s\u1EA3n ph\u1EA9m m\u1EDBi tr\u01B0\u1EDBc ti\xEAn.</p><form class="flex gap-2" data-v-1e974aa3><input${ssrRenderAttr("value", unref(email))} type="email" required placeholder="Email c\u1EE7a b\u1EA1n" class="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none text-sm" data-v-1e974aa3><button type="submit"${ssrIncludeBooleanAttr(unref(subscribing)) ? " disabled" : ""} class="px-6 py-3 bg-white text-indigo-700 font-semibold rounded-lg hover:bg-gray-100 disabled:opacity-50 text-sm transition" data-v-1e974aa3>${ssrInterpolate(unref(subscribing) ? "..." : "\u0110\u0103ng k\xFD")}</button></form>`);
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

export { index as default };
//# sourceMappingURL=index-DbZ_RX4I.mjs.map
