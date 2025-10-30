<script setup>
import { ref, reactive } from "vue";
import { useToast } from "vue-toastification";
import { useRouter } from "vue-router";
import api from "../lib/axios.js";

console.log("add");

const router = useRouter();
const toast = useToast();
const examplesInput = reactive(["", "", ""]);
const formData = ref({
  title: "Test title",
  excerpt:
    "Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. ",
  content: `Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.

Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.

Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.

Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.

Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.`,
  thumbnail:
    "https://i.pinimg.com/1200x/2d/63/8e/2d638eb6e4d62e47c9a991d23ef22c0f.jpg",
  copyright: "original",
  author: "John Doe",
  vocabs: [
    { word: "", meaning: "", example: [""] },
    { word: "", meaning: "", example: [""] },
    { word: "", meaning: "", example: [""] },
  ],
});

const createStory = async () => {
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
    const res = await api.post("/stories", {
      title: formData.value.title,
      excerpt: formData.value.excerpt,
      content: formData.value.content,
      thumbnail: formData.value.thumbnail,
      copyright: formData.value.copyright,
      author: formData.value.author,
      vocabs: [
        {
          word: formData.value.vocabs[0].word,
          meaning: formData.value.vocabs[0].meaning,
          example: examplesInput[0]
            ? examplesInput[0].split(",").map((ex) => ex.trim())
            : [],
        },
        {
          word: formData.value.vocabs[1].word,
          meaning: formData.value.vocabs[1].meaning,
          example: examplesInput[1]
            ? examplesInput[1].split(",").map((ex) => ex.trim())
            : [],
        },
        {
          word: formData.value.vocabs[2].word,
          meaning: formData.value.vocabs[2].meaning,
          example: examplesInput[2]
            ? examplesInput[2].split(",").map((ex) => ex.trim())
            : [],
        },
      ],
    });

    console.log(res.data);
    toast("Success create story", {
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
</script>

<template>
  <form
    @submit.prevent="createStory"
    class="w-[900px] flex flex-col gap-4 border mx-auto p-8"
  >
    <fieldset>
      <label for="title" class="block mb-1 font-medium">Title(required)</label>
      <input
        v-model="formData.title"
        type="text"
        id="title"
        class="border rounded-sm block w-full p-2.5 placeholder:text-gray-600"
        placeholder="title"
        required
      />
    </fieldset>
    <fieldset>
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
    </fieldset>
    <fieldset>
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
    </fieldset>
    <fieldset>
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
    </fieldset>
    <fieldset>
      <label for="copyright" class="block mb-1 font-medium">Copyright</label>
      <input
        v-model="formData.copyright"
        type="text"
        id="copyright"
        class="border rounded-sm block w-full p-2.5 placeholder:text-gray-600"
        placeholder="copyright [original, adapted, public_domain, ai generated]"
      />
    </fieldset>
    <fieldset class="border p-4 flex flex-col gap-6">
      <legend class="text-xl">Vocabularies</legend>
      <fieldset class="border p-4">
        <div class="flex flex-col gap-4">
          <div>
            <label for="word-1" class="block mb-1 font-medium">Word</label>
            <input
              v-model="formData.vocabs[0].word"
              type="text"
              id="word-1"
              class="border rounded-sm block w-full p-2.5 placeholder:text-gray-600"
              placeholder="word"
            />
          </div>
          <div>
            <label for="meaning-1" class="block mb-1 font-medium"
              >Meaning</label
            >
            <input
              v-model="formData.vocabs[0].meaning"
              type="text"
              id="meaning-1"
              class="border rounded-sm block w-full p-2.5 placeholder:text-gray-600"
              placeholder="meaning"
            />
          </div>
          <div>
            <label for="example-1" class="block mb-1 font-medium"
              >Examples</label
            >
            <input
              v-model="examplesInput[0]"
              type="text"
              id="example-1"
              class="border rounded-sm block w-full p-2.5 placeholder:text-gray-600"
              placeholder="separate examples with coma (,)"
            />
          </div>
        </div>
      </fieldset>
      <fieldset class="border p-4">
        <div class="flex flex-col gap-4">
          <div>
            <label for="word-2" class="block mb-1 font-medium">Word</label>
            <input
              v-model="formData.vocabs[1].word"
              type="text"
              id="word-2"
              class="border rounded-sm block w-full p-2.5 placeholder:text-gray-600"
              placeholder="word"
            />
          </div>
          <div>
            <label for="meaning-2" class="block mb-1 font-medium"
              >Meaning</label
            >
            <input
              v-model="formData.vocabs[1].meaning"
              type="text"
              id="meaning-2"
              class="border rounded-sm block w-full p-2.5 placeholder:text-gray-600"
              placeholder="meaning"
            />
          </div>
          <div>
            <label for="example-2" class="block mb-1 font-medium"
              >Examples</label
            >
            <input
              v-model="examplesInput[1]"
              type="text"
              id="example-2"
              class="border rounded-sm block w-full p-2.5 placeholder:text-gray-600"
              placeholder="separate examples with coma (,)"
            />
          </div>
        </div>
      </fieldset>
      <fieldset class="border p-4">
        <div class="flex flex-col gap-4">
          <div>
            <label for="word-3" class="block mb-1 font-medium">Word</label>
            <input
              v-model="formData.vocabs[2].word"
              type="text"
              id="word-3"
              class="border rounded-sm block w-full p-2.5 placeholder:text-gray-600"
              placeholder="word"
            />
          </div>
          <div>
            <label for="meaning-3" class="block mb-1 font-medium"
              >Meaning</label
            >
            <input
              v-model="formData.vocabs[2].meaning"
              type="text"
              id="meaning-3"
              class="border rounded-sm block w-full p-2.5 placeholder:text-gray-600"
              placeholder="meaning"
            />
          </div>
          <div>
            <label for="example-3" class="block mb-1 font-medium"
              >Examples</label
            >
            <input
              v-model="examplesInput[2]"
              type="text"
              id="example-3"
              class="border rounded-sm block w-full p-2.5 placeholder:text-gray-600"
              placeholder="separate examples with coma (,)"
            />
          </div>
        </div>
      </fieldset>
    </fieldset>
    <fieldset class="flex border justify-between gap-2 p-3 pt-2">
      <legend class="text-xl">Level</legend>
      <div>
        <input
          class="mr-2"
          type="radio"
          name="level"
          id="beginner"
          value="Beginner"
          checked
        />
        <label for="beginner">Beginner</label>
      </div>
      <div>
        <input
          class="mr-2"
          type="radio"
          name="level"
          id="intermediate"
          value="Intermediate"
        />
        <label for="intermediate">Intermediate</label>
      </div>
      <div>
        <input
          class="mr-2"
          type="radio"
          name="level"
          id="advanced"
          value="Advanced"
        />
        <label for="advanced">Advanced</label>
      </div>
    </fieldset>

    <button
      type="submit"
      class="text-[#E0FBFC] bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-bold rounded-lg text-sm px-8 py-3 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 mx-auto mt-4"
    >
      Add Story
    </button>
  </form>
</template>
