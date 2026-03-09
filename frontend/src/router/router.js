import { createRouter, createWebHistory } from "vue-router";

import publicRoutes from "./publicRoutes.js";
import adminRoutes from "./adminRoutes.js";
import { useAuthStore } from "../stores/authStore.js";

// Gabungkan semua route
const routes = [...publicRoutes, ...adminRoutes];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

let isAuthInitialized = false;

router.beforeEach(async (to, _, next) => {
  const authStore = useAuthStore();

  if (!isAuthInitialized) {
    await authStore.fetchUser();
    isAuthInitialized = true;
  }

  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  const requiresGuest = to.matched.some((record) => record.meta.requiresGuest);

  if (requiresAuth && !authStore.isAuthenticated) {
    next("/admin/login");
  } else if (requiresGuest && authStore.isAuthenticated) {
    next("/admin/");
  } else {
    next();
  }
});

export default router;
