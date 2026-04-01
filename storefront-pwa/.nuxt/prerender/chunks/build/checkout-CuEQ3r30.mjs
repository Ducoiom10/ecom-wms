import { ref, reactive, computed, readonly } from 'file://C:/laragon/www/ecom-wms/storefront-pwa/node_modules/vue/index.mjs';
import { defineStore } from 'file://C:/laragon/www/ecom-wms/storefront-pwa/node_modules/pinia/dist/pinia.prod.cjs';
import { u as useCartStore } from './cart-TRz18UDQ.mjs';

const useCheckoutStore = defineStore("checkout", () => {
  const steps = ["auth", "shipping", "payment", "review", "success"];
  const step = ref("auth");
  const isSubmitting = ref(false);
  const order = ref(null);
  const customer = reactive({ fullName: "", email: "", phone: "" });
  const address = reactive({ province: "", district: "", ward: "", street: "" });
  const shipping = ref("standard");
  const payment = ref("cod");
  const notes = ref("");
  const shippingFee = computed(() => shipping.value === "express" ? 5e4 : 3e4);
  const next = () => {
    const i = steps.indexOf(step.value);
    if (i < steps.length - 1) step.value = steps[i + 1];
  };
  const prev = () => {
    const i = steps.indexOf(step.value);
    if (i > 0) step.value = steps[i - 1];
  };
  const submit = async () => {
    var _a, _b;
    isSubmitting.value = true;
    try {
      const cartStore = useCartStore();
      order.value = await useOrderApi().createOrder({
        delivery_address: `${address.street}, ${address.ward}, ${address.district}, ${address.province}`,
        region: address.province,
        shipping_method: shipping.value,
        payment_method: payment.value,
        notes: notes.value,
        warehouse_id: 1,
        items: (_b = (_a = cartStore.cart) == null ? void 0 : _a.items.map((i) => ({
          product_id: i.product_id,
          quantity: i.quantity,
          price: i.price
        }))) != null ? _b : []
      });
      next();
    } finally {
      isSubmitting.value = false;
    }
  };
  const reset = () => {
    step.value = "auth";
    order.value = null;
    Object.assign(customer, { fullName: "", email: "", phone: "" });
    Object.assign(address, { province: "", district: "", ward: "", street: "" });
  };
  return {
    step: readonly(step),
    customer,
    address,
    shipping,
    payment,
    notes,
    shippingFee,
    isSubmitting: readonly(isSubmitting),
    order: readonly(order),
    next,
    prev,
    submit,
    reset
  };
});

export { useCheckoutStore as u };
//# sourceMappingURL=checkout-CuEQ3r30.mjs.map
