import Home from "../views/public/Home.vue";
import StoryDetail from "../views/public/StoryDetail.vue";

const publicRoute = [
  {
    path: "/",
    component: Home,
  },
  {
    path: "/story/:id",
    component: StoryDetail,
  },
];

export default publicRoute;
