<script setup>
import { ref, defineEmits } from "vue";
import { RouterLink } from "vue-router";
import { formatDate } from "../lib/utils.js";

const search = ref("");
const emit = defineEmits(["update:search"]);
</script>

<template>
  <header class="py-6 flex justify-between">
    <div class="flex flex-col gap-2">
      <router-link to="/">
        <h1 class="text-[#195A94] text-3xl/8 font-extrabold">WordFlow</h1>
      </router-link>
      <p class="font-medium text-lg/7">{{ formatDate(new Date()) }}</p>
    </div>
    <div class="w-[350px] my-auto">
      <input
        type="text"
        v-model="search"
        @input="emit('update:search', search)"
        placeholder="Search"
        class="w-full p-2.5 border border-gray-400 rounded-lg text-sm focus:ring-blue-500 focus:border-blue-500"
      />
    </div>
  </header>
</template>
