<script setup>
import { ref, watch } from "vue";
import { RouterLink } from "vue-router";
import { useSearchStore } from "../stores/searchStore.js";

const searchStore = useSearchStore();
const searchQuery = ref("");

watch(searchQuery, (newQuery) => {
  searchStore.debouncedSearch(newQuery);
  searchStore.searchResults.value = [];
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
          v-if="searchStore.isLoading"
          class="border border-gray-700 rounded-lg p-2 mt-1 text-sm"
        >
          Searching...
        </div>
        <ul
          v-if="
            searchStore.searchResults && searchStore.searchResults.length > 0
          "
          class="border border-gray-700 rounded-lg py-2 mt-1"
        >
          <li>
            <router-link
              :to="`/story/${story._id}`"
              v-for="story in searchStore.searchResults"
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
          v-if="
            !searchStore.isLoading &&
            searchStore.searchResults &&
            !searchStore.searchResults.length
          "
          class="border border-gray-700 rounded-lg p-2 mt-1 text-sm"
        >
          No story found
        </div>
      </div>
    </div>
  </header>
</template>
