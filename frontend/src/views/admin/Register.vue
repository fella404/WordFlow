<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../../stores/authStore.js";

const router = useRouter();
const authStore = useAuthStore();

const formData = ref({
  name: "",
  email: "",
  password: "",
});

const handleRegister = async () => {
  try {
    await authStore.register(
      formData.value.name,
      formData.value.email,
      formData.value.password,
    );

    router.push("/admin/");
  } catch (error) {
    console.log("Failed to registration");
  }
};
</script>

<template>
  <div
    class="flex justify-center gap-8 flex-col w-[500px] mx-auto min-h-screen"
  >
    <h1 class="text-[#195A94] text-center text-3xl/8 font-extrabold">
      WordFlow
    </h1>
    <form @submit.prevent="handleRegister" class="flex flex-col gap-4">
      <input
        type="text"
        v-model="formData.name"
        class="rounded-2xl w-full py-2 px-4 border border-gray-500 placeholder:text-gray-400 placeholder:font-extrabold placeholder:text-sm"
        id="name"
        placeholder="name"
        name="name"
      />
      <input
        type="email"
        v-model="formData.email"
        class="rounded-2xl w-full py-2 px-4 border border-gray-500 placeholder:text-gray-400 placeholder:font-extrabold placeholder:text-sm"
        id="email"
        placeholder="email"
        name="email"
      />
      <input
        type="password"
        v-model="formData.password"
        class="rounded-2xl w-full py-2 px-4 border border-gray-500 placeholder:text-gray-400 placeholder:font-extrabold placeholder:text-sm"
        id="password"
        placeholder="password"
        name="password"
      />
      <button
        type="submit"
        class="text-[#E0FBFC] bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-bold rounded-lg text-sm px-8 py-3 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 mx-auto"
      >
        Register
      </button>
    </form>
  </div>
</template>
