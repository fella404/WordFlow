<script setup>
import { useRoute, RouterLink } from "vue-router";

import AddStory from "../../components/AddStory.vue";
import EditStory from "../../components/EditStory.vue";
import Back from "../../components/Back.vue";

const route = useRoute();
</script>

<template>
  <div class="flex flex-col gap-4 p-8">
    <router-link
      to="/admin/"
      class="text-[#195A94] text-center text-3xl/8 font-extrabold"
    >
      WordFlow
    </router-link>
    <Back route="/admin/" />
    <AddStory v-if="!route.params.id" />
    <EditStory v-else :storyId="route.params.id" />
  </div>
</template>
