<template>
    <div class="space-y-5">
        <button
            v-if="hasActive"
            @click="emit('update', 'reset', true)"
            class="text-sm text-indigo-600 hover:underline"
        >
            Xóa bộ lọc
        </button>

        <!-- Giá -->
        <div class="border-b pb-4">
            <h3 class="font-semibold mb-3">Giá</h3>
            <div class="flex gap-2">
                <input
                    v-model.number="priceMin"
                    type="number"
                    placeholder="Từ"
                    class="w-1/2 border rounded px-2 py-1 text-sm"
                />
                <input
                    v-model.number="priceMax"
                    type="number"
                    placeholder="Đến"
                    class="w-1/2 border rounded px-2 py-1 text-sm"
                />
            </div>
            <button
                @click="emit('update', 'price', `${priceMin}-${priceMax}`)"
                class="mt-2 w-full bg-indigo-600 text-white text-sm py-1.5 rounded hover:bg-indigo-700"
            >
                Áp dụng
            </button>
        </div>

        <!-- Thương hiệu -->
        <div v-if="filters?.brands?.length" class="border-b pb-4">
            <h3 class="font-semibold mb-3">Thương hiệu</h3>
            <div class="space-y-1.5 max-h-40 overflow-y-auto">
                <label
                    v-for="b in filters.brands"
                    :key="b.id"
                    class="flex items-center gap-2 cursor-pointer text-sm"
                >
                    <input
                        type="checkbox"
                        :value="b.id"
                        v-model="selectedBrands"
                        @change="
                            emit('update', 'brand', selectedBrands.join(','))
                        "
                        class="accent-indigo-600"
                    />
                    {{ b.name }}
                </label>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { CatalogFilters } from "~/types/models.types";
import { useProductApi } from "~/composables/useProductApi";

const emit = defineEmits<{ update: [key: string, value: any] }>();
defineProps<{ selected: Record<string, any> }>();

const priceMin = ref(0);
const priceMax = ref(50000000);
const selectedBrands = ref<number[]>([]);

const { data: filters } = await useAsyncData<CatalogFilters>(
    "sidebar-filters",
    () => useProductApi().getFilters(),
);
const hasActive = computed(() => selectedBrands.value.length > 0);
</script>
