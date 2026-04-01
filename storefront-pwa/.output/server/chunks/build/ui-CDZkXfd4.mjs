import { ref, readonly } from 'vue';
import { defineStore } from 'pinia';

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

export { useUiStore as u };
//# sourceMappingURL=ui-CDZkXfd4.mjs.map
