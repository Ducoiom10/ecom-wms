<template>
    <div v-if="product" class="max-w-7xl mx-auto px-4 py-8">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
            <ProductGallery :images="product.productImages ?? []" />
            <div class="space-y-5">
                <div>
                    <h1 class="text-2xl font-bold">{{ product.name }}</h1>
                    <p class="text-gray-400 text-sm mt-1">
                        SKU: {{ product.sku }}
                    </p>
                </div>
                <p class="text-3xl font-bold text-red-600">
                    {{ formatPrice(product.price) }}
                </p>
                <ProductVariantSelector
                    v-if="product.productVariants?.length"
                    :product="product"
                    @select="(v) => (selectedVariant = v)"
                />
                <ProductStockIndicator
                    :stock="
                        selectedVariant?.stock ?? product.available_stock ?? 0
                    "
                />
                <div class="flex items-center gap-3">
                    <span class="text-sm font-medium">Số lượng:</span>
                    <div class="flex items-center border rounded-lg">
                        <button
                            @click="qty = Math.max(1, qty - 1)"
                            class="px-3 py-2"
                        >
                            −
                        </button>
                        <input
                            v-model.number="qty"
                            type="number"
                            min="1"
                            class="w-12 text-center border-0 py-2 focus:outline-none"
                        />
                        <button @click="qty++" class="px-3 py-2">+</button>
                    </div>
                </div>
                <div class="flex gap-3">
                    <button
                        @click="addToCart"
                        :disabled="
                            cartStore.loading || !product.available_stock
                        "
                        class="flex-1 bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 disabled:opacity-50"
                    >
                        {{
                            !product.available_stock
                                ? "Hết hàng"
                                : "Thêm vào giỏ"
                        }}
                    </button>
                </div>
                <div v-if="product.productImages" class="border-t pt-5">
                    <h3 class="font-semibold mb-2">Mô tả</h3>
                    <p class="text-gray-600 text-sm">
                        {{ product.description }}
                    </p>
                </div>
            </div>
        </div>
        <div class="mt-16">
            <h2 class="text-xl font-bold mb-6">Sản phẩm liên quan</h2>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
                <ProductCard v-for="r in related" :key="r.id" :product="r" />
            </div>
        </div>

        <!-- Reviews -->
        <div class="mt-16 border-t pt-10 space-y-8">
            <ProductReviewList
                :product-id="Number(route.params.id)"
                :key="reviewKey"
            />
            <ProductReviewForm
                :product-id="Number(route.params.id)"
                @submitted="reviewKey++"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
import type { Product, ProductVariant } from "~/types/models.types";

const route = useRoute();
const cartStore = useCartStore();
const qty = ref(1);
const reviewKey = ref(0);
const selectedVariant = ref<ProductVariant | null>(null);

const { data: product } = await useAsyncData<Product>(
    `product-${route.params.id}`,
    () => useProductApi().getById(route.params.id as string),
);
const { data: related } = await useAsyncData<Product[]>(
    `related-${route.params.id}`,
    () => useProductApi().getRelated(route.params.id as string),
);

const formatPrice = (p: number) =>
    new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
    }).format(p);

const addToCart = () =>
    cartStore.addToCart(
        product.value!.id,
        qty.value,
        selectedVariant.value?.id,
    );

useSeoMeta({
    title: () => product.value?.name ?? "",
    description: () => product.value?.description ?? "",
    ogTitle: () => product.value?.name ?? "",
    ogDescription: () => product.value?.description ?? "",
    ogImage: () => product.value?.productImages?.[0]?.image_url ?? "",
});

useHead({
    script: [
        {
            type: "application/ld+json",
            textContent: computed(() =>
                JSON.stringify({
                    "@context": "https://schema.org/",
                    "@type": "Product",
                    name: product.value?.name,
                    description: product.value?.description,
                    sku: product.value?.sku,
                    image: product.value?.productImages?.map(
                        (i) => i.image_url,
                    ),
                    offers: {
                        "@type": "Offer",
                        price: product.value?.price,
                        priceCurrency: "VND",
                        availability:
                            (product.value?.available_stock ?? 0) > 0
                                ? "https://schema.org/InStock"
                                : "https://schema.org/OutOfStock",
                    },
                }),
            ),
        },
    ],
});
</script>
