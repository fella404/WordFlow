import { createRouter, createWebHistory } from "vue-router";
import { useToast } from "vue-toastification";

import publicRoutes from "./publicRoutes.js";
import adminRoutes from "./adminRoutes.js";

const toast = useToast();

// Gabungkan semua route
const routes = [...publicRoutes, ...adminRoutes];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, _, next) => {
  const isAuthenticated = !!localStorage.getItem("accessToken");

  if (to.meta.requiresAuth && !isAuthenticated) {
    // Redirect ke login jika mencoba akses protected route tanpa token
    next("/admin/login");
    toast.error("Please login again", {
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
  } else if (
    (to.name === "Login" || to.name === "Register") &&
    isAuthenticated
  ) {
    // Redirect ke dashboard jika sudah login tapi mencoba akses login/register
    next("/admin/");
  } else {
    next();
  }
});

export default router;
