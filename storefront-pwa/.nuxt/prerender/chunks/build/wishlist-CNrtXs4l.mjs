import { _ as _sfc_main$1 } from './EmptyState-DTWoF1UD.mjs';
import { u as useWishlistStore, _ as _sfc_main$2 } from './ProductCard-KEPk7OKU.mjs';
import { defineComponent, computed, mergeProps, unref, useSSRContext } from 'file://C:/laragon/www/ecom-wms/storefront-pwa/node_modules/vue/index.mjs';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList } from 'file://C:/laragon/www/ecom-wms/storefront-pwa/node_modules/vue/server-renderer/index.mjs';
import './nuxt-link-B2doaXW1.mjs';
import './server.mjs';
import 'file://C:/laragon/www/ecom-wms/storefront-pwa/node_modules/ofetch/dist/node.mjs';
import '../_/nitro.mjs';
import 'file://C:/laragon/www/ecom-wms/storefront-pwa/node_modules/h3/dist/index.mjs';
import 'file://C:/laragon/www/ecom-wms/storefront-pwa/node_modules/destr/dist/index.mjs';
import 'file://C:/laragon/www/ecom-wms/storefront-pwa/node_modules/hookable/dist/index.mjs';
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
import 'file://C:/laragon/www/ecom-wms/storefront-pwa/node_modules/unctx/dist/index.mjs';
import 'file://C:/laragon/www/ecom-wms/storefront-pwa/node_modules/pinia/dist/pinia.prod.cjs';
import 'file://C:/laragon/www/ecom-wms/storefront-pwa/node_modules/vue-router/vue-router.node.mjs';
import 'file://C:/laragon/www/ecom-wms/storefront-pwa/node_modules/nuxt/node_modules/cookie-es/dist/index.mjs';
import 'file://C:/laragon/www/ecom-wms/storefront-pwa/node_modules/vue-devtools-stub/dist/index.mjs';
import './cart-TRz18UDQ.mjs';
import './ui-CDZkXfd4.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "wishlist",
  __ssrInlineRender: true,
  setup(__props) {
    const wishlistStore = useWishlistStore();
    const wishlist = computed(() => wishlistStore.items);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UiEmptyState = _sfc_main$1;
      const _component_ProductCard = _sfc_main$2;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "bg-white rounded-xl border p-6 space-y-5" }, _attrs))}><h1 class="text-xl font-bold">S\u1EA3n ph\u1EA9m y\xEAu th\xEDch</h1>`);
      if (!unref(wishlist).length) {
        _push(ssrRenderComponent(_component_UiEmptyState, {
          icon: "\u2764\uFE0F",
          title: "Ch\u01B0a c\xF3 s\u1EA3n ph\u1EA9m y\xEAu th\xEDch",
          message: "Nh\u1EA5n \u2764\uFE0F tr\xEAn s\u1EA3n ph\u1EA9m \u0111\u1EC3 l\u01B0u v\xE0o \u0111\xE2y",
          "action-link": "/category",
          "action-label": "Kh\xE1m ph\xE1 s\u1EA3n ph\u1EA9m"
        }, null, _parent));
      } else {
        _push(`<div class="grid grid-cols-2 md:grid-cols-3 gap-4"><!--[-->`);
        ssrRenderList(unref(wishlist), (p) => {
          _push(`<div class="relative">`);
          _push(ssrRenderComponent(_component_ProductCard, { product: p }, null, _parent));
          _push(`<button class="absolute top-2 right-2 bg-white rounded-full w-7 h-7 flex items-center justify-center shadow text-red-500 hover:bg-red-50">\xD7</button></div>`);
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

export { _sfc_main as default };
//# sourceMappingURL=wishlist-CNrtXs4l.mjs.map
