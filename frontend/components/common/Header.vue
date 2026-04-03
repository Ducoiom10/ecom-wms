<template>
    <header class="sticky top-0 z-40 bg-white border-b shadow-sm">
        <div class="max-w-7xl mx-auto px-4 h-16 flex items-center gap-4">
            <!-- Logo -->
            <NuxtLink
                to="/"
                class="text-xl font-bold text-indigo-600 flex-shrink-0"
                >EcomWMS</NuxtLink
            >

            <!-- Nav links (desktop) -->
            <nav class="hidden md:flex items-center gap-1 flex-1">
                <NuxtLink
                    to="/"
                    class="px-3 py-2 text-sm text-gray-600 hover:text-indigo-600 rounded-lg hover:bg-gray-50 transition"
                >
                    Trang chủ
                </NuxtLink>
                <NuxtLink
                    to="/category"
                    class="px-3 py-2 text-sm text-gray-600 hover:text-indigo-600 rounded-lg hover:bg-gray-50 transition"
                >
                    Danh mục
                </NuxtLink>
            </nav>

            <!-- Search -->
            <div class="flex-1 max-w-sm relative hidden md:block">
                <input
                    v-model="searchQ"
                    @keydown.enter="doSearch"
                    type="text"
                    placeholder="Tìm sản phẩm..."
                    class="w-full border rounded-lg pl-9 pr-3 py-2 text-sm focus:ring-2 focus:ring-indigo-400 focus:outline-none"
                />
                <span
                    class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm"
                    >🔍</span
                >
                <!-- Search results dropdown -->
                <div
                    v-if="searchResults.length"
                    class="absolute top-full left-0 right-0 mt-1 bg-white border rounded-xl shadow-lg z-50 overflow-hidden"
                >
                    <NuxtLink
                        v-for="p in searchResults"
                        :key="p.id"
                        :to="`/products/${p.id}`"
                        @click="
                            searchQ = '';
                            searchResults = [];
                        "
                        class="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 transition text-sm"
                    >
                        <span class="font-medium truncate">{{ p.name }}</span>
                        <span
                            class="ml-auto text-red-600 font-semibold flex-shrink-0"
                        >
                            {{
                                new Intl.NumberFormat("vi-VN", {
                                    style: "currency",
                                    currency: "VND",
                                }).format(p.price)
                            }}
                        </span>
                    </NuxtLink>
                </div>
            </div>

            <!-- Right actions -->
            <div class="flex items-center gap-2 flex-shrink-0">
                <!-- Cart -->
                <button
                    @click="uiStore.toggleCart()"
                    class="relative p-2 hover:bg-gray-100 rounded-lg transition"
                >
                    <span class="text-xl">🛒</span>
                    <span
                        v-if="cartStore.itemCount > 0"
                        class="absolute -top-0.5 -right-0.5 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold"
                    >
                        {{
                            cartStore.itemCount > 9 ? "9+" : cartStore.itemCount
                        }}
                    </span>
                </button>

                <!-- Guest -->
                <template v-if="!authStore.isLoggedIn">
                    <NuxtLink
                        to="/login"
                        class="text-sm font-medium text-indigo-600 hover:underline px-2"
                        >Đăng nhập</NuxtLink
                    >
                    <NuxtLink
                        to="/register"
                        class="text-sm bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition hidden md:block"
                    >
                        Đăng ký
                    </NuxtLink>
                </template>

                <!-- Logged in — account dropdown -->
                <div v-else class="relative" ref="dropdownRef">
                    <button
                        @click="dropdownOpen = !dropdownOpen"
                        class="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition text-sm"
                    >
                        <div
                            class="w-7 h-7 rounded-full bg-indigo-100 text-indigo-600 font-bold text-xs flex items-center justify-center"
                        >
                            {{ initials }}
                        </div>
                        <span
                            class="hidden md:block font-medium max-w-24 truncate"
                            >{{ authStore.user?.name }}</span
                        >
                        <span class="text-gray-400 text-xs">▾</span>
                    </button>
                    <Transition
                        enter-from-class="opacity-0 scale-95"
                        enter-active-class="transition duration-150"
                        leave-to-class="opacity-0 scale-95"
                        leave-active-class="transition duration-150"
                    >
                        <div
                            v-if="dropdownOpen"
                            class="absolute right-0 top-full mt-1 w-48 bg-white border rounded-xl shadow-lg z-50 overflow-hidden origin-top-right"
                        >
                            <NuxtLink
                                v-for="item in accountMenu"
                                :key="item.to"
                                :to="item.to"
                                @click="dropdownOpen = false"
                                class="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition"
                            >
                                <span>{{ item.icon }}</span
                                >{{ item.label }}
                            </NuxtLink>
                            <div class="border-t" />
                            <button
                                @click="authStore.logout()"
                                class="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition"
                            >
                                🚪 Đăng xuất
                            </button>
                        </div>
                    </Transition>
                </div>
            </div>
        </div>
    </header>
</template>

<script setup lang="ts">
import { onClickOutside } from "@vueuse/core";
import type { ApiSuccess, Product } from "~/types/models.types";
import { useProductApi } from "~/composables/useProductApi";

const uiStore = useUiStore();
const cartStore = useCartStore();
const authStore = useAuthStore();
const router = useRouter();

const searchQ = ref("");
const searchResults = ref<Product[]>([]);
const dropdownOpen = ref(false);
const dropdownRef = ref<HTMLElement | null>(null);

const initials = computed(
    () =>
        authStore.user?.name
            ?.split(" ")
            .map((w) => w[0])
            .slice(-2)
            .join("")
            .toUpperCase() ?? "?",
);

const accountMenu = [
    { to: "/account/orders", icon: "📦", label: "Đơn hàng" },
    { to: "/account/loyalty", icon: "⭐", label: "Điểm thưởng" },
    { to: "/account/addresses", icon: "📍", label: "Địa chỉ" },
    { to: "/account/wishlist", icon: "❤️", label: "Yêu thích" },
    { to: "/account/profile", icon: "⚙️", label: "Hồ sơ" },
];

onClickOutside(dropdownRef, () => {
    dropdownOpen.value = false;
});

let searchTimer: ReturnType<typeof setTimeout>;
watch(searchQ, (q) => {
    clearTimeout(searchTimer);
    if (!q.trim() || q.length < 2) {
        searchResults.value = [];
        return;
    }
    searchTimer = setTimeout(async () => {
        try {
            searchResults.value = await useProductApi().search(q, 5);
        } catch {
            searchResults.value = [];
        }
    }, 300);
});

const doSearch = () => {
    if (!searchQ.value.trim()) return;
    router.push(`/category?q=${encodeURIComponent(searchQ.value)}`);
    searchQ.value = "";
    searchResults.value = [];
};
</script>
