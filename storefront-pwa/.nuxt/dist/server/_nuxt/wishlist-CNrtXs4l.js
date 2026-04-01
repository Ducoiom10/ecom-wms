import { _ as _sfc_main$1 } from "./EmptyState-DTWoF1UD.js";
import { u as useWishlistStore, _ as _sfc_main$2 } from "./ProductCard-KEPk7OKU.js";
import { defineComponent, computed, mergeProps, unref, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList } from "vue/server-renderer";
import "C:/laragon/www/ecom-wms/storefront-pwa/node_modules/hookable/dist/index.mjs";
import "./nuxt-link-B2doaXW1.js";
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
import "./cart-TRz18UDQ.js";
import "./ui-CDZkXfd4.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "wishlist",
  __ssrInlineRender: true,
  setup(__props) {
    const wishlistStore = useWishlistStore();
    const wishlist = computed(() => wishlistStore.items);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UiEmptyState = _sfc_main$1;
      const _component_ProductCard = _sfc_main$2;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "bg-white rounded-xl border p-6 space-y-5" }, _attrs))}><h1 class="text-xl font-bold">Sản phẩm yêu thích</h1>`);
      if (!unref(wishlist).length) {
        _push(ssrRenderComponent(_component_UiEmptyState, {
          icon: "❤️",
          title: "Chưa có sản phẩm yêu thích",
          message: "Nhấn ❤️ trên sản phẩm để lưu vào đây",
          "action-link": "/category",
          "action-label": "Khám phá sản phẩm"
        }, null, _parent));
      } else {
        _push(`<div class="grid grid-cols-2 md:grid-cols-3 gap-4"><!--[-->`);
        ssrRenderList(unref(wishlist), (p) => {
          _push(`<div class="relative">`);
          _push(ssrRenderComponent(_component_ProductCard, { product: p }, null, _parent));
          _push(`<button class="absolute top-2 right-2 bg-white rounded-full w-7 h-7 flex items-center justify-center shadow text-red-500 hover:bg-red-50">×</button></div>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/account/wishlist.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=wishlist-CNrtXs4l.js.map
