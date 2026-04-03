export default defineNuxtPlugin(async () => {
  const authStore     = useAuthStore()
  const wishlistStore = useWishlistStore()

  authStore.hydrate()
  await wishlistStore.hydrate()
})
