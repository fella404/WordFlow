<script setup>
import { ref } from "vue";
import { useToast } from "vue-toastification";
import { useRouter } from "vue-router";
import api from "../../lib/adminAxios";

const toast = useToast();
const router = useRouter();

const formData = ref({
  name: "",
  email: "",
  password: "",
});

const handleRegister = async () => {
  try {
    if (
      !formData.value.name ||
      !formData.value.email ||
      !formData.value.password
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

    const res = await api.post("/register", {
      name: formData.value.name,
      email: formData.value.email,
      password: formData.value.password,
    });

    toast.success("Registration successful!", {
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

    router.push("/admin/login");
  } catch (error) {
    if (error.status === 400) {
      toast.error("Password must be at least 8 characters!", {
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
    if (error.status === 409) {
      toast.error("Email already exist!", {
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
      formData.value.email = "";
      return;
    }

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
  <div
    class="flex justify-center gap-8 flex-col w-[500px] mx-auto min-h-screen"
  >
    <h1 class="text-[#195A94] text-center text-3xl/8 font-extrabold">
      WordFlow
    </h1>
    <form @submit.prevent="handleRegister" class="flex flex-col gap-4">
      <input
        type="text"
        v-model="formData.name"
        class="rounded-2xl w-full py-2 px-4 border-1 border-gray-500 placeholder:text-gray-400 placeholder:font-extrabold placeholder:text-sm"
        id="name"
        placeholder="name"
        name="name"
      />
      <input
        type="email"
        v-model="formData.email"
        class="rounded-2xl w-full py-2 px-4 border-1 border-gray-500 placeholder:text-gray-400 placeholder:font-extrabold placeholder:text-sm"
        id="email"
        placeholder="email"
        name="email"
      />
      <input
        type="password"
        v-model="formData.password"
        class="rounded-2xl w-full py-2 px-4 border-1 border-gray-500 placeholder:text-gray-400 placeholder:font-extrabold placeholder:text-sm"
        id="password"
        placeholder="password"
        name="password"
      />
      <button
        type="submit"
        class="text-[#E0FBFC] bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-bold rounded-lg text-sm px-8 py-3 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 mx-auto"
      >
        Register
      </button>
    </form>
  </div>
</template>
