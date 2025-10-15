<script setup>
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { AiOutlinePlayCircle } from "vue-icons-plus/ai";
import { IoStopCircleOutline } from "vue-icons-plus/io";

import api from "../lib/axios.js";
import Navbar from "../components/Navbar.vue";
import { computed } from "vue";

const story = ref(null);
const route = useRoute();

const fetchStory = async () => {
  try {
    const res = await api.get(`/stories/${route.params.id}`);
    story.value = res.data;
  } catch (error) {
    console.log("Error fetching notes: ", error);
  }
};

const paragraphs = computed(() => {
  if (!story.value?.content) return [];
  return story.value.content.split("<p class='newline'></p>");
});

onMounted(() => {
  fetchStory();
});
</script>

<template>
  <Navbar />
  <main v-if="story" class="pb-6">
    <section class="w-[600px] flex flex-col gap-4 mx-auto p-8">
      <h2 class="text-2xl font-semibold">{{ story.title }}</h2>
      <div class="flex gap-4">
        <span>Copyright: {{ story.copyright }}</span>
        <span>Author: {{ story.author }}</span>
      </div>
      <p class="text-[#747474]">{{ story.excerpt }}</p>
      <img :src="story.thumbnail" alt="img" class="h-[320px]" />
      <div class="space-y-5">
        <p v-for="(paragraph, index) in paragraphs" :key="index">
          {{ paragraph }}
        </p>
      </div>
      <div class="flex gap-4 justify-center">
        <button class="p-2 bg-[#EFEFEF] rounded-full">
          <AiOutlinePlayCircle />
        </button>
        <button class="p-2 bg-[#EFEFEF] rounded-full hover:bg-[#f1f1f1]">
          <IoStopCircleOutline />
        </button>
      </div>
    </section>
    <hr class="w-[536px] mx-auto" />
    <section class="w-[600px] flex flex-col gap-4 mx-auto p-8">
      <h2 class="text-2xl font-semibold">Key Vocabulary</h2>
      <div
        v-for="vocab in story.vocabs"
        class="flex flex-col gap-2 bg-[#EDEDED] p-4"
      >
        <h3 class="font-semibold">{{ vocab.word }}</h3>
        <p>Meaning: {{ vocab.meaning }}</p>
        <p>Example:</p>
        <ol>
          <li v-for="(example, index) in vocab.example" class="text-base/5">
            {{ index + 1 }}. {{ example }}
          </li>
        </ol>
      </div>
    </section>
  </main>
</template>

