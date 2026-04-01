import { e as defineNuxtRouteMiddleware, n as navigateTo } from './server.mjs';
import { u as useAuthStore } from './auth-rbnhynP_.mjs';
import 'vue';
import '../_/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:url';
import 'ipx';
import 'node:path';
import 'node:crypto';
import 'pinia';
import 'vue-router';
import 'vue/server-renderer';

const auth = defineNuxtRouteMiddleware(() => {
  const authStore = useAuthStore();
  if (!authStore.isLoggedIn) {
    return navigateTo("/login");
  }
});

export { auth as default };
//# sourceMappingURL=auth-p0DWUmXq.mjs.map
