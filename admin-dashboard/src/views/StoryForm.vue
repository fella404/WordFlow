<script setup>
import { useRoute } from "vue-router";

const route = useRoute();

console.log(route.params.id);
</script>

<template>
  <h1>Ini story form</h1>
</template>
