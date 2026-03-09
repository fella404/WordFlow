import Register from "../views/admin/Register.vue";
import Login from "../views/admin/Login.vue";
import Dashboard from "../views/admin/Dashboard.vue";
import StoryForm from "../views/admin/StoryForm.vue";

const adminRoute = [
  {
    path: "/admin/",
    name: "Dashboard",
    component: Dashboard,
    meta: { requiresAuth: true },
  },
  {
    path: "/admin/register",
    name: "Register",
    component: Register,
    meta: { requiresGuest: true },
  },
  {
    path: "/admin/login",
    name: "Login",
    component: Login,
    meta: { requiresGuest: true },
  },
  {
    path: "/admin/story/add",
    name: "Add Story",
    component: StoryForm,
    meta: { requiresAuth: true },
  },
  {
    path: "/admin/story/edit/:id",
    name: "Edit Story",
    component: StoryForm,
    meta: { requiresAuth: true },
  },
];

export default adminRoute;
