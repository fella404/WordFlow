<script setup>
import { ref, defineProps, watch } from "vue";
import { useRouter } from "vue-router";

const props = defineProps(["stories"]);
const router = useRouter();
const currentPage = ref(1);

watch(
  () => props.stories.page,
  (newPage) => {
    if (newPage && newPage > 0) {
      currentPage.value = newPage;
    }
  },
  { immediate: true }
);

const onClickHandler = (page) => {
  if (page) {
    console.log(page);
    router.push({ query: { page } });
  }
};
</script>

<template>
  <div class="flex justify-center pb-6">
    <vue-awesome-paginate
      v-if="props.stories && props.stories.totalDocs > 0"
      :total-items="props.stories.totalDocs"
      :items-per-page="props.stories.limit"
      :max-pages-shown="Math.round(props.stories.totalPages / 2)"
      v-model="currentPage"
      @click="onClickHandler"
    />
  </div>
</template>

<style>
.pagination-container {
  display: flex;
  gap: 0.5rem;
}

.paginate-buttons {
  height: 40px;
  width: 40px;
  border-radius: 0.2rem !important;
  cursor: pointer;
  background-color: rgb(242, 242, 242);
  border: 1px solid rgb(217, 217, 217);
  color: black;
}

.paginate-buttons:hover {
  background-color: #1d1f20;
  color: white;
}

.active-page {
  background-color: #1d1f20;
  border: 1px solid #1d1f20;
  color: white;
}

.active-page:hover {
  background-color: #1d1f20;
}
</style>
