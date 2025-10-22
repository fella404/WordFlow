import { createWebHistory, createRouter } from "vue-router";

import Register from "../views/Register.vue";
import Login from "../views/Login.vue";
import Dashboard from "../views/Dashboard.vue";
import StoryForm from "../views/StoryForm.vue";

const routes = [
  {
    path: "/",
    component: Dashboard,
  },
  {
    path: "/register",
    component: Register,
  },
  {
    path: "/login",
    component: Login,
  },
  {
    path: "/story/add", // add story form
    component: StoryForm,
  },
  {
    path: "/story/edit/:id", // edit story form
    component: StoryForm,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
