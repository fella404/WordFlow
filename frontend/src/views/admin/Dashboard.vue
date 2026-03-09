<script setup>
import { watch } from "vue";
import { useRoute } from "vue-router";

import Pagination from "../../components/Pagination.vue";
import NotFound from "../../components/NotFound.vue";

import { useStoryStore } from "../../stores/storyStore.js";

const storyStore = useStoryStore();
const route = useRoute();

watch(
  () => route.query.page,
  (newPage) => storyStore.getAllStories(newPage),
  { immediate: true },
);
</script>

<template>
  <main class="flex flex-col gap-6 items-center py-8">
    <router-link
      to="/admin/"
      class="text-[#195A94] text-center text-3xl/8 font-extrabold"
    >
      WordFlow
    </router-link>
    <router-link
      to="/admin/story/add"
      type="button"
      class="text-[#E0FBFC] bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-bold rounded-lg text-sm px-6 py-3 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 w-[120px]"
    >
      Add Story
    </router-link>
    <ul
      v-if="
        storyStore.stories &&
        storyStore.stories.docs &&
        storyStore.stories.docs.length > 0
      "
      class="w-[650px] border border-b-0"
    >
      <li
        v-for="story in storyStore.stories.docs"
        :key="story._id"
        class="flex items-center justify-between gap-4 px-4 py-4 border-b"
      >
        <div class="flex items-center gap-4">
          <input
            :checked="story.published"
            @change="storyStore.publishStory(story)"
            type="checkbox"
            class="w-[25px] h-[25px]"
          />
          <div class="flex flex-col">
            <span class="text-sm font-semibold">Title: {{ story.title }}</span>
            <span class="text-sm">Level: {{ story.level }}</span>
          </div>  
        </div>

        <div class="flex gap-2">
          <router-link
            :to="`/admin/story/edit/${story._id}`"
            type="button"
            class="text-[#E0FBFC] bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-bold rounded-2xl text-sm px-5 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          >
            Edit
          </router-link>
          <button
            @click="storyStore.deleteStory(story._id)"
            type="button"
            class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-2xl text-sm px-5 py-2 dark:bg-red-500 dark:hover:bg-red-700 dark:focus:ring-red-900"
          >
            Delete
          </button>
        </div>
      </li>
    </ul>
    <NotFound
      heading="Cerita tidak ditemukan"
      paragraph="Tambah cerita sekarang!"
      v-else
    />
    <Pagination :stories="storyStore.stories" />
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
