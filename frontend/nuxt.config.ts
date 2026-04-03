export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },

  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    '@vueuse/nuxt',
    '@nuxtjs/i18n',
  ],

  runtimeConfig: {
    public: {
      apiBase:    process.env.NUXT_PUBLIC_API_BASE    || 'http://localhost:8000/api',
      reverbKey:  process.env.NUXT_PUBLIC_REVERB_KEY  || 'local',
      reverbHost: process.env.NUXT_PUBLIC_REVERB_HOST || 'localhost',
      reverbPort: process.env.NUXT_PUBLIC_REVERB_PORT || '8080',
      appName:    process.env.NUXT_PUBLIC_APP_NAME    || 'Storefront PWA',
    },
  },

  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
    head: {
      link: [{ rel: 'preconnect', href: 'https://fonts.bunny.net' }],
    },
  },

  css: ['~/assets/css/tailwind.css', '~/assets/css/transitions.css'],

  nitro: {
    prerender: {
      crawlLinks: false,
      routes: ['/'],
    },
  },

  i18n: {
    defaultLocale: 'vi',
    locales: [{ code: 'vi', name: 'Tiếng Việt' }],
    bundle: {
      optimizeTranslationDirective: false,
    },
  },

  typescript: { strict: true },
})
