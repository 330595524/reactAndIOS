import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: () => import("./views/Home.vue"),
  },
  {
    path: "/about",
    name: "about",
    component: () => import("./views/About.vue"),
  },
];

export default function createRouter() {
  return new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes,
  });
}

