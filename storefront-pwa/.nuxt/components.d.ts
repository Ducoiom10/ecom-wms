
import type { DefineComponent, SlotsType } from 'vue'
type IslandComponent<T> = DefineComponent<{}, {refresh: () => Promise<void>}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, SlotsType<{ fallback: { error: unknown } }>> & T

type HydrationStrategies = {
  hydrateOnVisible?: IntersectionObserverInit | true
  hydrateOnIdle?: number | true
  hydrateOnInteraction?: keyof HTMLElementEventMap | Array<keyof HTMLElementEventMap> | true
  hydrateOnMediaQuery?: string
  hydrateAfter?: number
  hydrateWhen?: boolean
  hydrateNever?: true
}
type LazyComponent<T> = DefineComponent<HydrationStrategies, {}, {}, {}, {}, {}, {}, { hydrated: () => void }> & T


export const CartItem: typeof import("../components/cart/CartItem.vue")['default']
export const CartSlideOverCart: typeof import("../components/cart/SlideOverCart.vue")['default']
export const CommonFooter: typeof import("../components/common/Footer.vue")['default']
export const CommonHeader: typeof import("../components/common/Header.vue")['default']
export const ProductCard: typeof import("../components/product/ProductCard.vue")['default']
export const ProductCatalogSidebar: typeof import("../components/product/ProductCatalogSidebar.vue")['default']
export const ProductGallery: typeof import("../components/product/ProductGallery.vue")['default']
export const ProductStockIndicator: typeof import("../components/product/ProductStockIndicator.vue")['default']
export const ProductVariantSelector: typeof import("../components/product/ProductVariantSelector.vue")['default']
export const ProductReviewForm: typeof import("../components/product/ReviewForm.vue")['default']
export const ProductReviewList: typeof import("../components/product/ReviewList.vue")['default']
export const UiEmptyState: typeof import("../components/ui/EmptyState.vue")['default']
export const UiPagination: typeof import("../components/ui/Pagination.vue")['default']
export const UiSkeletonCard: typeof import("../components/ui/SkeletonCard.vue")['default']
export const UiSkeletonText: typeof import("../components/ui/SkeletonText.vue")['default']
export const UiToastContainer: typeof import("../components/ui/ToastContainer.vue")['default']
export const NuxtWelcome: typeof import("../node_modules/nuxt/dist/app/components/welcome.vue")['default']
export const NuxtLayout: typeof import("../node_modules/nuxt/dist/app/components/nuxt-layout")['default']
export const NuxtErrorBoundary: typeof import("../node_modules/nuxt/dist/app/components/nuxt-error-boundary.vue")['default']
export const ClientOnly: typeof import("../node_modules/nuxt/dist/app/components/client-only")['default']
export const DevOnly: typeof import("../node_modules/nuxt/dist/app/components/dev-only")['default']
export const ServerPlaceholder: typeof import("../node_modules/nuxt/dist/app/components/server-placeholder")['default']
export const NuxtLink: typeof import("../node_modules/nuxt/dist/app/components/nuxt-link")['default']
export const NuxtLoadingIndicator: typeof import("../node_modules/nuxt/dist/app/components/nuxt-loading-indicator")['default']
export const NuxtTime: typeof import("../node_modules/nuxt/dist/app/components/nuxt-time.vue")['default']
export const NuxtRouteAnnouncer: typeof import("../node_modules/nuxt/dist/app/components/nuxt-route-announcer")['default']
export const NuxtImg: typeof import("../node_modules/@nuxt/image/dist/runtime/components/NuxtImg.vue")['default']
export const NuxtPicture: typeof import("../node_modules/@nuxt/image/dist/runtime/components/NuxtPicture.vue")['default']
export const NuxtLinkLocale: typeof import("../node_modules/@nuxtjs/i18n/dist/runtime/components/NuxtLinkLocale")['default']
export const SwitchLocalePathLink: typeof import("../node_modules/@nuxtjs/i18n/dist/runtime/components/SwitchLocalePathLink")['default']
export const NuxtPage: typeof import("../node_modules/nuxt/dist/pages/runtime/page")['default']
export const NoScript: typeof import("../node_modules/nuxt/dist/head/runtime/components")['NoScript']
export const Link: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Link']
export const Base: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Base']
export const Title: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Title']
export const Meta: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Meta']
export const Style: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Style']
export const Head: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Head']
export const Html: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Html']
export const Body: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Body']
export const NuxtIsland: typeof import("../node_modules/nuxt/dist/app/components/nuxt-island")['default']
export const LazyCartItem: LazyComponent<typeof import("../components/cart/CartItem.vue")['default']>
export const LazyCartSlideOverCart: LazyComponent<typeof import("../components/cart/SlideOverCart.vue")['default']>
export const LazyCommonFooter: LazyComponent<typeof import("../components/common/Footer.vue")['default']>
export const LazyCommonHeader: LazyComponent<typeof import("../components/common/Header.vue")['default']>
export const LazyProductCard: LazyComponent<typeof import("../components/product/ProductCard.vue")['default']>
export const LazyProductCatalogSidebar: LazyComponent<typeof import("../components/product/ProductCatalogSidebar.vue")['default']>
export const LazyProductGallery: LazyComponent<typeof import("../components/product/ProductGallery.vue")['default']>
export const LazyProductStockIndicator: LazyComponent<typeof import("../components/product/ProductStockIndicator.vue")['default']>
export const LazyProductVariantSelector: LazyComponent<typeof import("../components/product/ProductVariantSelector.vue")['default']>
export const LazyProductReviewForm: LazyComponent<typeof import("../components/product/ReviewForm.vue")['default']>
export const LazyProductReviewList: LazyComponent<typeof import("../components/product/ReviewList.vue")['default']>
export const LazyUiEmptyState: LazyComponent<typeof import("../components/ui/EmptyState.vue")['default']>
export const LazyUiPagination: LazyComponent<typeof import("../components/ui/Pagination.vue")['default']>
export const LazyUiSkeletonCard: LazyComponent<typeof import("../components/ui/SkeletonCard.vue")['default']>
export const LazyUiSkeletonText: LazyComponent<typeof import("../components/ui/SkeletonText.vue")['default']>
export const LazyUiToastContainer: LazyComponent<typeof import("../components/ui/ToastContainer.vue")['default']>
export const LazyNuxtWelcome: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/welcome.vue")['default']>
export const LazyNuxtLayout: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-layout")['default']>
export const LazyNuxtErrorBoundary: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-error-boundary.vue")['default']>
export const LazyClientOnly: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/client-only")['default']>
export const LazyDevOnly: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/dev-only")['default']>
export const LazyServerPlaceholder: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/server-placeholder")['default']>
export const LazyNuxtLink: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-link")['default']>
export const LazyNuxtLoadingIndicator: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-loading-indicator")['default']>
export const LazyNuxtTime: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-time.vue")['default']>
export const LazyNuxtRouteAnnouncer: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-route-announcer")['default']>
export const LazyNuxtImg: LazyComponent<typeof import("../node_modules/@nuxt/image/dist/runtime/components/NuxtImg.vue")['default']>
export const LazyNuxtPicture: LazyComponent<typeof import("../node_modules/@nuxt/image/dist/runtime/components/NuxtPicture.vue")['default']>
export const LazyNuxtLinkLocale: LazyComponent<typeof import("../node_modules/@nuxtjs/i18n/dist/runtime/components/NuxtLinkLocale")['default']>
export const LazySwitchLocalePathLink: LazyComponent<typeof import("../node_modules/@nuxtjs/i18n/dist/runtime/components/SwitchLocalePathLink")['default']>
export const LazyNuxtPage: LazyComponent<typeof import("../node_modules/nuxt/dist/pages/runtime/page")['default']>
export const LazyNoScript: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['NoScript']>
export const LazyLink: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Link']>
export const LazyBase: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Base']>
export const LazyTitle: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Title']>
export const LazyMeta: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Meta']>
export const LazyStyle: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Style']>
export const LazyHead: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Head']>
export const LazyHtml: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Html']>
export const LazyBody: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Body']>
export const LazyNuxtIsland: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-island")['default']>

export const componentNames: string[]
