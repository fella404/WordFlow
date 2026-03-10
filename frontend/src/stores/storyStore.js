import { defineStore } from "pinia";
import { ref } from "vue";
import { useToast } from "vue-toastification";
import { useRoute } from "vue-router";

import api from "../lib/api.js";

const toast = useToast();

export const useStoryStore = defineStore("stories", () => {
  const stories = ref([]);
  const story = ref(null);
  const isLoading = ref(false);

  const getAllStories = async (page) => {
    try {
      const res = await api.get("/stories/", {
        params: { page },
      });
      stories.value = res.data;
    } catch (error) {
      toast.error(error.response.data.message, { position: "top-center" });
    }
  };

  const getPublishedStories = async (page) => {
    isLoading.value = true;
    try {
      const res = await api.get("/stories/published", {
        params: { page },
      });
      stories.value = res.data;
    } catch (error) {
      console.log("Error fetching notes: ", error);
    } finally {
      isLoading.value = false;
    }
  };

  const getStoryById = async (formData, examplesInput, storyId) => {
    try {
      const res = await api.get(`/stories/${storyId}`);
      formData.title = res.data.title;
      formData.excerpt = res.data.excerpt;
      formData.content = res.data.content;
      formData.thumbnail = res.data.thumbnail;
      formData.author = res.data.author;
      formData.level = res.data.level;
      formData.vocabs = res.data.vocabs;
      examplesInput[0] = res.data.vocabs[0].example.join(";");
      examplesInput[1] = res.data.vocabs[1].example.join(";");
      examplesInput[2] = res.data.vocabs[2].example.join(";");
    } catch (error) {
      toast.error("Internal server error", { position: "top-center" });
    }
  };

  const getPublishedStoryById = async () => {
    const route = useRoute();
    isLoading.value = true;
    try {
      const res = await api.get(`/stories/published/${route.params.id}`);
      story.value = res.data;
    } catch (error) {
      toast.error("Internal server error", { position: "top-center" });
    } finally {
      isLoading.value = false;
    }
  };

  const publishStory = async (story) => {
    try {
      const res = await api.put(`/stories/${story._id}`, {
        published: !story.published,
      });
      story.published = res.data.published;
    } catch (error) {
      toast.error("Failed to publish the story", { position: "top-center" });
    }
  };

  const createStory = async (formData, examplesInput) => {
    try {
      const res = await api.post("/stories", {
        title: formData.title,
        excerpt: formData.excerpt,
        content: formData.content,
        thumbnail: formData.thumbnail,
        author: formData.author,
        level: formData.level,
        vocabs: [
          {
            word: formData.vocabs[0].word,
            meaning: formData.vocabs[0].meaning,
            example: examplesInput[0]
              ? examplesInput[0].split(";").map((ex) => ex.trim())
              : [],
          },
          {
            word: formData.vocabs[1].word,
            meaning: formData.vocabs[1].meaning,
            example: examplesInput[1]
              ? examplesInput[1].split(";").map((ex) => ex.trim())
              : [],
          },
          {
            word: formData.vocabs[2].word,
            meaning: formData.vocabs[2].meaning,
            example: examplesInput[2]
              ? examplesInput[2].split(";").map((ex) => ex.trim())
              : [],
          },
        ],
      });

      toast.success("Story created successfully", { position: "top-center" });
    } catch (error) {
      toast.error("Failed to create the story", { position: "top-center" });
    }
  };

  const editStory = async (formData, examplesInput, storyId) => {
    try {
      const res = await api.put(`/stories/${storyId}`, {
        title: formData.title,
        excerpt: formData.excerpt,
        content: formData.content,
        thumbnail: formData.thumbnail,
        author: formData.author,
        level: formData.level,
        vocabs: [
          {
            word: formData.vocabs[0].word,
            meaning: formData.vocabs[0].meaning,
            example: examplesInput[0]
              ? examplesInput[0].split(";").map((ex) => ex.trim())
              : [],
          },
          {
            word: formData.vocabs[1].word,
            meaning: formData.vocabs[1].meaning,
            example: examplesInput[1]
              ? examplesInput[1].split(";").map((ex) => ex.trim())
              : [],
          },
          {
            word: formData.vocabs[2].word,
            meaning: formData.vocabs[2].meaning,
            example: examplesInput[2]
              ? examplesInput[2].split(";").map((ex) => ex.trim())
              : [],
          },
        ],
      });

      toast.success("Story edited successfully", { position: "top-center" });
    } catch (error) {
      toast.error("Failed to edit the story", { position: "top-center" });
    }
  };

  const deleteStory = async (storyId) => {
    try {
      const res = await api.delete(`/stories/${storyId}`);
      stories.value.docs = stories.value.docs.filter(
        (story) => story._id !== storyId,
      );
      toast.success("Story deleted successfully", { position: "top-center" });
    } catch (error) {
      toast.error("Failed to delete the story", { position: "top-center" });
    }
  };

  return {
    stories,
    story,
    isLoading,
    getAllStories,
    getPublishedStories,
    getStoryById,
    getPublishedStoryById,
    publishStory,
    createStory,
    editStory,
    deleteStory,
  };
});
