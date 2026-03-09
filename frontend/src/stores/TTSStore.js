import { defineStore } from "pinia";
import { ref } from "vue";
import { useToast } from "vue-toastification";

const toast = useToast();

export const useTTSStore = defineStore("tts", () => {
  const isSpeaking = ref(false);
  const isPaused = ref(false);
  const isLoading = ref(false);

  const startSpeaking = (story) => {
    if (!("speechSynthesis" in window)) {
      return toast.error("Your browser does not support text-to-speech", {
        position: "top-center",
      });
    }

    if (!story.content.trim()) {
      return toast.error("Content is empty", { position: "top-center" });
    }

    const utterance = new SpeechSynthesisUtterance(story.content);
    utterance.lang = "en-US";
    utterance.pitch = 0.8;
    utterance.rate = 0.8;

    utterance.onstart = () => {
      isLoading.value = false;
      isSpeaking.value = true;
      isPaused.value = false;
    };

    utterance.onend = () => {
      isSpeaking.value = false;
      isPaused.value = false;
    };

    utterance.onerror = (event) => {
      isLoading.value = false;
      isSpeaking.value = false;
      isPaused.value = false;
      if (event.error === "interrupted") return;
      return toast.error("Internal server error", { position: "top-center" });
    };

    isLoading.value = true;
    window.speechSynthesis.speak(utterance);
  };

  const pauseSpeaking = () => {
    if ("speechSynthesis" in window && isSpeaking.value && !isPaused.value) {
      window.speechSynthesis.pause();
      isPaused.value = true;
      isSpeaking.value = false;
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

  return {
    isSpeaking,
    isPaused,
    isLoading,
    startSpeaking,
    pauseSpeaking,
    resumeSpeaking,
    stopSpeaking,
  };
});
