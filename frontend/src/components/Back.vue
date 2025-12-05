<script setup>
import { useRouter } from "vue-router";

import { BiArrowBack } from "vue-icons-plus/bi";

const router = useRouter();

const goBack = () => {
  router.back();
};
</script>

<template>
  <button
    @click="goBack"
    class="flex gap-2 items-center text-[#4F46E5] hover:text-indigo-800 font-semibold transition"
  >
    <BiArrowBack />
    Kembali ke daftar
  </button>
</template>
