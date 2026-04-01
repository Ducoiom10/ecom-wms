<template>
  <div class="bg-white rounded-xl border p-6 space-y-5">
    <div class="flex items-center justify-between">
      <h1 class="text-xl font-bold">Sổ địa chỉ</h1>
      <button @click="showForm = true" class="text-sm bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700">+ Thêm địa chỉ</button>
    </div>

    <UiEmptyState v-if="!addresses?.length" icon="📍" title="Chưa có địa chỉ" message="Thêm địa chỉ để thanh toán nhanh hơn" />

    <div v-else class="space-y-3">
      <div v-for="a in addresses" :key="a.id" class="border rounded-xl p-4 flex justify-between items-start">
        <div class="text-sm">
          <p class="font-semibold">{{ a.type === 'home' ? '🏠 Nhà' : a.type === 'work' ? '🏢 Công ty' : '📍 Khác' }}</p>
          <p class="text-gray-600 mt-1">{{ a.street }}, {{ a.city }}</p>
          <span v-if="a.is_default" class="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full mt-1 inline-block">Mặc định</span>
        </div>
        <button class="text-xs text-red-500 hover:underline">Xóa</button>
      </div>
    </div>

    <!-- Add form modal -->
    <div v-if="showForm" class="fixed inset-0 bg-black/40 z-50 flex items-center justify-center" @click.self="showForm = false">
      <div class="bg-white rounded-xl p-6 w-full max-w-md space-y-4">
        <h2 class="font-bold">Thêm địa chỉ mới</h2>
        <select v-model="form.type" class="w-full border rounded-lg px-3 py-2 text-sm">
          <option value="home">Nhà riêng</option>
          <option value="work">Công ty</option>
          <option value="other">Khác</option>
        </select>
        <input v-model="form.street" placeholder="Số nhà, tên đường *" class="w-full border rounded-lg px-3 py-2 text-sm" />
        <input v-model="form.city" placeholder="Thành phố *" class="w-full border rounded-lg px-3 py-2 text-sm" />
        <input v-model="form.postal_code" placeholder="Mã bưu chính" class="w-full border rounded-lg px-3 py-2 text-sm" />
        <div class="flex gap-3">
          <button @click="showForm = false" class="flex-1 border rounded-lg py-2 text-sm">Hủy</button>
          <button @click="saveAddress" class="flex-1 bg-indigo-600 text-white rounded-lg py-2 text-sm hover:bg-indigo-700">Lưu</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'account', middleware: 'auth' })
const showForm = ref(false)
const form = reactive({ type: 'home', street: '', city: '', postal_code: '', country: 'VN', is_default: false })
const { data: addresses, refresh } = await useAsyncData('addresses', () => useApi()('crm/v1/addresses'))
const saveAddress = async () => {
  await useApi()('crm/v1/addresses', { method: 'POST', body: form })
  showForm.value = false
  refresh()
}
</script>
