import { createWebHistory, createRouter } from "vue-router";

import Register from "../views/Register.vue";
import Login from "../views/Login.vue";
import Dashboard from "../views/Dashboard.vue";
import StoryForm from "../views/StoryForm.vue";

const routes = [
  {
    path: "/",
    name: "Dashboard",
    component: Dashboard,
    meta: { requiresAuth: true }, // ✅ Protected route
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/story/add", // add story form
    name: "Add Story",
    component: StoryForm,
    meta: { requiresAuth: true },
  },
  {
    path: "/story/edit/:id", // edit story form
    name: "Edit Story",
    component: StoryForm,
    meta: { requiresAuth: true }, // ✅ Protected route
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem("accessToken");

  if (to.meta.requiresAuth && !isAuthenticated) {
    // Redirect ke login jika mencoba akses protected route tanpa token
    next("/login");
  } else if (
    (to.name === "Login" || to.name === "Register") &&
    isAuthenticated
  ) {
    // Redirect ke dashboard jika sudah login tapi mencoba akses login/register
    next("/");
  } else {
    next();
  }
});

export default router;
