import { defineStore } from "pinia";
import { ref } from "vue";
import api from "../lib/api.js";
import { useToast } from "vue-toastification";

const toast = useToast();

export const useAuthStore = defineStore("auth", () => {
  const user = ref(null);
  const isAuthenticated = ref(false);
  const isLoading = ref(false);

  const register = async (name, email, password) => {
    try {
      const res = await api.post("/auth/register", {
        name,
        email,
        password,
      });
      user.value = res.data.user;
      isAuthenticated.value = true;
      return user.value;
    } catch (error) {
      toast.error(error.response.data.message, { position: "top-center" });
    }
  };

  const login = async (email, password) => {
    try {
      const res = await api.post("/auth/login", { email, password });
      user.value = res.data.user;
      isAuthenticated.value = true;
      return user.value;
    } catch (error) {
      toast.error(error.response.data.message, { position: "top-center" });
    }
  };

  const logout = async (email, password) => {
    try {
      const res = await api.post("/auth/logout");
      user.value = null;
      isAuthenticated.value = false;
    } catch (error) {
      toast.error(error.response.data.message, { position: "top-center" });
    }
  };

  const fetchUser = async () => {
    try {
      const res = await api.get("/auth/fetch-user");
      user.value = res.data.user;
      isAuthenticated.value = true;
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  return {
    user,
    isAuthenticated,
    isLoading,
    register,
    login,
    logout,
    fetchUser,
  };
});
