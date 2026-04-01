import { e as defineNuxtRouteMiddleware, n as navigateTo } from './server.mjs';
import { u as useAuthStore } from './auth-rbnhynP_.mjs';
import 'file://C:/laragon/www/ecom-wms/storefront-pwa/node_modules/vue/index.mjs';
import 'file://C:/laragon/www/ecom-wms/storefront-pwa/node_modules/ofetch/dist/node.mjs';
import '../_/nitro.mjs';
import 'file://C:/laragon/www/ecom-wms/storefront-pwa/node_modules/h3/dist/index.mjs';
import 'file://C:/laragon/www/ecom-wms/storefront-pwa/node_modules/destr/dist/index.mjs';
import 'file://C:/laragon/www/ecom-wms/storefront-pwa/node_modules/hookable/dist/index.mjs';
import 'file://C:/laragon/www/ecom-wms/storefront-pwa/node_modules/node-mock-http/dist/index.mjs';
import 'file://C:/laragon/www/ecom-wms/storefront-pwa/node_modules/klona/dist/index.mjs';
import 'file://C:/laragon/www/ecom-wms/storefront-pwa/node_modules/defu/dist/defu.mjs';
import 'file://C:/laragon/www/ecom-wms/storefront-pwa/node_modules/scule/dist/index.mjs';
import 'file://C:/laragon/www/ecom-wms/storefront-pwa/node_modules/radix3/dist/index.mjs';
import 'node:fs';
import 'node:url';
import 'file://C:/laragon/www/ecom-wms/storefront-pwa/node_modules/pathe/dist/index.mjs';
import 'file://C:/laragon/www/ecom-wms/storefront-pwa/node_modules/ipx/dist/index.mjs';
import 'file://C:/laragon/www/ecom-wms/storefront-pwa/node_modules/unstorage/dist/index.mjs';
import 'file://C:/laragon/www/ecom-wms/storefront-pwa/node_modules/unstorage/drivers/fs.mjs';
import 'file:///C:/laragon/www/ecom-wms/storefront-pwa/node_modules/@nuxt/nitro-server/dist/runtime/utils/cache-driver.js';
import 'file://C:/laragon/www/ecom-wms/storefront-pwa/node_modules/unstorage/drivers/fs-lite.mjs';
import 'file://C:/laragon/www/ecom-wms/storefront-pwa/node_modules/ohash/dist/index.mjs';
import 'file://C:/laragon/www/ecom-wms/storefront-pwa/node_modules/unctx/dist/index.mjs';
import 'file://C:/laragon/www/ecom-wms/storefront-pwa/node_modules/pinia/dist/pinia.prod.cjs';
import 'file://C:/laragon/www/ecom-wms/storefront-pwa/node_modules/vue-router/vue-router.node.mjs';
import 'file://C:/laragon/www/ecom-wms/storefront-pwa/node_modules/nuxt/node_modules/cookie-es/dist/index.mjs';
import 'file://C:/laragon/www/ecom-wms/storefront-pwa/node_modules/vue-devtools-stub/dist/index.mjs';
import 'file://C:/laragon/www/ecom-wms/storefront-pwa/node_modules/vue/server-renderer/index.mjs';

const guest = defineNuxtRouteMiddleware(() => {
  const authStore = useAuthStore();
  if (authStore.isLoggedIn) {
    return navigateTo("/");
  }
});

export { guest as default };
//# sourceMappingURL=guest-C5ikP5Cj.mjs.map
