import type { ComputedRef, MaybeRef } from 'vue'

type ComponentProps<T> = T extends new(...args: any) => { $props: infer P } ? NonNullable<P>
  : T extends (props: infer P, ...args: any) => any ? P
  : {}

declare module 'nuxt/app' {
  interface NuxtLayouts {
    account: ComponentProps<typeof import("C:/laragon/www/ecom-wms/storefront-pwa/layouts/account.vue").default>,
    checkout: ComponentProps<typeof import("C:/laragon/www/ecom-wms/storefront-pwa/layouts/checkout.vue").default>,
    default: ComponentProps<typeof import("C:/laragon/www/ecom-wms/storefront-pwa/layouts/default.vue").default>,
}
  export type LayoutKey = keyof NuxtLayouts extends never ? string : keyof NuxtLayouts
  interface PageMeta {
    layout?: MaybeRef<LayoutKey | false> | ComputedRef<LayoutKey | false>
  }
}