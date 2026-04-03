<template>
    <div class="bg-white rounded-xl border p-6 space-y-6">
        <h1 class="text-xl font-bold">Hồ sơ cá nhân</h1>
        <form @submit.prevent="save" class="space-y-4 max-w-md">
            <div>
                <label class="block text-sm font-medium mb-1">Họ tên</label>
                <input
                    v-model="form.name"
                    class="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
                />
            </div>
            <div>
                <label class="block text-sm font-medium mb-1">Email</label>
                <input
                    :value="authStore.user?.email"
                    disabled
                    class="w-full border rounded-lg px-3 py-2 bg-gray-50 text-gray-400"
                />
            </div>
            <div class="border-t pt-4">
                <p class="text-sm font-semibold mb-3">Đổi mật khẩu</p>
                <input
                    v-model="form.password"
                    type="password"
                    placeholder="Mật khẩu mới"
                    class="w-full border rounded-lg px-3 py-2 mb-2 focus:outline-none"
                />
                <input
                    v-model="form.password_confirmation"
                    type="password"
                    placeholder="Xác nhận mật khẩu"
                    class="w-full border rounded-lg px-3 py-2 focus:outline-none"
                />
            </div>
            <p
                v-if="msg"
                class="text-sm"
                :class="
                    msg.type === 'success' ? 'text-green-600' : 'text-red-600'
                "
            >
                {{ msg.text }}
            </p>
            <button
                type="submit"
                :disabled="saving"
                class="bg-indigo-600 text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-indigo-700 disabled:opacity-50"
            >
                {{ saving ? "Đang lưu..." : "Lưu thay đổi" }}
            </button>
        </form>
    </div>
</template>

<script setup lang="ts">
import { useAuthApi } from "~/composables/api/authApi";

definePageMeta({ layout: "account", middleware: "auth" });
const authStore = useAuthStore();
const saving = ref(false);
const msg = ref<{ type: string; text: string } | null>(null);
const form = reactive({
    name: authStore.user?.name ?? "",
    password: "",
    password_confirmation: "",
});

const save = async () => {
    saving.value = true;
    try {
        await useAuthApi().updateProfile({
            name: form.name,
            ...(form.password
                ? {
                      password: form.password,
                      password_confirmation: form.password_confirmation,
                  }
                : {}),
        });
        await authStore.loadProfile();
        msg.value = { type: "success", text: "Đã lưu thay đổi!" };
        form.password = "";
        form.password_confirmation = "";
    } catch {
        msg.value = { type: "error", text: "Có lỗi xảy ra. Vui lòng thử lại." };
    } finally {
        saving.value = false;
    }
};
</script>
