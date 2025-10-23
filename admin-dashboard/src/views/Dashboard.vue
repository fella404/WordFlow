<script setup>
import { ref, watch } from "vue";
import { useRoute } from "vue-router";
import { useToast } from "vue-toastification";

import Pagination from "../components/Pagination.vue";

import api from "../lib/axios.js";

const toast = useToast();
const route = useRoute();
const stories = ref([]);

const fetchStories = async (page) => {
  try {
    const res = await api.get("/stories", {
      params: { page },
    });
    stories.value = res.data;
    console.log(stories.value.docs);
  } catch (error) {
    toast.error("Internal server error", {
      position: "top-center",
      timeout: 5000,
      closeOnClick: true,
      pauseOnFocusLoss: true,
      pauseOnHover: true,
      draggable: true,
      draggablePercent: 0.6,
      showCloseButtonOnHover: false,
      hideProgressBar: true,
      closeButton: "button",
      icon: true,
      rtl: false,
    });
  }
};

const publishStory = async (story) => {
  try {
    const res = await api.put(`/stories/${story._id}`, {
      published: !story.published,
    });
    story.published = res.data.published;
    console.log(res.data.published);
  } catch (error) {
    if (error.status === 404) {
      toast.error("Story not found", {
        position: "top-center",
        timeout: 5000,
        closeOnClick: true,
        pauseOnFocusLoss: true,
        pauseOnHover: true,
        draggable: true,
        draggablePercent: 0.6,
        showCloseButtonOnHover: false,
        hideProgressBar: true,
        closeButton: "button",
        icon: true,
        rtl: false,
      });
      return;
    }

    toast.error("Internal server error", {
      position: "top-center",
      timeout: 5000,
      closeOnClick: true,
      pauseOnFocusLoss: true,
      pauseOnHover: true,
      draggable: true,
      draggablePercent: 0.6,
      showCloseButtonOnHover: false,
      hideProgressBar: true,
      closeButton: "button",
      icon: true,
      rtl: false,
    });
  }
};

watch(
  () => route.query.page,
  (newPage) => fetchStories(newPage),
  { immediate: true }
);
</script>

<template>
  <main class="flex flex-col gap-6 items-center py-8">
    <router-link
      to="/"
      class="text-[#195A94] text-center text-3xl/8 font-extrabold"
    >
      WordFlow
    </router-link>
    <router-link
      to="/story/add"
      type="button"
      class="text-[#E0FBFC] bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-bold rounded-lg text-sm px-6 py-3 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 w-[120px]"
    >
      Add Story
    </router-link>
    <ul class="w-[650px] border-1 border-b-0">
      <li
        v-for="story in stories.docs"
        :key="story._id"
        class="flex items-center justify-between gap-4 px-4 py-4 border-b-1"
      >
        <div class="flex items-center gap-4">
          <input
            :checked="story.published"
            @change="publishStory(story)"
            type="checkbox"
            class="w-[25px] h-[25px]"
          />
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
    <Pagination :stories="stories" />
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
