<script setup>
import { RouterLink } from "vue-router";
import { formatDate } from "../lib/utils.js";
</script>

<template>
  <header class="py-6">
    <div class="flex flex-col gap-2">
      <router-link to="/">
        <h1 class="text-[#195A94] text-3xl/8 font-extrabold">WordFlow</h1>
      </router-link>
      <p class="font-medium text-lg/7">{{ formatDate(new Date()) }}</p>
    </div>
  </header>
</template>
