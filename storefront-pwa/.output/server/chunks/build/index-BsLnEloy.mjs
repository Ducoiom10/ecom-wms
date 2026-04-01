import { _ as __nuxt_component_1 } from './SkeletonCard-Dzn9IcWD.mjs';
import { _ as _sfc_main$1 } from './ProductCard-KEPk7OKU.mjs';
import { defineComponent, withAsyncContext, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderList, ssrRenderComponent } from 'vue/server-renderer';
import { u as useAsyncData } from './asyncData-DBk6s2t8.mjs';
import './server.mjs';
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
import './nuxt-link-B2doaXW1.mjs';
import './cart-TRz18UDQ.mjs';
import './ui-CDZkXfd4.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const { data: products, pending } = ([__temp, __restore] = withAsyncContext(() => useAsyncData(
      "home-products",
      () => useProductApi().getAll({ limit: 8 })
    )), __temp = await __temp, __restore(), __temp);
    return (_ctx, _push, _parent, _attrs) => {
      var _a;
      const _component_UiSkeletonCard = __nuxt_component_1;
      const _component_ProductCard = _sfc_main$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "max-w-7xl mx-auto px-4 py-12" }, _attrs))}><h1 class="text-3xl font-bold mb-8">S\u1EA3n ph\u1EA9m n\u1ED5i b\u1EADt</h1>`);
      if (unref(pending)) {
        _push(`<div class="grid grid-cols-2 md:grid-cols-4 gap-6"><!--[-->`);
        ssrRenderList(8, (i) => {
          _push(ssrRenderComponent(_component_UiSkeletonCard, { key: i }, null, _parent));
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<div class="grid grid-cols-2 md:grid-cols-4 gap-6"><!--[-->`);
        ssrRenderList((_a = unref(products)) == null ? void 0 : _a.data, (p) => {
          _push(ssrRenderComponent(_component_ProductCard, {
            key: p.id,
            product: p
          }, null, _parent));
        });
        _push(`<!--]--></div>`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-BsLnEloy.mjs.map
