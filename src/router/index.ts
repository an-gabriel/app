// Composables
import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "home",
    component: () =>
      import(/* webpackChunkName: "home" */ "@/views/HomeView.vue"),
  },
  {
    path: "/add",
    name: "add",
    component: () =>
      import(/* webpackChunkName: "home" */ "@/views/AddKnightsView.vue"),
  },
  {
    path: "/list",
    name: "list",
    component: () =>
      import(/* webpackChunkName: "home" */ "@/views/ListKnightsView.vue"),
  },
  {
    path: "/heroes",
    name: "heroes",
    component: () =>
      import(
        /* webpackChunkName: "home" */ "@/views/ListKnightsHeroesView.vue"
      ),
  },
  {
    path: "/update",
    name: "update-knight",
    component: () =>
      import(
        /* webpackChunkName: "home" */ "@/views/UpdateKnightsView.vue"
      ),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
