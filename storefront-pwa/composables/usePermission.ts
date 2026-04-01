export const usePermission = () => {
  const authStore = useAuthStore()
  const user = computed(() => authStore.user as any)

  const can = (permission: string): boolean =>
    user.value?.role === 'admin'
    || user.value?.permissions?.includes(permission)
    || false

  const cannot = (permission: string): boolean => !can(permission)

  const hasRole = (role: string | string[]): boolean => {
    const roles = Array.isArray(role) ? role : [role]
    return roles.includes(user.value?.role ?? '')
  }

  return { can, cannot, hasRole }
}
