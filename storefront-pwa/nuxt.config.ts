export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },

  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    '@nuxt/image',
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

  image: {
    screens: { xs: 320, sm: 640, md: 768, lg: 1024, xl: 1280 },
    presets: {
      product: { modifiers: { format: 'webp', quality: 80 } },
      thumb:   { modifiers: { width: 200, height: 200, format: 'webp' } },
    },
  },

  nitro: {
    prerender: {
      crawlLinks: false,
      routes: ['/'],
    },
  },

  i18n: {
    defaultLocale: 'vi',
    locales: [{ code: 'vi', name: 'Tiếng Việt' }],
  },

  typescript: { strict: true },
})
