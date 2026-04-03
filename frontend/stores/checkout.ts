export const useCheckoutStore = defineStore('checkout', () => {
  const steps = ['auth', 'shipping', 'payment', 'review', 'success'] as const
  type Step = typeof steps[number]

  const step          = ref<Step>('auth')
  const isSubmitting  = ref(false)
  const order         = ref<any>(null)

  const customer = reactive({ fullName: '', email: '', phone: '' })
  const address  = reactive({ province: '', district: '', ward: '', street: '' })
  const shipping = ref<'standard' | 'express'>('standard')
  const payment  = ref<'cod' | 'stripe' | 'zalopay'>('cod')
  const notes    = ref('')

  const shippingFee = computed(() => shipping.value === 'express' ? 50000 : 30000)

  const next = () => {
    const i = steps.indexOf(step.value)
    if (i < steps.length - 1) step.value = steps[i + 1]
  }
  const prev = () => {
    const i = steps.indexOf(step.value)
    if (i > 0) step.value = steps[i - 1]
  }

  const submit = async () => {
    isSubmitting.value = true
    try {
      const cartStore = useCartStore()
      order.value = await useOrderApi().createOrder({
        delivery_address: `${address.street}, ${address.ward}, ${address.district}, ${address.province}`,
        region:           address.province,
        shipping_method:  shipping.value,
        payment_method:   payment.value,
        notes:            notes.value,
        warehouse_id:     1,
        items:            cartStore.cart?.items.map(i => ({
          product_id: i.product_id,
          quantity:   i.quantity,
          price:      i.price,
        })) ?? [],
      })
      next()
    } finally {
      isSubmitting.value = false
    }
  }

  const reset = () => {
    step.value = 'auth'
    order.value = null
    Object.assign(customer, { fullName: '', email: '', phone: '' })
    Object.assign(address,  { province: '', district: '', ward: '', street: '' })
  }

  return {
    step: readonly(step), customer, address,
    shipping, payment, notes, shippingFee,
    isSubmitting: readonly(isSubmitting),
    order: readonly(order),
    next, prev, submit, reset,
  }
})
