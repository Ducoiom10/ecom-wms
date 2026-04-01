import type { User } from '~/types/models.types'

export const useAuthStore = defineStore('auth', () => {
  const token   = ref<string | null>(null)
  const user    = ref<User | null>(null)
  const loading = ref(false)

  const isLoggedIn = computed(() => !!token.value)

  const login = async (email: string, password: string) => {
    loading.value = true
    try {
      const data: any = await useAuthApi().login(email, password)
      token.value = data.token
      user.value  = data.user
      if (import.meta.client) localStorage.setItem('token', data.token)
    } finally {
      loading.value = false
    }
  }

  const logout = async () => {
    try { await useAuthApi().logout() } catch {}
    token.value = null
    user.value  = null
    if (import.meta.client) localStorage.removeItem('token')
    navigateTo('/login')
  }

  const loadProfile = async () => {
    if (!token.value) return
    try {
      user.value = await useAuthApi().me() as User
    } catch {
      logout()
    }
  }

  const hydrate = () => {
    if (!import.meta.client) return
    const saved = localStorage.getItem('token')
    if (saved && !token.value) {
      token.value = saved
      loadProfile()
    }
  }

  return {
    token:     readonly(token),
    user:      readonly(user),
    loading:   readonly(loading),
    isLoggedIn,
    login,
    logout,
    loadProfile,
    hydrate,
  }
})
