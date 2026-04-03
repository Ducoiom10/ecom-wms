export const useApi = () => {
  const config    = useRuntimeConfig()
  const authStore = useAuthStore()
  const uiStore   = useUiStore()

  return $fetch.create({
    baseURL: config.public.apiBase,
    credentials: 'include',

    onRequest({ options }) {
      if (authStore.token) {
        const headers = new Headers(options.headers)
        headers.set('Authorization', `Bearer ${authStore.token}`)
        options.headers = headers
      }
    },

    onResponseError({ response }) {
      if (response.status === 401) {
        authStore.logout()
        navigateTo('/login')
        uiStore.addToast('Phiên đăng nhập hết hạn', 'error')
      } else if (response.status === 403) {
        uiStore.addToast('Bạn không có quyền truy cập', 'error')
      } else if (response.status >= 500) {
        uiStore.addToast('Lỗi máy chủ. Vui lòng thử lại sau', 'error')
      }
    },
  })
}
