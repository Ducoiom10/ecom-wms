import { ref, computed, readonly } from "vue";
import "C:/laragon/www/ecom-wms/storefront-pwa/node_modules/hookable/dist/index.mjs";
import "../server.mjs";
import "C:/laragon/www/ecom-wms/storefront-pwa/node_modules/klona/dist/index.mjs";
import "#internal/nuxt/paths";
import "C:/laragon/www/ecom-wms/storefront-pwa/node_modules/defu/dist/defu.mjs";
import { defineStore } from "pinia";
import { u as useUiStore } from "./ui-CDZkXfd4.js";
const useCartStore = defineStore("cart", () => {
  const cart = ref(null);
  const loading = ref(false);
  const itemCount = computed(() => cart.value?.items.reduce((s, i) => s + i.quantity, 0) ?? 0);
  const fetchCart = async () => {
    loading.value = true;
    try {
      cart.value = await useCartApi().getCart();
    } finally {
      loading.value = false;
    }
  };
  const addToCart = async (productId, quantity, variantId) => {
    loading.value = true;
    try {
      cart.value = await useCartApi().addItem(productId, quantity, variantId);
      useUiStore().addToast("Thêm vào giỏ thành công", "success");
    } finally {
      loading.value = false;
    }
  };
  const updateQuantity = async (productId, quantity, variantId) => {
    loading.value = true;
    try {
      cart.value = await useCartApi().updateItem(productId, quantity, variantId);
    } finally {
      loading.value = false;
    }
  };
  const removeItem = async (productId, variantId) => {
    loading.value = true;
    try {
      cart.value = await useCartApi().removeItem(productId, variantId);
    } finally {
      loading.value = false;
    }
  };
  const applyCoupon = async (code) => {
    loading.value = true;
    try {
      cart.value = await useCartApi().applyCoupon(code);
      useUiStore().addToast("Áp dụng mã khuyến mãi thành công", "success");
    } finally {
      loading.value = false;
    }
  };
  return {
    cart: readonly(cart),
    loading: readonly(loading),
    itemCount,
    fetchCart,
    addToCart,
    updateQuantity,
    removeItem,
    applyCoupon
  };
});
export {
  useCartStore as u
};
//# sourceMappingURL=cart-TRz18UDQ.js.map
