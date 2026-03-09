<script setup>
import { onMounted } from "vue";
import { BiPlay } from "vue-icons-plus/bi";
import { FaPauseCircle } from "vue-icons-plus/fa";

import Navbar from "../../components/Navbar.vue";
import NotFound from "../../components/NotFound.vue";
import LoadingState from "../../components/LoadingState.vue";
import Back from "../../components/Back.vue";

import { useStoryStore } from "../../stores/storyStore.js";
import { useTTSStore } from "../../stores/TTSStore.js";

const storyStore = useStoryStore();
const ttsStore = useTTSStore();

onMounted(() => {
  storyStore.getPublishedStoryById();
  ttsStore.stopSpeaking();
});
</script>

<template>
  <Navbar />
  <LoadingState v-if="storyStore.isLoading" />
  <NotFound
    heading="Cerita tidak ditemukan"
    paragraph="Cerita belum tersedia, silahkan cek kembali dalam waktu dekat."
    v-else-if="!storyStore.isLoading && !storyStore.story"
  />
  <main v-else class="p-6">
    <section
      class="w-full md:w-[600px] flex flex-col gap-4 mx-auto md:px-8 pb-8"
    >
      <Back route="/" />
      <h2 class="text-2xl font-semibold">{{ storyStore.story.title }}</h2>
      <div class="flex gap-4">
        <span>Level: {{ storyStore.story.level }}</span>
        <span>Author: {{ storyStore.story.author }}</span>
      </div>
      <p class="text-[#747474] text-justify">{{ storyStore.story.excerpt }}</p>
      <img
        :src="storyStore.story.thumbnail"
        alt="img"
        class="h-[220px] md:h-80"
      />
      <div
        class="bg-white border border-gray-200 p-4 rounded-xl shadow-sm flex flex-col sm:flex-row items-center gap-2 sm:gap-0 justify-between"
      >
        <div class="flex items-center gap-3">
          <span class="font-semibold text-gray-700">Dengarkan Cerita:</span>
        </div>
        <div class="flex gap-3">
          <button
            @click="
              ttsStore.isPaused
                ? ttsStore.resumeSpeaking()
                : !ttsStore.isPaused && ttsStore.isSpeaking
                  ? ttsStore.pauseSpeaking()
                  : ttsStore.startSpeaking(storyStore.story)
            "
            :disabled="ttsStore.isLoading"
            class="flex items-center gap-2 bg-[#4F46E5] hover:bg-indigo-700 text-white px-5 py-2.5 rounded-full font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <BiPlay v-if="!ttsStore.isSpeaking" />
            <FaPauseCircle v-else />
            {{ !ttsStore.isSpeaking ? "Play" : "Pause" }}
          </button>
          <button
            @click="ttsStore.stopSpeaking"
            :disabled="!ttsStore.isSpeaking && !ttsStore.isPaused"
            class="flex items-center gap-2 bg-red-50 text-red-600 hover:bg-red-100 border border-red-200 px-5 py-2.5 rounded-full font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="#ff3603"
              class="w-5 h-5"
            >
              <path
                fill-rule="evenodd"
                d="M4.5 7.5a3 3 0 013-3h9a3 3 0 013 3v9a3 3 0 01-3 3h-9a3 3 0 01-3-3v-9z"
                clip-rule="evenodd"
              />
            </svg>
            Stop
          </button>
        </div>
      </div>
      <p class="text-justify whitespace-pre-line">
        {{ storyStore.story.content }}
      </p>
    </section>
    <hr class="w-full md:w-[536px] mx-auto" />
    <section
      class="w-full md:w-[600px] flex flex-col gap-4 mx-auto md:px-8 py-8"
    >
      <h2 class="text-2xl font-semibold">Key Vocabulary</h2>
      <div
        v-for="vocab in storyStore.story.vocabs"
        class="border flex flex-col gap-2 bg-[#EDEDED] p-4"
      >
        <h3 class="font-semibold">{{ vocab.word }}</h3>
        <p class="text-justify">Meaning: {{ vocab.meaning }}</p>
        <p>Examples:</p>
        <ol>
          <li
            v-for="(example, index) in vocab.example"
            :key="index"
            class="flex gap-2"
          >
            <p>{{ index + 1 }}.</p>
            <p>{{ example }}</p>
          </li>
        </ol>
      </div>
    </section>
  </main>
</template>
