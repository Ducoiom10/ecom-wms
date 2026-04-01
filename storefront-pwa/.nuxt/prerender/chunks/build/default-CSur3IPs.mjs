import { _ as __nuxt_component_0 } from './nuxt-link-B2doaXW1.mjs';
import { mergeProps, defineComponent, ref, computed, watch, withCtx, createTextVNode, unref, createVNode, toDisplayString, resolveComponent, toValue, getCurrentScope, onScopeDispose, useSSRContext } from 'file://C:/laragon/www/ecom-wms/storefront-pwa/node_modules/vue/index.mjs';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderSlot, ssrRenderAttr, ssrRenderList, ssrInterpolate, ssrRenderTeleport, ssrIncludeBooleanAttr, ssrRenderClass } from 'file://C:/laragon/www/ecom-wms/storefront-pwa/node_modules/vue/server-renderer/index.mjs';
import { u as useUiStore } from './ui-CDZkXfd4.mjs';
import { u as useCartStore } from './cart-TRz18UDQ.mjs';
import { u as useAuthStore } from './auth-rbnhynP_.mjs';
import { _ as _export_sfc, f as useRouter } from './server.mjs';
import 'file://C:/laragon/www/ecom-wms/storefront-pwa/node_modules/pinia/dist/pinia.prod.cjs';
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
import 'file://C:/laragon/www/ecom-wms/storefront-pwa/node_modules/vue-router/vue-router.node.mjs';
import 'file://C:/laragon/www/ecom-wms/storefront-pwa/node_modules/nuxt/node_modules/cookie-es/dist/index.mjs';
import 'file://C:/laragon/www/ecom-wms/storefront-pwa/node_modules/vue-devtools-stub/dist/index.mjs';

