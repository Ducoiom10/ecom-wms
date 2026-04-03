export const useAuthApi = () => {
  const api = useApi()

  return {
    register:      (name: string, email: string, password: string, password_confirmation: string) =>
      api('auth/register', { method: 'POST', body: { name, email, password, password_confirmation } }),
    login:         (email: string, password: string) =>
      api('auth/login', { method: 'POST', body: { email, password } }),
    logout:        () => api('auth/logout', { method: 'POST' }),
    me:            () => api('auth/me'),
    updateProfile: (payload: any) => api('auth/profile', { method: 'PUT', body: payload }),
  }
}
