<script setup>
import { ref } from "vue";
import { RouterLink } from "vue-router";
import { IoArrowForwardCircleOutline, IoCalendar } from "vue-icons-plus/io";

import Navbar from "../components/Navbar.vue";

import { formatDate } from "../lib/utils.js";
import api from "../lib/axios.js";

const stories = ref([]);

const fetchStories = async () => {
  try {
    const res = await api.get("/stories");
    stories.value = res.data;
    console.log(stories.value.docs);
  } catch (error) {
    console.log("Error fetching notes: ", error);
  }
};

fetchStories();
</script>

<template>
  <Navbar />
  <main
    class="grid grid-cols-[repeat(1,minmax(0,350px))] md:grid-cols-[repeat(2,minmax(0,330px))] lg:grid-cols-[repeat(3,minmax(0,300px))] xl:grid-cols-[repeat(3,minmax(0,350px))] place-content-between gap-8 pb-6"
  >
    <div
      v-for="story in stories.docs"
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
      <p class="text-[#747474] text-base/6">{{ story.excerpt }}</p>
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
</template>
