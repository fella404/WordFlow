import { defineStore } from "pinia";
import { ref } from "vue";

import api from "../lib/api.js";

export const useSearchStore = defineStore("search", () => {
  const searchResults = ref([]);
  const isLoading = ref(false);
  let timeoutId = null;

  const debouncedSearch = (query) => {
    isLoading.value = true;
    clearTimeout(timeoutId);
    timeoutId = setTimeout(async () => {
      if (query.trim()) {
        await performSearch(query);
      } else {
        searchResults.value = [];
      }
    }, 1500);
  };

  const performSearch = async (query) => {
    try {
      const res = await api.get(
        `/stories/search?=${encodeURIComponent(query)}`,
        {
          params: { search: query },
        },
      );
      searchResults.value = res.data;
    } catch (error) {
      console.log("Error performing search: ", error);
      searchResults.value = [];
    } finally {
      isLoading.value = false;
    }
  };

  return { searchResults, isLoading, debouncedSearch, performSearch };
});
