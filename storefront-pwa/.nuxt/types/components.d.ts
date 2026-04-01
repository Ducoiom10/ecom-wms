
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

interface _GlobalComponents {
  CartItem: typeof import("../../components/cart/CartItem.vue")['default']
  CartSlideOverCart: typeof import("../../components/cart/SlideOverCart.vue")['default']
  CommonFooter: typeof import("../../components/common/Footer.vue")['default']
  CommonHeader: typeof import("../../components/common/Header.vue")['default']
  ProductCard: typeof import("../../components/product/ProductCard.vue")['default']
  ProductCatalogSidebar: typeof import("../../components/product/ProductCatalogSidebar.vue")['default']
  ProductGallery: typeof import("../../components/product/ProductGallery.vue")['default']
  ProductStockIndicator: typeof import("../../components/product/ProductStockIndicator.vue")['default']
  ProductVariantSelector: typeof import("../../components/product/ProductVariantSelector.vue")['default']
  ProductReviewForm: typeof import("../../components/product/ReviewForm.vue")['default']
  ProductReviewList: typeof import("../../components/product/ReviewList.vue")['default']
  UiEmptyState: typeof import("../../components/ui/EmptyState.vue")['default']
  UiPagination: typeof import("../../components/ui/Pagination.vue")['default']
  UiSkeletonCard: typeof import("../../components/ui/SkeletonCard.vue")['default']
  UiSkeletonText: typeof import("../../components/ui/SkeletonText.vue")['default']
  UiToastContainer: typeof import("../../components/ui/ToastContainer.vue")['default']
  NuxtWelcome: typeof import("../../node_modules/nuxt/dist/app/components/welcome.vue")['default']
  NuxtLayout: typeof import("../../node_modules/nuxt/dist/app/components/nuxt-layout")['default']
  NuxtErrorBoundary: typeof import("../../node_modules/nuxt/dist/app/components/nuxt-error-boundary.vue")['default']
  ClientOnly: typeof import("../../node_modules/nuxt/dist/app/components/client-only")['default']
  DevOnly: typeof import("../../node_modules/nuxt/dist/app/components/dev-only")['default']
  ServerPlaceholder: typeof import("../../node_modules/nuxt/dist/app/components/server-placeholder")['default']
  NuxtLink: typeof import("../../node_modules/nuxt/dist/app/components/nuxt-link")['default']
  NuxtLoadingIndicator: typeof import("../../node_modules/nuxt/dist/app/components/nuxt-loading-indicator")['default']
  NuxtTime: typeof import("../../node_modules/nuxt/dist/app/components/nuxt-time.vue")['default']
  NuxtRouteAnnouncer: typeof import("../../node_modules/nuxt/dist/app/components/nuxt-route-announcer")['default']
  NuxtImg: typeof import("../../node_modules/@nuxt/image/dist/runtime/components/NuxtImg.vue")['default']
  NuxtPicture: typeof import("../../node_modules/@nuxt/image/dist/runtime/components/NuxtPicture.vue")['default']
  NuxtLinkLocale: typeof import("../../node_modules/@nuxtjs/i18n/dist/runtime/components/NuxtLinkLocale")['default']
  SwitchLocalePathLink: typeof import("../../node_modules/@nuxtjs/i18n/dist/runtime/components/SwitchLocalePathLink")['default']
  NuxtPage: typeof import("../../node_modules/nuxt/dist/pages/runtime/page")['default']
  NoScript: typeof import("../../node_modules/nuxt/dist/head/runtime/components")['NoScript']
  Link: typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Link']
  Base: typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Base']
  Title: typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Title']
  Meta: typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Meta']
  Style: typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Style']
  Head: typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Head']
  Html: typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Html']
  Body: typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Body']
  NuxtIsland: typeof import("../../node_modules/nuxt/dist/app/components/nuxt-island")['default']
  LazyCartItem: LazyComponent<typeof import("../../components/cart/CartItem.vue")['default']>
  LazyCartSlideOverCart: LazyComponent<typeof import("../../components/cart/SlideOverCart.vue")['default']>
  LazyCommonFooter: LazyComponent<typeof import("../../components/common/Footer.vue")['default']>
  LazyCommonHeader: LazyComponent<typeof import("../../components/common/Header.vue")['default']>
  LazyProductCard: LazyComponent<typeof import("../../components/product/ProductCard.vue")['default']>
  LazyProductCatalogSidebar: LazyComponent<typeof import("../../components/product/ProductCatalogSidebar.vue")['default']>
  LazyProductGallery: LazyComponent<typeof import("../../components/product/ProductGallery.vue")['default']>
  LazyProductStockIndicator: LazyComponent<typeof import("../../components/product/ProductStockIndicator.vue")['default']>
  LazyProductVariantSelector: LazyComponent<typeof import("../../components/product/ProductVariantSelector.vue")['default']>
  LazyProductReviewForm: LazyComponent<typeof import("../../components/product/ReviewForm.vue")['default']>
  LazyProductReviewList: LazyComponent<typeof import("../../components/product/ReviewList.vue")['default']>
  LazyUiEmptyState: LazyComponent<typeof import("../../components/ui/EmptyState.vue")['default']>
  LazyUiPagination: LazyComponent<typeof import("../../components/ui/Pagination.vue")['default']>
  LazyUiSkeletonCard: LazyComponent<typeof import("../../components/ui/SkeletonCard.vue")['default']>
  LazyUiSkeletonText: LazyComponent<typeof import("../../components/ui/SkeletonText.vue")['default']>
  LazyUiToastContainer: LazyComponent<typeof import("../../components/ui/ToastContainer.vue")['default']>
  LazyNuxtWelcome: LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/welcome.vue")['default']>
  LazyNuxtLayout: LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/nuxt-layout")['default']>
  LazyNuxtErrorBoundary: LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/nuxt-error-boundary.vue")['default']>
  LazyClientOnly: LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/client-only")['default']>
  LazyDevOnly: LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/dev-only")['default']>
  LazyServerPlaceholder: LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/server-placeholder")['default']>
  LazyNuxtLink: LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/nuxt-link")['default']>
  LazyNuxtLoadingIndicator: LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/nuxt-loading-indicator")['default']>
  LazyNuxtTime: LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/nuxt-time.vue")['default']>
  LazyNuxtRouteAnnouncer: LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/nuxt-route-announcer")['default']>
  LazyNuxtImg: LazyComponent<typeof import("../../node_modules/@nuxt/image/dist/runtime/components/NuxtImg.vue")['default']>
  LazyNuxtPicture: LazyComponent<typeof import("../../node_modules/@nuxt/image/dist/runtime/components/NuxtPicture.vue")['default']>
  LazyNuxtLinkLocale: LazyComponent<typeof import("../../node_modules/@nuxtjs/i18n/dist/runtime/components/NuxtLinkLocale")['default']>
  LazySwitchLocalePathLink: LazyComponent<typeof import("../../node_modules/@nuxtjs/i18n/dist/runtime/components/SwitchLocalePathLink")['default']>
  LazyNuxtPage: LazyComponent<typeof import("../../node_modules/nuxt/dist/pages/runtime/page")['default']>
  LazyNoScript: LazyComponent<typeof import("../../node_modules/nuxt/dist/head/runtime/components")['NoScript']>
  LazyLink: LazyComponent<typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Link']>
  LazyBase: LazyComponent<typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Base']>
  LazyTitle: LazyComponent<typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Title']>
  LazyMeta: LazyComponent<typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Meta']>
  LazyStyle: LazyComponent<typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Style']>
  LazyHead: LazyComponent<typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Head']>
  LazyHtml: LazyComponent<typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Html']>
  LazyBody: LazyComponent<typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Body']>
  LazyNuxtIsland: LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/nuxt-island")['default']>
}

declare module 'vue' {
  export interface GlobalComponents extends _GlobalComponents { }
}

export {}
