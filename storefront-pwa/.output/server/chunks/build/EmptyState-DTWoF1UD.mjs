import { _ as __nuxt_component_0 } from './nuxt-link-B2doaXW1.mjs';
import { defineComponent, mergeProps, withCtx, createTextVNode, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderComponent } from 'vue/server-renderer';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "EmptyState",
  __ssrInlineRender: true,
  props: {
    icon: {},
    title: {},
    message: {},
    actionLink: {},
    actionLabel: {}
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "text-center py-12 px-4" }, _attrs))}><div class="text-5xl mb-4">${ssrInterpolate(__props.icon)}</div><p class="font-semibold text-gray-700 mb-1">${ssrInterpolate(__props.title)}</p><p class="text-sm text-gray-400 mb-5">${ssrInterpolate(__props.message)}</p>`);
      if (__props.actionLink) {
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: __props.actionLink,
          class: "inline-block bg-indigo-600 text-white px-5 py-2 rounded-lg text-sm font-semibold hover:bg-indigo-700"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(__props.actionLabel)}`);
            } else {
              return [
                createTextVNode(toDisplayString(__props.actionLabel), 1)
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/EmptyState.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as _ };
//# sourceMappingURL=EmptyState-DTWoF1UD.mjs.map
