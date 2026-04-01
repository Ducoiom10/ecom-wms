import { n as navigateTo, a as useRuntimeConfig } from "../server.mjs";
import { u as useAuthStore } from "./auth-rbnhynP_.js";
import { u as useUiStore } from "./ui-CDZkXfd4.js";
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
        uiStore.addToast("Phiên đăng nhập hết hạn", "error");
      } else if (response.status === 403) {
        uiStore.addToast("Bạn không có quyền truy cập", "error");
      } else if (response.status >= 500) {
        uiStore.addToast("Lỗi máy chủ. Vui lòng thử lại sau", "error");
      }
    }
  });
};
export {
  useApi as u
};
//# sourceMappingURL=useApi-BXP922BC.js.map
