import { ref, computed, readonly } from 'file://C:/laragon/www/ecom-wms/storefront-pwa/node_modules/vue/index.mjs';
import { defineStore } from 'file://C:/laragon/www/ecom-wms/storefront-pwa/node_modules/pinia/dist/pinia.prod.cjs';
import { u as useUiStore } from './ui-CDZkXfd4.mjs';

const useCartStore = defineStore("cart", () => {
  const cart = ref(null);
  const loading = ref(false);
  const itemCount = computed(() => {
    var _a, _b;
    return (_b = (_a = cart.value) == null ? void 0 : _a.items.reduce((s, i) => s + i.quantity, 0)) != null ? _b : 0;
  });
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
      useUiStore().addToast("Th\xEAm v\xE0o gi\u1ECF th\xE0nh c\xF4ng", "success");
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
      useUiStore().addToast("\xC1p d\u1EE5ng m\xE3 khuy\u1EBFn m\xE3i th\xE0nh c\xF4ng", "success");
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

export { useCartStore as u };
//# sourceMappingURL=cart-TRz18UDQ.mjs.map
