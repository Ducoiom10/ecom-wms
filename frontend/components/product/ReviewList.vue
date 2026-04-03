<template>
    <div class="space-y-5">
        <div class="flex items-center justify-between">
            <h3 class="font-semibold">Đánh giá từ khách hàng</h3>
            <select v-model="sort" class="border rounded px-2 py-1 text-sm">
                <option value="newest">Mới nhất</option>
                <option value="highest">Cao nhất</option>
                <option value="lowest">Thấp nhất</option>
            </select>
        </div>

        <div v-if="pending" class="space-y-3">
            <div
                v-for="i in 3"
                :key="i"
                class="h-24 bg-gray-100 rounded-lg animate-pulse"
            />
        </div>

        <UiEmptyState
            v-else-if="!reviews?.length"
            icon="💬"
            title="Chưa có đánh giá"
            message="Hãy là người đầu tiên đánh giá sản phẩm này"
        />

        <div v-else class="space-y-4">
            <div v-for="r in reviews" :key="r.id" class="border rounded-xl p-4">
                <div class="flex justify-between items-start mb-2">
                    <div>
                        <p class="font-semibold text-sm">
                            {{ r.user?.name ?? "Khách hàng" }}
                        </p>
                        <p class="text-xs text-gray-400">
                            {{
                                new Date(r.created_at).toLocaleDateString(
                                    "vi-VN",
                                )
                            }}
                        </p>
                    </div>
                    <span class="text-sm">{{ "⭐".repeat(r.rating) }}</span>
                </div>
                <p class="text-sm text-gray-700">{{ r.content }}</p>
            </div>
        </div>

        <UiPagination
            v-if="totalPages > 1"
            :current="page"
            :total="totalPages"
            @change="(p) => (page = p)"
        />
    </div>
</template>

<script setup lang="ts">
import type { ApiSuccess, Paginated, Review } from "~/types/models.types";

const props = defineProps<{ productId: number }>();
const sort = ref("newest");
const page = ref(1);

const {
    data: result,
    pending,
    refresh,
} = await useAsyncData<ApiSuccess<Paginated<Review>>>(
    `reviews-${props.productId}`,
    () =>
        useApi()(
            `crm/v1/reviews?product_id=${props.productId}&page=${page.value}&sort=${sort.value}`,
        ),
);

const reviews = computed(() => result.value?.data.data ?? []);
const totalPages = computed(() =>
    Math.ceil((result.value?.data.total ?? 0) / 5),
);

watch([sort, page], () => refresh());
</script>
