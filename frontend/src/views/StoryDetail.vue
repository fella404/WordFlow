<script setup>
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { useToast } from "vue-toastification";
import { AiOutlinePlayCircle, AiOutlinePauseCircle } from "vue-icons-plus/ai";
import { IoStopCircleOutline } from "vue-icons-plus/io";

import api from "../lib/axios.js";
import Navbar from "../components/Navbar.vue";

const toast = useToast();
const route = useRoute();
const story = ref(null);
const isSpeaking = ref(false);
const isPaused = ref(false);

const fetchStory = async () => {
  try {
    const res = await api.get(`/stories/${route.params.id}`);
    story.value = res.data;
  } catch (error) {
    console.log("Error fetching notes: ", error);
  }
};

const startSpeaking = () => {
  if (!("speechSynthesis" in window)) {
    toast.error("Your browser does not support text-to-speech", {
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

  if (!story.value.content.trim()) {
    toast.error("Content is empty", {
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

  const utterance = new SpeechSynthesisUtterance(story.value.content);
  utterance.lang = "en-US";

  utterance.onstart = () => {
    isSpeaking.value = true;
  };

  utterance.onend = () => {
    isSpeaking.value = false;
  };

  utterance.onerror = (event) => {
    isSpeaking.value = false;
    if (event.error === "interrupted") return;
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
  };

  window.speechSynthesis.speak(utterance);
};

const pauseSpeaking = () => {
  if ("speechSynthesis" in window && isSpeaking.value && !isPaused.value) {
    window.speechSynthesis.pause();
    isPaused.value = true;
  }
};

const resumeSpeaking = () => {
  if ("speechSynthesis" in window && isPaused.value) {
    window.speechSynthesis.resume();
    isPaused.value = false;
  }
};

const stopSpeaking = () => {
  if ("speechSynthesis" in window) {
    window.speechSynthesis.cancel();
    isSpeaking.value = false;
  }
};

onMounted(() => {
  fetchStory();
  stopSpeaking();
});
</script>

<template>
  <Navbar />
  <main v-if="story" class="pb-6">
    <section class="w-[600px] flex flex-col gap-4 mx-auto px-8 pb-8">
      <h2 class="text-2xl font-semibold">{{ story.title }}</h2>
      <div class="flex gap-4">
        <span>Copyright: {{ story.copyright }}</span>
        <span>Author: {{ story.author }}</span>
      </div>
      <p class="text-[#747474] text-justify">{{ story.excerpt }}</p>
      <img :src="story.thumbnail" alt="img" class="h-[320px]" />
      <p class="text-justify">{{ story.content }}</p>
      <div class="flex gap-4 justify-center">
        <button
          @click="
            isPaused
              ? resumeSpeaking()
              : !isPaused && isSpeaking
              ? pauseSpeaking()
              : startSpeaking()
          "
          class="p-2 bg-[#EFEFEF] rounded-full shadow-none transition-shadow duration-300 cursor-pointer hover:shadow-lg hover:shadow-gray-400"
        >
          <AiOutlinePlayCircle v-if="!isSpeaking || isPaused" />
          <AiOutlinePauseCircle v-else />
        </button>
        <button
          @click="stopSpeaking"
          class="p-2 bg-[#EFEFEF] rounded-full shadow-none transition-shadow duration-300 cursor-pointer hover:shadow-lg hover:shadow-gray-400"
        >
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
