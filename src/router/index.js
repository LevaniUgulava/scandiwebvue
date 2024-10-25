import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import addproduct from "../views/AddProductview.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/addproduct",
    name: "addproduct",
    component: addproduct,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
