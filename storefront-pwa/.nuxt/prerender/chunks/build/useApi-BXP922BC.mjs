import { n as navigateTo, a as useRuntimeConfig } from './server.mjs';
import { u as useAuthStore } from './auth-rbnhynP_.mjs';
import { u as useUiStore } from './ui-CDZkXfd4.mjs';

const useApi = () => {
  const config = useRuntimeConfig();
  const authStore = useAuthStore();
  const uiStore = useUiStore();
  return $fetch.create({
    baseURL: config.public.apiBase,
    credentials: "include",
    onRequest({ options }) {
      if (authStore.token) {
        options.headers = {
          ...options.headers,
          Authorization: `Bearer ${authStore.token}`
        };
      }
    },
    onResponseError({ response }) {
      if (response.status === 401) {
        authStore.logout();
        navigateTo("/login");
        uiStore.addToast("Phi\xEAn \u0111\u0103ng nh\u1EADp h\u1EBFt h\u1EA1n", "error");
      } else if (response.status === 403) {
        uiStore.addToast("B\u1EA1n kh\xF4ng c\xF3 quy\u1EC1n truy c\u1EADp", "error");
      } else if (response.status >= 500) {
        uiStore.addToast("L\u1ED7i m\xE1y ch\u1EE7. Vui l\xF2ng th\u1EED l\u1EA1i sau", "error");
      }
    }
  });
};

export { useApi as u };
//# sourceMappingURL=useApi-BXP922BC.mjs.map
