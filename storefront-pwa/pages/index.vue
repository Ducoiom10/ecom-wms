<template>
  <div class="min-h-screen">

    <!-- Hero Carousel -->
    <section class="relative h-96 overflow-hidden bg-indigo-700">
      <Transition name="fade" mode="out-in">
        <div :key="slideIdx" class="absolute inset-0">
          <div class="absolute inset-0 bg-gradient-to-r from-indigo-900/80 to-indigo-600/40" />
          <div class="relative h-full flex items-center justify-center text-center text-white px-6">
            <div>
              <p class="text-sm font-semibold uppercase tracking-widest mb-3 opacity-80">{{ slides[slideIdx].tag }}</p>
              <h1 class="text-4xl md:text-5xl font-bold mb-4">{{ slides[slideIdx].title }}</h1>
              <p class="text-lg mb-8 opacity-90 max-w-lg mx-auto">{{ slides[slideIdx].subtitle }}</p>
              <NuxtLink :to="slides[slideIdx].link"
                class="inline-block px-8 py-3 bg-white text-indigo-700 font-semibold rounded-lg hover:bg-gray-100 transition">
                {{ slides[slideIdx].cta }}
              </NuxtLink>
            </div>
          </div>
        </div>
      </Transition>
      <!-- Dots -->
      <div class="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        <button v-for="(_, i) in slides" :key="i" @click="slideIdx = i"
          class="h-2 rounded-full transition-all duration-300"
          :class="i === slideIdx ? 'w-8 bg-white' : 'w-2 bg-white/50'" />
      </div>
    </section>

    <!-- Featured Categories -->
    <section class="py-14 px-4 bg-white">
      <div class="max-w-7xl mx-auto">
        <h2 class="text-2xl font-bold mb-8 text-center">Danh mục nổi bật</h2>
        <div v-if="catPending" class="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div v-for="i in 4" :key="i" class="h-40 bg-gray-100 rounded-xl animate-pulse" />
        </div>
        <div v-else class="grid grid-cols-2 md:grid-cols-4 gap-4">
          <NuxtLink v-for="cat in categories?.data?.slice(0, 4)" :key="cat.id"
            :to="`/category/${cat.slug}`"
            class="group relative h-40 rounded-xl overflow-hidden bg-indigo-50 flex items-center justify-center hover:shadow-lg transition">
            <div class="absolute inset-0 bg-gradient-to-t from-indigo-900/60 to-transparent" />
            <h3 class="relative z-10 text-white font-bold text-lg text-center px-3">{{ cat.name }}</h3>
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Featured Products -->
    <section class="py-14 px-4 bg-gray-50">
      <div class="max-w-7xl mx-auto">
        <div class="flex items-center justify-between mb-8">
          <h2 class="text-2xl font-bold">Sản phẩm nổi bật</h2>
          <NuxtLink to="/category" class="text-sm text-indigo-600 hover:underline font-medium">Xem tất cả →</NuxtLink>
        </div>
        <div v-if="prodPending" class="grid grid-cols-2 md:grid-cols-4 gap-6">
          <UiSkeletonCard v-for="i in 8" :key="i" />
        </div>
        <div v-else class="grid grid-cols-2 md:grid-cols-4 gap-6">
          <ProductCard v-for="p in products?.data" :key="p.id" :product="p" />
        </div>
      </div>
    </section>

    <!-- Special Offer Banner -->
    <section class="py-14 px-4 bg-gradient-to-r from-rose-500 to-orange-500">
      <div class="max-w-3xl mx-auto text-center text-white">
        <p class="text-xs font-bold uppercase tracking-widest mb-2 opacity-80">Ưu đãi có hạn</p>
        <h2 class="text-3xl md:text-4xl font-bold mb-4">Giảm giá lên đến 50%</h2>
        <p class="text-base mb-8 opacity-90">Chỉ áp dụng cho sản phẩm được chọn. Nhanh tay kẻo hết!</p>
        <NuxtLink to="/category"
          class="inline-block px-8 py-3 bg-white text-rose-600 font-semibold rounded-lg hover:bg-gray-100 transition">
          Khám phá ưu đãi
        </NuxtLink>
      </div>
    </section>

    <!-- Testimonials -->
    <section class="py-14 px-4 bg-white">
      <div class="max-w-7xl mx-auto">
        <h2 class="text-2xl font-bold mb-8 text-center">Khách hàng nói gì?</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div v-for="t in testimonials" :key="t.id"
            class="bg-gray-50 rounded-xl p-6 space-y-3 hover:shadow-md transition">
            <div class="flex gap-0.5 text-amber-400">
              <span v-for="s in t.rating" :key="s">⭐</span>
            </div>
            <p class="text-gray-700 text-sm italic">"{{ t.comment }}"</p>
            <div class="flex items-center gap-3 pt-2 border-t">
              <div class="w-9 h-9 rounded-full bg-indigo-100 text-indigo-600 font-bold text-sm flex items-center justify-center">
                {{ t.name[0] }}
              </div>
              <div>
                <p class="font-semibold text-sm">{{ t.name }}</p>
                <p class="text-xs text-gray-400">{{ t.date }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Trust Badges -->
    <section class="py-10 px-4 bg-gray-50 border-t">
      <div class="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        <div v-for="b in badges" :key="b.icon" class="flex items-start gap-4">
          <span class="text-3xl">{{ b.icon }}</span>
          <div>
            <h3 class="font-semibold">{{ b.title }}</h3>
            <p class="text-sm text-gray-500">{{ b.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Newsletter -->
    <section class="py-14 px-4 bg-indigo-600 text-white">
      <div class="max-w-xl mx-auto text-center">
        <h2 class="text-2xl font-bold mb-2">Đăng ký nhận tin</h2>
        <p class="text-sm opacity-90 mb-6">Nhận thông tin khuyến mãi và sản phẩm mới trước tiên.</p>
        <form @submit.prevent="subscribe" class="flex gap-2">
          <input v-model="email" type="email" required placeholder="Email của bạn"
            class="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none text-sm" />
          <button type="submit" :disabled="subscribing"
            class="px-6 py-3 bg-white text-indigo-700 font-semibold rounded-lg hover:bg-gray-100 disabled:opacity-50 text-sm transition">
            {{ subscribing ? '...' : 'Đăng ký' }}
          </button>
        </form>
        <p v-if="subMsg" class="mt-3 text-sm opacity-90">{{ subMsg }}</p>
      </div>
    </section>

  </div>
</template>

<script setup lang="ts">
useSeoMeta({
  title: 'Trang chủ | EcomWMS Store',
  description: 'Khám phá sản phẩm chất lượng với giá tốt nhất.',
  ogTitle: 'EcomWMS Store',
  ogDescription: 'Khám phá sản phẩm chất lượng với giá tốt nhất.',
})

// Hero slides
const slides = [
  { tag: 'Bộ sưu tập mới', title: 'Khám phá Mùa Hè 2026', subtitle: 'Phong cách hiện đại, chất lượng vượt trội', link: '/category', cta: 'Mua sắm ngay', },
  { tag: 'Flash Sale', title: 'Giảm đến 50% hôm nay', subtitle: 'Chỉ trong 24 giờ — số lượng có hạn', link: '/category', cta: 'Xem ưu đãi', },
  { tag: 'Hàng mới về', title: 'Công nghệ tiên tiến 2026', subtitle: 'Trải nghiệm sản phẩm công nghệ mới nhất', link: '/category', cta: 'Khám phá ngay', },
]
const slideIdx = ref(0)
onMounted(() => {
  setInterval(() => { slideIdx.value = (slideIdx.value + 1) % slides.length }, 5000)
})

// Data
const { data: categories, pending: catPending } = await useAsyncData('home-categories',
  () => useProductApi().getFilters()
)
const { data: products, pending: prodPending } = await useAsyncData('home-products',
  () => useProductApi().getAll({ limit: 8 })
)

// Static data
const testimonials = [
  { id: 1, name: 'Nguyễn Văn A', rating: 5, comment: 'Sản phẩm chất lượng tốt, giao hàng nhanh!', date: '28/03/2026' },
  { id: 2, name: 'Trần Thị B',   rating: 5, comment: 'Dịch vụ khách hàng rất tuyệt vời. Sẽ mua lại!', date: '25/03/2026' },
  { id: 3, name: 'Lê Văn C',     rating: 4, comment: 'Giá cả hợp lý, chất lượng ổn định.', date: '22/03/2026' },
]
const badges = [
  { icon: '🚚', title: 'Giao hàng miễn phí', desc: 'Cho đơn hàng trên 500.000₫' },
  { icon: '🔒', title: 'Thanh toán an toàn', desc: 'Nhiều phương thức thanh toán bảo mật' },
  { icon: '↩️', title: 'Đổi trả dễ dàng', desc: '30 ngày hoàn tiền 100%' },
]

// Newsletter
const email      = ref('')
const subscribing = ref(false)
const subMsg     = ref('')
const subscribe  = async () => {
  subscribing.value = true
  await new Promise(r => setTimeout(r, 800))
  subMsg.value     = '✓ Cảm ơn bạn đã đăng ký!'
  email.value      = ''
  subscribing.value = false
  setTimeout(() => { subMsg.value = '' }, 4000)
}
</script>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity 0.6s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>
