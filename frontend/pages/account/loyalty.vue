<template>
    <div class="bg-white rounded-xl border p-6 space-y-5">
        <h1 class="text-xl font-bold">Điểm thưởng</h1>
        <div v-if="pending" class="h-32 bg-gray-100 rounded-lg animate-pulse" />
        <div v-else>
            <div
                class="bg-indigo-50 rounded-xl p-5 flex items-center justify-between mb-6"
            >
                <div>
                    <p class="text-sm text-gray-500">Điểm hiện tại</p>
                    <p class="text-4xl font-bold text-indigo-600">
                        {{ loyalty?.points ?? 0 }}
                    </p>
                </div>
                <span class="text-5xl">⭐</span>
            </div>
            <h2
                class="font-semibold mb-3 text-sm text-gray-500 uppercase tracking-wide"
            >
                Lịch sử điểm
            </h2>
            <UiEmptyState
                v-if="!loyalty?.transactions?.length"
                icon="⭐"
                title="Chưa có giao dịch điểm"
                message="Mua hàng để tích điểm thưởng"
            />
            <div v-else class="space-y-2">
                <div
                    v-for="t in loyalty.transactions"
                    :key="t.id"
                    class="flex justify-between items-center border-b py-2 text-sm"
                >
                    <span class="text-gray-600">{{ t.description }}</span>
                    <span
                        :class="
                            t.points > 0
                                ? 'text-green-600 font-bold'
                                : 'text-red-500'
                        "
                    >
                        {{ t.points > 0 ? "+" : "" }}{{ t.points }}
                    </span>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { ApiSuccess, LoyaltyBenefits } from "~/types/models.types";

definePageMeta({ layout: "account", middleware: "auth" });
const { data: loyaltyResponse, pending } = await useAsyncData<
    ApiSuccess<LoyaltyBenefits>
>("loyalty", () => useApi()("crm/v1/loyalty/benefits"));
const loyalty = computed(() => loyaltyResponse.value?.data);
</script>
