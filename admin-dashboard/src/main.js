import { createApp } from "vue";
import App from "./App.vue";
import router from "./router/routes.js";
import Toast from "vue-toastification";
import VueAwesomePaginate from "vue-awesome-paginate";

import "./style.css";
import "vue-toastification/dist/index.css";
import "vue-awesome-paginate/dist/style.css";

createApp(App).use(router).use(Toast).use(VueAwesomePaginate).mount("#app");
