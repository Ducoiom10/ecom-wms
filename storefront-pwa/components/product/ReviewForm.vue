<template>
  <form @submit.prevent="submit" class="bg-gray-50 rounded-xl p-5 space-y-4">
    <h3 class="font-semibold">Viết đánh giá</h3>
    <div>
      <p class="text-sm font-medium mb-2">Đánh giá</p>
      <div class="flex gap-1">
        <button v-for="s in 5" :key="s" type="button" @click="rating = s" class="text-2xl transition">
          {{ s <= rating ? '⭐' : '☆' }}
        </button>
      </div>
    </div>
    <textarea v-model="text" rows="4" maxlength="500" placeholder="Chia sẻ trải nghiệm của bạn..."
      class="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-400 focus:outline-none resize-none" />
    <p class="text-xs text-gray-400 -mt-2">{{ text.length }}/500</p>
    <p v-if="error" class="text-red-600 text-sm">{{ error }}</p>
    <button type="submit" :disabled="!rating || !text || loading"
      class="w-full bg-indigo-600 text-white py-2.5 rounded-lg font-semibold hover:bg-indigo-700 disabled:opacity-50">
      {{ loading ? 'Đang gửi...' : 'Gửi đánh giá' }}
    </button>
  </form>
</template>

<script setup lang="ts">
const props = defineProps<{ productId: number }>()
const emit  = defineEmits<{ submitted: [] }>()
const rating  = ref(0)
const text    = ref('')
const loading = ref(false)
const error   = ref('')

const submit = async () => {
  if (!rating.value || !text.value) return
  loading.value = true
  error.value   = ''
  try {
    await useApi()('crm/v1/reviews', { method: 'POST', body: { product_id: props.productId, rating: rating.value, content: text.value } })
    rating.value = 0
    text.value   = ''
    emit('submitted')
    useUiStore().addToast('Đánh giá đã được gửi!', 'success')
  } catch {
    error.value = 'Có lỗi xảy ra. Vui lòng thử lại.'
  } finally {
    loading.value = false
  }
}
</script>
