<script setup>
import { ref, watch, computed } from "vue";
import { RouterLink, useRoute } from "vue-router";
import { IoArrowForwardCircleOutline, IoCalendar } from "vue-icons-plus/io";

import Navbar from "../components/Navbar.vue";
import Pagination from "../components/Pagination.vue";

import { formatDate } from "../lib/utils.js";
import api from "../lib/axios.js";

const route = useRoute();
const stories = ref([]);
const searchInput = ref("");

const fetchStories = async (page) => {
  try {
    const res = await api.get("/stories", {
      params: { page },
    });
    stories.value = res.data;
    console.log(stories.value);
  } catch (error) {
    console.log("Error fetching notes: ", error);
  }
};

const getSearch = (val) => (searchInput.value = val);

const renderStories = computed(() => {
  if (!stories.value || !stories.value.docs) return [];

  const storiesArray = stories.value.docs;
  const searchTerm = searchInput.value.toLowerCase().trim();

  return storiesArray.filter((story) => {
    return story.title.toLowerCase().includes(searchTerm);
  });
});

watch(
  () => route.query.page,
  (newPageValue) => {
    const page = Number(newPageValue) || 1;
    fetchStories(page);
  },
  { immediate: true }
);
</script>

<template>
  <Navbar @update:search="getSearch" />
  <main
    class="grid grid-cols-[repeat(1,minmax(0,350px))] md:grid-cols-[repeat(2,minmax(0,330px))] lg:grid-cols-[repeat(3,minmax(0,300px))] xl:grid-cols-[repeat(3,minmax(0,350px))] place-content-between gap-8 pb-8"
  >
    <div
      v-for="story in renderStories"
      :key="story._id"
      class="flex flex-col gap-4"
    >
      <img
        :src="story.thumbnail"
        alt="img"
        class="md:h-[200px] lg:h-[200px] xl:h-[220px] rounded-lg"
      />
      <h2 class="text-[#195A94] text-xl/8 font-semibold">
        {{ story.title }}
      </h2>
      <p class="text-[#747474] text-justify text-base/6">
        {{
          story.excerpt.length > 180
            ? story.excerpt.substring(0, 180) + "..."
            : story.excerpt
        }}
      </p>
      <div class="w-full flex justify-between">
        <div class="flex gap-4 items-center">
          <IoCalendar />
          <span class="text-sm">{{
            formatDate(new Date(story.createdAt))
          }}</span>
        </div>
        <router-link
          :to="`/story/${story._id}`"
          class="flex items-center gap-4 h-[50px] bg-[#195A94] px-4 hover:bg-[#1e6aac] rounded"
        >
          <span class="text-white">Read More</span>
          <IoArrowForwardCircleOutline class="text-white" />
        </router-link>
      </div>
    </div>
  </main>
  <Pagination :stories="stories" />
</template>
