<script setup>
import { ref, watch } from "vue";
import { RouterLink } from "vue-router";
import { GiOpenBook } from "vue-icons-plus/gi";

import api from "../lib/publicAxios.js";

const searchQuery = ref("");
const searchResults = ref([]);
const isLoading = ref(false);
let timeoutId = null;

const debouncedSearch = (query) => {
  isLoading.value = true;
  clearTimeout(timeoutId);
  timeoutId = setTimeout(async () => {
    if (query.trim()) {
      await performSearch(query);
    } else {
      searchResults.value = [];
    }
  }, 1500);
};

const performSearch = async (query) => {
  try {
    const res = await api.get(`/search?=${encodeURIComponent(query)}`, {
      params: { search: query },
    });
    searchResults.value = res.data;
    console.log(searchResults.value);
  } catch (error) {
    console.log("Error performing search: ", error);
    searchResults.value = [];
  } finally {
    isLoading.value = false;
  }
};

watch(searchQuery, (newQuery) => {
  debouncedSearch(newQuery);
  searchResults.value = [];
});
</script>

<template>
  <header
    class="p-6 flex flex-col gap-4 md:flex-row justify-between bg-white border-b border-gray-200 w-full z-50 shadow-sm"
  >
    <div class="flex items-center gap-2">
      <router-link to="/">
        <h1 class="text-[#195A94] text-3xl/8 font-extrabold">WordFlow</h1>
      </router-link>
    </div>
    <div class="md:w-[350px] my-auto">
      <input
        type="text"
        v-model="searchQuery"
        placeholder="Search"
        class="w-full p-2.5 border border-gray-400 rounded-lg text-sm focus:ring-blue-500 focus:border-blue-500"
      />
      <div v-if="searchQuery && searchQuery.trim()">
        <div
          v-if="isLoading"
          class="border border-gray-700 rounded-lg p-2 mt-1 text-sm"
        >
          Searching...
        </div>
        <ul
          v-if="searchResults && searchResults.length > 0"
          class="border border-gray-700 rounded-lg py-2 mt-1"
        >
          <li>
            <router-link
              :to="`/story/${story._id}`"
              v-for="story in searchResults"
              :key="story._id"
            >
              <li
                class="p-1.5 hover:bg-gray-300 rounded-md cursor-pointer text-sm"
              >
                {{ story.title }}
              </li>
            </router-link>
          </li>
        </ul>
        <div
          v-if="!isLoading && searchResults && !searchResults.length"
          class="border border-gray-700 rounded-lg p-2 mt-1 text-sm"
        >
          No story found
        </div>
      </div>
    </div>
  </header>
</template>
