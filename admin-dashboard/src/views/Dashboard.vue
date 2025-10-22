<script setup>
import { ref } from "vue";
import api from "../lib/axios.js";

const stories = ref([]);

const fetchStories = async () => {
  try {
    const res = await api.get("/stories");
    stories.value = res.data;
    console.log(stories.value);
  } catch (error) {
    console.log(error);
  }
};

fetchStories();
</script>

<template>
  <main class="flex flex-col gap-6 items-center py-8">
    <h1 class="text-[#195A94] text-center text-3xl/8 font-extrabold">
      WordFlow
    </h1>
    <button
      type="button"
      class="text-[#E0FBFC] bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-bold rounded-lg text-sm px-6 py-3 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 w-[120px]"
    >
      Add Story
    </button>
    <ul class="border-1 border-b-0">
      <li
        v-for="story in stories.docs"
        class="flex items-center justify-between gap-4 px-4 py-4 border-b-1"
      >
        <div class="flex items-center gap-4">
          <input type="checkbox" class="w-[25px] h-[25px]" />
          <div class="flex flex-col">
            <span class="text-sm font-semibold">Title: {{ story.title }}</span>
            <span class="text-sm">Author: {{ story.author }}</span>
          </div>
        </div>

        <div class="flex gap-2">
          <button
            type="button"
            class="text-[#E0FBFC] bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-bold rounded-2xl text-sm px-5 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          >
            Edit
          </button>
          <button
            type="button"
            class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-2xl text-sm px-5 py-2 dark:bg-red-500 dark:hover:bg-red-700 dark:focus:ring-red-900"
          >
            Delete
          </button>
        </div>
      </li>
    </ul>
  </main>
</template>

<style scoped>
.image-rendering-crisp {
  image-rendering: -webkit-optimize-contrast; /* Untuk browser Webkit */
  image-rendering: crisp-edges; /* Standar */
}

.image-rendering-high-quality {
  image-rendering: high-quality;
}
</style>
