import { createWebHistory, createRouter } from "vue-router";

import Home from "../views/Home.vue";
import StoryDetail from "../views/StoryDetail.vue";

const routes = [
  { path: "/", component: Home },
  { path: "/story/:id", component: StoryDetail },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
