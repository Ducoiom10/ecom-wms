export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive('can', (el, binding) => {
    const authStore = useAuthStore()
    const perm = binding.value
    const user = authStore.user as any

    const allowed = user?.permissions?.includes(perm)
      || user?.role === 'admin'

    if (!allowed) {
      el.style.display = 'none'
    }
  })

  nuxtApp.vueApp.directive('role', (el, binding) => {
    const authStore = useAuthStore()
    const user = authStore.user as any
    const roles = Array.isArray(binding.value) ? binding.value : [binding.value]

    if (!roles.includes(user?.role)) {
      el.style.display = 'none'
    }
  })
})
