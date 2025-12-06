<script setup>
import { RouterLink } from "vue-router";
import { BiArrowBack } from "vue-icons-plus/bi";
</script>

<template>
  <router-link
    to="/"
    class="inline-flex items-center gap-2 text-[#4F46E5] hover:text-indigo-800 font-semibold transition"
  >
    <BiArrowBack />
    Kembali ke daftar
  </router-link>
</template>
