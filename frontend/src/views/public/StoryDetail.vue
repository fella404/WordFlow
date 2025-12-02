<script setup>
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { useToast } from "vue-toastification";
import { AiOutlinePlayCircle, AiOutlinePauseCircle } from "vue-icons-plus/ai";
import { IoStopCircleOutline } from "vue-icons-plus/io";

import publicApi from "../../lib/publicAxios.js";
import Navbar from "../../components/Navbar.vue";

const toast = useToast();
const route = useRoute();
const story = ref(null);
const isSpeaking = ref(false);
const isPaused = ref(false);

const fetchStory = async () => {
  try {
    const res = await publicApi.get(`/stories/${route.params.id}`);
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
    isSpeaking.value = true;
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
  utterance.pitch = 0.9;
  utterance.rate = 0.9;

  utterance.onstart = () => {
    isSpeaking.value = true;
    isPaused.value = false;
  };

  utterance.onend = () => {
    isSpeaking.value = false;
    isPaused.value = false;
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
    isSpeaking.value = true;
  }
};

const stopSpeaking = () => {
  if ("speechSynthesis" in window) {
    window.speechSynthesis.cancel();
    isSpeaking.value = false;
    isPaused.value = false;
  }
};

onMounted(() => {
  fetchStory();
  stopSpeaking();
});
</script>

<template>
  <Navbar />
  <main v-if="story" class="p-6">
    <section
      class="w-full md:w-[600px] flex flex-col gap-4 mx-auto md:px-8 pb-8"
    >
      <h2 class="text-2xl font-semibold">{{ story.title }}</h2>
      <div class="flex gap-4">
        <span>Copyright: {{ story.copyright }}</span>
        <span>Author: {{ story.author }}</span>
      </div>
      <p class="text-[#747474] text-justify">{{ story.excerpt }}</p>
      <img :src="story.thumbnail" alt="img" class="h-[220px] md:h-[320px]" />
      <p class="text-justify whitespace-pre-line">{{ story.content }}</p>
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
    <hr class="w-full md:w-[536px] mx-auto" />
    <section
      class="w-full md:w-[600px] flex flex-col gap-4 mx-auto md:px-8 py-8"
    >
      <h2 class="text-2xl font-semibold">Key Vocabulary</h2>
      <div
        v-for="vocab in story.vocabs"
        class="border flex flex-col gap-2 bg-[#EDEDED] p-4"
      >
        <h3 class="font-semibold">{{ vocab.word }}</h3>
        <p class="text-justify">Meaning: {{ vocab.meaning }}</p>
        <p>Example:</p>
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
