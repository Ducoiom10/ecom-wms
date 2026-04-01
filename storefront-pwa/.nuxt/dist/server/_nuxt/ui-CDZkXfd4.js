import { ref, readonly } from "vue";
import "C:/laragon/www/ecom-wms/storefront-pwa/node_modules/hookable/dist/index.mjs";
import "../server.mjs";
import "C:/laragon/www/ecom-wms/storefront-pwa/node_modules/klona/dist/index.mjs";
import "#internal/nuxt/paths";
import "C:/laragon/www/ecom-wms/storefront-pwa/node_modules/defu/dist/defu.mjs";
import { defineStore } from "pinia";
const useUiStore = defineStore("ui", () => {
  const isSidebarOpen = ref(false);
  const isCartOpen = ref(false);
  const toasts = ref([]);
  const modals = ref({});
  const toggleCart = () => {
    isCartOpen.value = !isCartOpen.value;
  };
  const toggleSidebar = () => {
    isSidebarOpen.value = !isSidebarOpen.value;
  };
  const addToast = (message, type = "info", duration = 3e3) => {
    const id = Math.random().toString(36).slice(2, 9);
    toasts.value.push({ id, message, type, duration });
    setTimeout(() => {
      toasts.value = toasts.value.filter((t) => t.id !== id);
    }, duration);
  };
  const openModal = (name) => {
    modals.value[name] = true;
  };
  const closeModal = (name) => {
    modals.value[name] = false;
  };
  return {
    isSidebarOpen: readonly(isSidebarOpen),
    isCartOpen: readonly(isCartOpen),
    toasts: readonly(toasts),
    modals: readonly(modals),
    toggleCart,
    toggleSidebar,
    addToast,
    openModal,
    closeModal
  };
});
export {
  useUiStore as u
};
//# sourceMappingURL=ui-CDZkXfd4.js.map
