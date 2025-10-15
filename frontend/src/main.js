import { createApp } from "vue";
import App from "./App.vue";
import router from "./router/routes.js";
import Toast from "vue-toastification";

import "vue-toastification/dist/index.css";
import "./style.css";

createApp(App).use(Toast).use(router).mount("#app");
