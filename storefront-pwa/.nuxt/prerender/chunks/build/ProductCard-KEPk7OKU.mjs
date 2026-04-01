import { _ as __nuxt_component_0 } from './nuxt-link-B2doaXW1.mjs';
import { defineComponent, computed, mergeProps, unref, withCtx, createVNode, toDisplayString, ref, readonly, useSSRContext } from 'file://C:/laragon/www/ecom-wms/storefront-pwa/node_modules/vue/index.mjs';
import { ssrRenderAttrs, ssrRenderClass, ssrRenderComponent, ssrRenderAttr, ssrInterpolate, ssrIncludeBooleanAttr } from 'file://C:/laragon/www/ecom-wms/storefront-pwa/node_modules/vue/server-renderer/index.mjs';
import { u as useCartStore } from './cart-TRz18UDQ.mjs';
import { defineStore } from 'file://C:/laragon/www/ecom-wms/storefront-pwa/node_modules/pinia/dist/pinia.prod.cjs';

const useWishlistStore = defineStore("wishlist", () => {
  const ids = ref([]);
  const items = ref([]);
  const loading = ref(false);
  const has = (id) => ids.value.includes(id);
  const add = async (product) => {
    if (has(product.id)) return;
    ids.value.push(product.id);
    items.value.push(product);
  };
  const remove = (id) => {
    ids.value = ids.value.filter((i) => i !== id);
    items.value = items.value.filter((p) => p.id !== id);
  };
  const toggle = async (product) => {
    has(product.id) ? remove(product.id) : await add(product);
  };
  const hydrate = async () => {
    return;
  };
  return { ids: readonly(ids), items: readonly(items), loading: readonly(loading), has, add, remove, toggle, hydrate };
});
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "ProductCard",
  __ssrInlineRender: true,
  props: {
    product: {}
  },
  setup(__props) {
    const props = __props;
    const cartStore = useCartStore();
    const wishlistStore = useWishlistStore();
    const primaryImage = computed(
      () => {
        var _a, _b, _c, _d, _e, _f;
        return (_f = (_e = (_b = (_a = props.product.productImages) == null ? void 0 : _a.find((i) => i.is_primary)) == null ? void 0 : _b.image_url) != null ? _e : (_d = (_c = props.product.productImages) == null ? void 0 : _c[0]) == null ? void 0 : _d.image_url) != null ? _f : "/placeholder.png";
      }
    );
    const formatPrice = (p) => new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(p);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "group relative border rounded-xl overflow-hidden hover:shadow-md transition bg-white" }, _attrs))}><button class="absolute top-2 right-2 z-10 w-8 h-8 rounded-full bg-white/80 backdrop-blur flex items-center justify-center shadow hover:scale-110 transition"><span class="${ssrRenderClass(unref(wishlistStore).has(__props.product.id) ? "text-red-500" : "text-gray-300")}">\u2665</span></button>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: `/products/${__props.product.id}`
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="aspect-square bg-gray-100 overflow-hidden"${_scopeId}><img${ssrRenderAttr("src", unref(primaryImage))}${ssrRenderAttr("alt", __props.product.name)} class="w-full h-full object-cover group-hover:scale-105 transition duration-300" loading="lazy"${_scopeId}></div><div class="p-3"${_scopeId}><p class="text-sm font-medium line-clamp-2 text-gray-800"${_scopeId}>${ssrInterpolate(__props.product.name)}</p><p class="text-red-600 font-bold mt-1 text-sm"${_scopeId}>${ssrInterpolate(formatPrice(__props.product.price))}</p></div>`);
          } else {
            return [
              createVNode("div", { class: "aspect-square bg-gray-100 overflow-hidden" }, [
                createVNode("img", {
                  src: unref(primaryImage),
                  alt: __props.product.name,
                  class: "w-full h-full object-cover group-hover:scale-105 transition duration-300",
                  loading: "lazy"
                }, null, 8, ["src", "alt"])
              ]),
              createVNode("div", { class: "p-3" }, [
                createVNode("p", { class: "text-sm font-medium line-clamp-2 text-gray-800" }, toDisplayString(__props.product.name), 1),
                createVNode("p", { class: "text-red-600 font-bold mt-1 text-sm" }, toDisplayString(formatPrice(__props.product.price)), 1)
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="px-3 pb-3"><button${ssrIncludeBooleanAttr(unref(cartStore).loading) ? " disabled" : ""} class="w-full text-xs bg-indigo-600 text-white py-1.5 rounded-lg hover:bg-indigo-700 disabled:opacity-50 transition"> Th\xEAm v\xE0o gi\u1ECF </button></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/product/ProductCard.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as _, useWishlistStore as u };
//# sourceMappingURL=ProductCard-KEPk7OKU.mjs.map
