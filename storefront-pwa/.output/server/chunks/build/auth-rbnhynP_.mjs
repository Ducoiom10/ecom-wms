import { ref, computed, readonly } from 'vue';
import { n as navigateTo } from './server.mjs';
import { defineStore } from 'pinia';

const useAuthStore = defineStore("auth", () => {
  const token = ref(null);
  const user = ref(null);
  const loading = ref(false);
  const isLoggedIn = computed(() => !!token.value);
  const login = async (email, password) => {
    loading.value = true;
    try {
      const data = await useAuthApi().login(email, password);
      token.value = data.token;
      user.value = data.user;
      if (false) ;
    } finally {
      loading.value = false;
    }
  };
  const logout = async () => {
    try {
      await useAuthApi().logout();
    } catch {
    }
    token.value = null;
    user.value = null;
    navigateTo("/login");
  };
  const loadProfile = async () => {
    if (!token.value) return;
    try {
      user.value = await useAuthApi().me();
    } catch {
      logout();
    }
  };
  const hydrate = () => {
    return;
  };
  return {
    token: readonly(token),
    user: readonly(user),
    loading: readonly(loading),
    isLoggedIn,
    login,
    logout,
    loadProfile,
    hydrate
  };
});

export { useAuthStore as u };
//# sourceMappingURL=auth-rbnhynP_.mjs.map
