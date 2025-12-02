import Register from "../views/admin/Register.vue";
import Login from "../views/admin/Login.vue";
import Dashboard from "../views/admin/Dashboard.vue";
import StoryForm from "../views/admin/StoryForm.vue";

const adminRoute = [
  {
    path: "/admin/",
    name: "Dashboard",
    component: Dashboard,
    meta: { requiresAuth: true }, // ✅ Protected route
  },
  {
    path: "/admin/register",
    name: "Register",
    component: Register,
  },
  {
    path: "/admin/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/admin/story/add", // add story form
    name: "Add Story",
    component: StoryForm,
    meta: { requiresAuth: true },
  },
  {
    path: "/admin/story/edit/:id", // edit story form
    name: "Edit Story",
    component: StoryForm,
    meta: { requiresAuth: true }, // ✅ Protected route
  },
];

export default adminRoute;
