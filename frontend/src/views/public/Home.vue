<script setup>
import { onMounted, ref, watch } from "vue";
import { RouterLink, useRoute } from "vue-router";
import { IoArrowForwardCircleOutline, IoCalendar } from "vue-icons-plus/io";

import Navbar from "../../components/Navbar.vue";
import Pagination from "../../components/Pagination.vue";

import publicApi from "../../lib/publicAxios.js";
import EmptyState from "../../components/EmptyState.vue";

const route = useRoute();
const stories = ref([]);

const fetchStories = async (page) => {
  try {
    const res = await publicApi.get("/stories", {
      params: { page },
    });
    stories.value = res.data;
  } catch (error) {
    console.log("Error fetching notes: ", error);
  }
};

const stopSpeaking = () => {
  if ("speechSynthesis" in window) {
    window.speechSynthesis.cancel();
  }
};

watch(
  () => route.query.page,
  (newPageValue) => {
    const page = Number(newPageValue) || 1;
    fetchStories(page);
  },
  { immediate: true }
);

onMounted(() => {
  stopSpeaking();
});
</script>

<template>
  <Navbar />

  <div class="text-center my-12 px-4">
    <h1 class="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
      Jelajahi Cerita Pilihan
    </h1>
    <p class="text-md md:text-lg text-gray-600 max-w-2xl mx-auto">
      Tingkatkan kemampuan bahasa Inggris anda dengan cara yang menyenangkan.
      Nikmati berbagai cerita pendek pilihan yang dirancang untuk memperkaya
      kosakata dan pemahaman tata bahasa Inggris anda.
    </p>
  </div>

  <main
    v-if="stories && stories.docs && stories.docs.length > 0"
    class="grid grid-cols-[repeat(1,minmax(0,350px))] md:grid-cols-[repeat(2,minmax(0,330px))] lg:grid-cols-[repeat(3,minmax(0,300px))] xl:grid-cols-[repeat(3,minmax(0,350px))] place-content-between place-content-center gap-8 pb-8"
  >
    <div
      v-for="story in stories.docs"
      :key="story._id"
      class="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 border border-gray-100 group flex flex-col"
    >
      <div
        class="relative md:h-[200px] lg:h-[200px] xl:h-[220px] overflow-hidden object-cover transform group-hover:scale-105 transition duration-500"
      >
        <img :src="story.thumbnail" alt="img" class="w-full h-full" />
      </div>
      <div class="flex flex-col gap-4 p-4 transition duration-500">
        <router-link
          :to="`/story/${story._id}`"
          class="w-fit text-gray-900 text-2xl/8 font-semibold hover:text-[#195A94]"
        >
          {{ story.title }}
        </router-link>
        <p class="text-gray-600 text-justify text-base/6">
          {{
            story.excerpt.length > 180
              ? story.excerpt.substring(0, 180) + "..."
              : story.excerpt
          }}
        </p>
        <div class="w-full flex justify-between items-center">
          <span class="text-sm text-gray-500">Level: {{ story.level }}</span>

          <router-link
            :to="`/story/${story._id}`"
            class="inline-flex items-center text-[#195A94] font-semibold hover:text-black transition gap-2"
          >
            Read More
            <IoArrowForwardCircleOutline />
          </router-link>
        </div>
      </div>
    </div>
  </main>
  <EmptyState v-else />
  <Pagination :stories="stories" />
</template>
