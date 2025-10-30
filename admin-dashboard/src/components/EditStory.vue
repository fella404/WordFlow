<script setup>
import { ref, defineProps } from "vue";
import { useToast } from "vue-toastification";
import { useRouter } from "vue-router";

import api from "../lib/axios.js";

console.log("edit");

const props = defineProps(["storyId"]);
const router = useRouter();
const toast = useToast();
const formData = ref({
  title: "",
  excerpt: "",
  content: "",
  thumbnail: "",
  copyright: "",
  author: "",
});

const getStory = async () => {
  try {
    const res = await api.get(`/stories/${props.storyId}`);
    formData.value.title = res.data.title;
    formData.value.excerpt = res.data.excerpt;
    formData.value.content = res.data.content;
    formData.value.thumbnail = res.data.thumbnail;
    formData.value.copyright = res.data.copyright;
    formData.value.author = res.data.author;
  } catch (error) {
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
  }
};

const editStory = async () => {
  if (
    !formData.value.title ||
    !formData.value.excerpt ||
    !formData.value.content
  ) {
    toast.error("All fields are required!", {
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

  try {
    const res = await api.put(`/stories/${props.storyId}`, {
      title: formData.value.title,
      excerpt: formData.value.excerpt,
      content: formData.value.content,
      thumbnail: formData.value.thumbnail,
      copyright: formData.value.copyright,
      author: formData.value.author,
    });

    toast.success("Success edit story", {
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
    router.push("/");
  } catch (error) {
    console.log(error);
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
  }
};

getStory();
</script>

<template>
  <form
    @submit.prevent="editStory"
    class="w-[900px] flex flex-col gap-4 border mx-auto p-8"
  >
    <div>
      <label for="title" class="block mb-1 font-medium">Title(required)</label>
      <input
        v-model="formData.title"
        type="text"
        id="title"
        class="border rounded-sm block w-full p-2.5 placeholder:text-gray-600"
        placeholder="title"
        required
      />
    </div>
    <div>
      <label for="excerpt" class="block mb-1 font-medium"
        >Excerpt(required)</label
      >
      <textarea
        v-model="formData.excerpt"
        id="excerpt"
        class="border rounded-sm block w-full p-2.5 h-[100px] placeholder:text-gray-600"
        placeholder="excerpt"
        required
      ></textarea>
    </div>
    <div>
      <label for="content" class="block mb-1 font-medium"
        >Content(required)</label
      >
      <textarea
        v-model="formData.content"
        id="content"
        class="border rounded-sm block w-full p-2.5 h-[500px] placeholder:text-gray-600"
        placeholder="content"
        required
      ></textarea>
    </div>
    <div>
      <label class="block mb-2 font-medium" for="file_input"
        >Upload image</label
      >
      <input
        v-model="formData.thumbnail"
        type="text"
        id="file_input"
        class="border rounded-sm block w-full p-2.5 placeholder:text-gray-600"
        placeholder="image (link only)"
      />
    </div>
    <div>
      <label for="copyright" class="block mb-1 font-medium">Copyright</label>
      <input
        v-model="formData.copyright"
        type="text"
        id="copyright"
        class="border rounded-sm block w-full p-2.5 placeholder:text-gray-600"
        placeholder="copyright [original, adapted, public_domain, ai generated]"
      />
    </div>
    <div>
      <label for="author" class="block mb-1 font-medium">Author</label>
      <input
        v-model="formData.author"
        type="text"
        id="author"
        class="border rounded-sm block w-full p-2.5 placeholder:text-gray-600"
        placeholder="author"
      />
    </div>
    <button
      type="submit"
      class="text-[#E0FBFC] bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-bold rounded-lg text-sm px-8 py-3 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 mx-auto mt-4"
    >
      Edit Story
    </button>
  </form>
</template>
