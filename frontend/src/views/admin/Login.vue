<script setup>
import { ref } from "vue";
import { useToast } from "vue-toastification";
import { useRouter } from "vue-router";
import adminApi from "../../../../admin-dashboard/src/lib/axios";

const toast = useToast();
const router = useRouter();

const formData = ref({
  email: "",
  password: "",
});

const handleLogin = async () => {
  if (!formData.value.email || !formData.value.password) {
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

  try {
    console.log("bef res");
    const res = await adminApi.post("/login", {
      email: formData.value.email,
      password: formData.value.password,
    });
    console.log("after res");

    console.log(res.data);
    localStorage.setItem("accessToken", res.data.accessToken);
    localStorage.setItem("refreshToken", res.data.refreshToken);
    localStorage.setItem("user", JSON.stringify(res.data.username));

    toast.success("Login successful!", {
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

    router.push("/admin/");
  } catch (error) {
    if (error.status === 400) {
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
    if (error.status === 404) {
      toast.error("User not found", {
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
      formData.value.password = "";
      return;
    }
    if (error.status === 401) {
      toast.error("Invalid password", {
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
      formData.value.password = "";
      return;
    }

    if (error.response?.status === 428 || error.response?.status === 401) {
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
      router.push("/login");
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
    <form @submit.prevent="handleLogin" class="flex flex-col gap-4">
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
