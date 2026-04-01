import { _ as _sfc_main$1 } from './EmptyState-DTWoF1UD.mjs';
import { u as useWishlistStore, _ as _sfc_main$2 } from './ProductCard-KEPk7OKU.mjs';
import { defineComponent, computed, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList } from 'vue/server-renderer';
import './nuxt-link-B2doaXW1.mjs';
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
