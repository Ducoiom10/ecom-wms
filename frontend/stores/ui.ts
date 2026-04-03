export interface Toast {
  id: string
  message: string
  type: 'success' | 'error' | 'warning' | 'info'
  duration?: number
}

export const useUiStore = defineStore('ui', () => {
  const isSidebarOpen = ref(false)
  const isCartOpen    = ref(false)
  const toasts        = ref<Toast[]>([])
  const modals        = ref<Record<string, boolean>>({})

  const toggleCart    = () => { isCartOpen.value = !isCartOpen.value }
  const toggleSidebar = () => { isSidebarOpen.value = !isSidebarOpen.value }

  const addToast = (message: string, type: Toast['type'] = 'info', duration = 3000) => {
    const id = Math.random().toString(36).slice(2, 9)
    toasts.value.push({ id, message, type, duration })
    setTimeout(() => { toasts.value = toasts.value.filter(t => t.id !== id) }, duration)
  }

  const openModal  = (name: string) => { modals.value[name] = true }
  const closeModal = (name: string) => { modals.value[name] = false }

  return {
    isSidebarOpen: readonly(isSidebarOpen),
    isCartOpen:    readonly(isCartOpen),
    toasts:        readonly(toasts),
    modals:        readonly(modals),
    toggleCart,
    toggleSidebar,
    addToast,
    openModal,
    closeModal,
  }
})