function tryOnScopeDispose(fn) {
  if (getCurrentScope()) {
    onScopeDispose(fn);
    return true;
  }
  return false;
}
typeof WorkerGlobalScope !== "undefined" && globalThis instanceof WorkerGlobalScope;
const toString = Object.prototype.toString;
const isObject = (val) => toString.call(val) === "[object Object]";
const noop = () => {
};
function toArray(value) {
  return Array.isArray(value) ? value : [value];
}
function watchImmediate(source, cb, options) {
  return watch(
    source,
    cb,
    {
      ...options,
      immediate: true
    }
  );
}
const defaultWindow = void 0;
function unrefElement(elRef) {
  var _a;
  const plain = toValue(elRef);
  return (_a = plain == null ? void 0 : plain.$el) != null ? _a : plain;
}
function useEventListener(...args) {
  const cleanups = [];
  const cleanup = () => {
    cleanups.forEach((fn) => fn());
    cleanups.length = 0;
  };
  const register = (el, event, listener, options) => {
    el.addEventListener(event, listener, options);
    return () => el.removeEventListener(event, listener, options);
  };
  const firstParamTargets = computed(() => {
    const test = toArray(toValue(args[0])).filter((e) => e != null);
    return test.every((e) => typeof e !== "string") ? test : void 0;
  });
  const stopWatch = watchImmediate(
    () => {
      var _a, _b;
      return [
        (_b = (_a = firstParamTargets.value) == null ? void 0 : _a.map((e) => unrefElement(e))) != null ? _b : [defaultWindow].filter((e) => e != null),
        toArray(toValue(firstParamTargets.value ? args[1] : args[0])),
        toArray(unref(firstParamTargets.value ? args[2] : args[1])),
        // @ts-expect-error - TypeScript gets the correct types, but somehow still complains
        toValue(firstParamTargets.value ? args[3] : args[2])
      ];
    },
    ([raw_targets, raw_events, raw_listeners, raw_options]) => {
      cleanup();
      if (!(raw_targets == null ? void 0 : raw_targets.length) || !(raw_events == null ? void 0 : raw_events.length) || !(raw_listeners == null ? void 0 : raw_listeners.length))
        return;
      const optionsClone = isObject(raw_options) ? { ...raw_options } : raw_options;
      cleanups.push(
        ...raw_targets.flatMap(
          (el) => raw_events.flatMap(
            (event) => raw_listeners.map((listener) => register(el, event, listener, optionsClone))
          )
        )
      );
    },
    { flush: "post" }
  );
  const stop = () => {
    stopWatch();
    cleanup();
  };
  tryOnScopeDispose(cleanup);
  return stop;
}
function onClickOutside(target, handler, options = {}) {
  const { window: window2 = defaultWindow, ignore = [], capture = true, detectIframe = false, controls = false } = options;
  if (!window2) {
    return controls ? { stop: noop, cancel: noop, trigger: noop } : noop;
  }
  let shouldListen = true;
  const shouldIgnore = (event) => {
    return toValue(ignore).some((target2) => {
      if (typeof target2 === "string") {
        return Array.from(window2.document.querySelectorAll(target2)).some((el) => el === event.target || event.composedPath().includes(el));
      } else {
        const el = unrefElement(target2);
        return el && (event.target === el || event.composedPath().includes(el));
      }
    });
  };
  function hasMultipleRoots(target2) {
    const vm = toValue(target2);
    return vm && vm.$.subTree.shapeFlag === 16;
  }
  function checkMultipleRoots(target2, event) {
    const vm = toValue(target2);
    const children = vm.$.subTree && vm.$.subTree.children;
    if (children == null || !Array.isArray(children))
      return false;
    return children.some((child) => child.el === event.target || event.composedPath().includes(child.el));
  }
  const listener = (event) => {
    const el = unrefElement(target);
    if (event.target == null)
      return;
    if (!(el instanceof Element) && hasMultipleRoots(target) && checkMultipleRoots(target, event))
      return;
    if (!el || el === event.target || event.composedPath().includes(el))
      return;
    if ("detail" in event && event.detail === 0)
      shouldListen = !shouldIgnore(event);
    if (!shouldListen) {
      shouldListen = true;
      return;
    }
    handler(event);
  };
  let isProcessingClick = false;
  const cleanup = [
    useEventListener(window2, "click", (event) => {
      if (!isProcessingClick) {
        isProcessingClick = true;
        setTimeout(() => {
          isProcessingClick = false;
        }, 0);
        listener(event);
      }
    }, { passive: true, capture }),
    useEventListener(window2, "pointerdown", (e) => {
      const el = unrefElement(target);
      shouldListen = !shouldIgnore(e) && !!(el && !e.composedPath().includes(el));
    }, { passive: true }),
    detectIframe && useEventListener(window2, "blur", (event) => {
      setTimeout(() => {
        var _a;
        const el = unrefElement(target);
        if (((_a = window2.document.activeElement) == null ? void 0 : _a.tagName) === "IFRAME" && !(el == null ? void 0 : el.contains(window2.document.activeElement))) {
          handler(event);
        }
      }, 0);
    }, { passive: true })
  ].filter(Boolean);
  const stop = () => cleanup.forEach((fn) => fn());
  if (controls) {
    return {
      stop,
      cancel: () => {
        shouldListen = false;
      },
      trigger: (event) => {
        shouldListen = true;
        listener(event);
        shouldListen = false;
      }
    };
  }
  return stop;
}
const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  __name: "Header",
  __ssrInlineRender: true,
  setup(__props) {
    useUiStore();
    const cartStore = useCartStore();
    const authStore = useAuthStore();
    useRouter();
    const searchQ = ref("");
    const searchResults = ref([]);
    const dropdownOpen = ref(false);
    const dropdownRef = ref(null);
    const initials = computed(
      () => {
        var _a, _b, _c;
        return (_c = (_b = (_a = authStore.user) == null ? void 0 : _a.name) == null ? void 0 : _b.split(" ").map((w) => w[0]).slice(-2).join("").toUpperCase()) != null ? _c : "?";
      }
    );
    const accountMenu = [
      { to: "/account/orders", icon: "\u{1F4E6}", label: "\u0110\u01A1n h\xE0ng" },
      { to: "/account/loyalty", icon: "\u2B50", label: "\u0110i\u1EC3m th\u01B0\u1EDFng" },
      { to: "/account/addresses", icon: "\u{1F4CD}", label: "\u0110\u1ECBa ch\u1EC9" },
      { to: "/account/wishlist", icon: "\u2764\uFE0F", label: "Y\xEAu th\xEDch" },
      { to: "/account/profile", icon: "\u2699\uFE0F", label: "H\u1ED3 s\u01A1" }
    ];
    onClickOutside(dropdownRef, () => {
      dropdownOpen.value = false;
    });
    let searchTimer;
    watch(searchQ, (q) => {
      clearTimeout(searchTimer);
      if (!q.trim() || q.length < 2) {
        searchResults.value = [];
        return;
      }
      searchTimer = setTimeout(async () => {
        var _a;
        try {
          const res = await useProductApi().search(q, 5);
          searchResults.value = (_a = res == null ? void 0 : res.data) != null ? _a : [];
        } catch {
          searchResults.value = [];
        }
      }, 300);
    });
    return (_ctx, _push, _parent, _attrs) => {
      var _a;
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<header${ssrRenderAttrs(mergeProps({ class: "sticky top-0 z-40 bg-white border-b shadow-sm" }, _attrs))}><div class="max-w-7xl mx-auto px-4 h-16 flex items-center gap-4">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/",
        class: "text-xl font-bold text-indigo-600 flex-shrink-0"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`EcomWMS`);
          } else {
            return [
              createTextVNode("EcomWMS")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<nav class="hidden md:flex items-center gap-1 flex-1">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/",
        class: "px-3 py-2 text-sm text-gray-600 hover:text-indigo-600 rounded-lg hover:bg-gray-50 transition"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Trang ch\u1EE7 `);
          } else {
            return [
              createTextVNode(" Trang ch\u1EE7 ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/category",
        class: "px-3 py-2 text-sm text-gray-600 hover:text-indigo-600 rounded-lg hover:bg-gray-50 transition"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Danh m\u1EE5c `);
          } else {
            return [
              createTextVNode(" Danh m\u1EE5c ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</nav><div class="flex-1 max-w-sm relative hidden md:block"><input${ssrRenderAttr("value", unref(searchQ))} type="text" placeholder="T\xECm s\u1EA3n ph\u1EA9m..." class="w-full border rounded-lg pl-9 pr-3 py-2 text-sm focus:ring-2 focus:ring-indigo-400 focus:outline-none"><span class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">\u{1F50D}</span>`);
      if (unref(searchResults).length) {
        _push(`<div class="absolute top-full left-0 right-0 mt-1 bg-white border rounded-xl shadow-lg z-50 overflow-hidden"><!--[-->`);
        ssrRenderList(unref(searchResults), (p) => {
          _push(ssrRenderComponent(_component_NuxtLink, {
            key: p.id,
            to: `/products/${p.id}`,
            onClick: ($event) => {
              searchQ.value = "";
              searchResults.value = [];
            },
            class: "flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 transition text-sm"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<span class="font-medium truncate"${_scopeId}>${ssrInterpolate(p.name)}</span><span class="ml-auto text-red-600 font-semibold flex-shrink-0"${_scopeId}>${ssrInterpolate(new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(p.price))}</span>`);
              } else {
                return [
                  createVNode("span", { class: "font-medium truncate" }, toDisplayString(p.name), 1),
                  createVNode("span", { class: "ml-auto text-red-600 font-semibold flex-shrink-0" }, toDisplayString(new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(p.price)), 1)
                ];
              }
            }),
            _: 2
          }, _parent));
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="flex items-center gap-2 flex-shrink-0"><button class="relative p-2 hover:bg-gray-100 rounded-lg transition"><span class="text-xl">\u{1F6D2}</span>`);
      if (unref(cartStore).itemCount > 0) {
        _push(`<span class="absolute -top-0.5 -right-0.5 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">${ssrInterpolate(unref(cartStore).itemCount > 9 ? "9+" : unref(cartStore).itemCount)}</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</button>`);
      if (!unref(authStore).isLoggedIn) {
        _push(`<!--[-->`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/login",
          class: "text-sm font-medium text-indigo-600 hover:underline px-2"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`\u0110\u0103ng nh\u1EADp`);
            } else {
              return [
                createTextVNode("\u0110\u0103ng nh\u1EADp")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/register",
          class: "text-sm bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition hidden md:block"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` \u0110\u0103ng k\xFD `);
            } else {
              return [
                createTextVNode(" \u0110\u0103ng k\xFD ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`<!--]-->`);
      } else {
        _push(`<div class="relative"><button class="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition text-sm"><div class="w-7 h-7 rounded-full bg-indigo-100 text-indigo-600 font-bold text-xs flex items-center justify-center">${ssrInterpolate(unref(initials))}</div><span class="hidden md:block font-medium max-w-24 truncate">${ssrInterpolate((_a = unref(authStore).user) == null ? void 0 : _a.name)}</span><span class="text-gray-400 text-xs">\u25BE</span></button>`);
        if (unref(dropdownOpen)) {
          _push(`<div class="absolute right-0 top-full mt-1 w-48 bg-white border rounded-xl shadow-lg z-50 overflow-hidden origin-top-right"><!--[-->`);
          ssrRenderList(accountMenu, (item) => {
            _push(ssrRenderComponent(_component_NuxtLink, {
              key: item.to,
              to: item.to,
              onClick: ($event) => dropdownOpen.value = false,
              class: "flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition"
            }, {
              default: withCtx((_, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  _push2(`<span${_scopeId}>${ssrInterpolate(item.icon)}</span>${ssrInterpolate(item.label)}`);
                } else {
                  return [
                    createVNode("span", null, toDisplayString(item.icon), 1),
                    createTextVNode(toDisplayString(item.label), 1)
                  ];
                }
              }),
              _: 2
            }, _parent));
          });
          _push(`<!--]--><div class="border-t"></div><button class="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition"> \u{1F6AA} \u0110\u0103ng xu\u1EA5t </button></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      }
      _push(`</div></div></header>`);
    };
  }
});
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/common/Header.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const _sfc_main$3 = {};
function _sfc_ssrRender$1(_ctx, _push, _parent, _attrs) {
  _push(`<footer${ssrRenderAttrs(mergeProps({ class: "bg-gray-900 text-gray-400 py-8 mt-16" }, _attrs))}><div class="max-w-7xl mx-auto px-4 text-center text-sm"> \xA9 ${ssrInterpolate((/* @__PURE__ */ new Date()).getFullYear())} EcomWMS. All rights reserved. </div></footer>`);
}
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/common/Footer.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const __nuxt_component_1 = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["ssrRender", _sfc_ssrRender$1]]);
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "SlideOverCart",
  __ssrInlineRender: true,
  setup(__props) {
    const uiStore = useUiStore();
    const cartStore = useCartStore();
    const coupon = ref("");
    const items = computed(() => {
      var _a, _b;
      return (_b = (_a = cartStore.cart) == null ? void 0 : _a.items) != null ? _b : [];
    });
    const fmt = (n) => new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(n);
    watch(() => uiStore.isCartOpen, (open) => {
      if (open) cartStore.fetchCart();
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      const _component_CartCartItem = resolveComponent("CartCartItem");
      ssrRenderTeleport(_push, (_push2) => {
        var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k;
        if (unref(uiStore).isCartOpen) {
          _push2(`<div class="fixed inset-0 z-50 flex justify-end"><div class="absolute inset-0 bg-black/50"></div>`);
          if (unref(uiStore).isCartOpen) {
            _push2(`<div class="relative w-full max-w-md bg-white h-full flex flex-col shadow-xl"><div class="flex items-center justify-between px-5 py-4 border-b"><h2 class="font-bold text-lg">Gi\u1ECF h\xE0ng (${ssrInterpolate(unref(cartStore).itemCount)})</h2><button class="text-gray-400 hover:text-gray-600 text-2xl leading-none">\xD7</button></div><div class="flex-1 overflow-y-auto px-5 py-4 space-y-4">`);
            if (!unref(items).length) {
              _push2(`<p class="text-center text-gray-400 py-16"> Gi\u1ECF h\xE0ng tr\u1ED1ng.<br>`);
              _push2(ssrRenderComponent(_component_NuxtLink, {
                to: "/category",
                onClick: ($event) => unref(uiStore).toggleCart(),
                class: "text-indigo-600 hover:underline text-sm mt-2 inline-block"
              }, {
                default: withCtx((_, _push3, _parent2, _scopeId) => {
                  if (_push3) {
                    _push3(`Ti\u1EBFp t\u1EE5c mua s\u1EAFm`);
                  } else {
                    return [
                      createTextVNode("Ti\u1EBFp t\u1EE5c mua s\u1EAFm")
                    ];
                  }
                }),
                _: 1
              }, _parent));
              _push2(`</p>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<!--[-->`);
            ssrRenderList(unref(items), (item) => {
              _push2(ssrRenderComponent(_component_CartCartItem, {
                key: `${item.product_id}-${item.variant_id}`,
                item,
                onRemove: unref(cartStore).removeItem
              }, null, _parent));
            });
            _push2(`<!--]--></div>`);
            if (unref(items).length) {
              _push2(`<div class="px-5 py-3 border-t"><div class="flex gap-2"><input${ssrRenderAttr("value", unref(coupon))} placeholder="M\xE3 khuy\u1EBFn m\xE3i" class="flex-1 border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-400 focus:outline-none"><button${ssrIncludeBooleanAttr(!unref(coupon) || unref(cartStore).loading) ? " disabled" : ""} class="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-indigo-700 disabled:opacity-50"> \xC1p d\u1EE5ng </button></div>`);
              if ((_a = unref(cartStore).cart) == null ? void 0 : _a.coupon) {
                _push2(`<p class="text-green-600 text-xs mt-1">\u2713 \u0110\xE3 \xE1p d\u1EE5ng: ${ssrInterpolate(unref(cartStore).cart.coupon)}</p>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
            if (unref(items).length) {
              _push2(`<div class="px-5 py-4 border-t space-y-2 text-sm"><div class="flex justify-between text-gray-600"><span>T\u1EA1m t\xEDnh</span><span>${ssrInterpolate(fmt((_c = (_b = unref(cartStore).cart) == null ? void 0 : _b.subtotal) != null ? _c : 0))}</span></div><div class="flex justify-between text-gray-600"><span>Ph\xED v\u1EADn chuy\u1EC3n</span><span>${ssrInterpolate(fmt((_e = (_d = unref(cartStore).cart) == null ? void 0 : _d.shipping) != null ? _e : 0))}</span></div>`);
              if (((_g = (_f = unref(cartStore).cart) == null ? void 0 : _f.discount) != null ? _g : 0) > 0) {
                _push2(`<div class="flex justify-between text-green-600"><span>Gi\u1EA3m gi\xE1</span><span>-${ssrInterpolate(fmt((_i = (_h = unref(cartStore).cart) == null ? void 0 : _h.discount) != null ? _i : 0))}</span></div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`<div class="flex justify-between font-bold text-base pt-2 border-t"><span>T\u1ED5ng c\u1ED9ng</span><span class="text-red-600">${ssrInterpolate(fmt((_k = (_j = unref(cartStore).cart) == null ? void 0 : _j.total) != null ? _k : 0))}</span></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            if (unref(items).length) {
              _push2(`<div class="px-5 py-4 border-t">`);
              _push2(ssrRenderComponent(_component_NuxtLink, {
                to: "/checkout/shipping",
                onClick: ($event) => unref(uiStore).toggleCart(),
                class: "block w-full bg-indigo-600 text-white text-center py-3 rounded-lg font-semibold hover:bg-indigo-700 transition"
              }, {
                default: withCtx((_, _push3, _parent2, _scopeId) => {
                  if (_push3) {
                    _push3(` Thanh to\xE1n `);
                  } else {
                    return [
                      createTextVNode(" Thanh to\xE1n ")
                    ];
                  }
                }),
                _: 1
              }, _parent));
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div>`);
          } else {
            _push2(`<!---->`);
          }
          _push2(`</div>`);
        } else {
          _push2(`<!---->`);
        }
      }, "body", false, _parent);
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/cart/SlideOverCart.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "ToastContainer",
  __ssrInlineRender: true,
  setup(__props) {
    const uiStore = useUiStore();
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "fixed bottom-4 right-4 z-50 space-y-2" }, _attrs))}><!--[-->`);
      ssrRenderList(unref(uiStore).toasts, (t) => {
        _push(`<div class="${ssrRenderClass([{
          "bg-green-600": t.type === "success",
          "bg-red-600": t.type === "error",
          "bg-amber-500": t.type === "warning",
          "bg-blue-600": t.type === "info"
        }, "flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg text-white text-sm min-w-64"])}"><span>${ssrInterpolate(t.message)}</span></div>`);
      });
      _push(`<!--]--></div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/ToastContainer.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_CommonHeader = _sfc_main$4;
  const _component_CommonFooter = __nuxt_component_1;
  const _component_CartSlideOverCart = _sfc_main$2;
  const _component_UiToastContainer = _sfc_main$1;
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen flex flex-col bg-white" }, _attrs))}>`);
  _push(ssrRenderComponent(_component_CommonHeader, null, null, _parent));
  _push(`<main class="flex-1">`);
  ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
  _push(`</main>`);
  _push(ssrRenderComponent(_component_CommonFooter, null, null, _parent));
  _push(ssrRenderComponent(_component_CartSlideOverCart, null, null, _parent));
  _push(ssrRenderComponent(_component_UiToastContainer, null, null, _parent));
  _push(`</div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/default.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _default = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);

export { _default as default };
//# sourceMappingURL=default-CSur3IPs.mjs.map
