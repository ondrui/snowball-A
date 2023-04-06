import Vue from "vue";
import VueRouter from "vue-router";

import MainInformer from "../views/MainInformer.vue";
import NotFound from "@/components/NotFound.vue";
import TabInformerHourly from "@/components/TabInformerHourly.vue";
import MainTabContent from "@/components/TabInformerMain.vue";
import TabInformerDay from "@/components/TabInformerDay.vue";
import ListAllCities from "@/components/ListAllCities.vue";
import store from "@/store/index";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: MainInformer,
    children: [
      {
        path: "/",
        name: "main",
        component: MainTabContent,
      },
      {
        path: "/pogoda/:name/hourly",
        name: "hourly",
        component: TabInformerHourly,
        beforeEnter: (to, from, next) => {
          store.commit("setCity", to.params.name);
          next();
        },
      },
      {
        path: "/pogoda/",
        name: "pogoda",
        component: MainTabContent,
      },
      {
        path: "/pogoda/:name/days",
        name: "days",
        component: TabInformerDay,
        beforeEnter: (to, from, next) => {
          store.commit("setCity", to.params.name);
          next();
        },
      },
    ],
  },
  {
    path: "/cities",
    name: "cities",
    component: ListAllCities,
  },
  {
    path: "/:pathMatch(.*)*",
    name: "not-found",
    component: NotFound,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
  scrollBehavior(to) {
    if (
      to.name === "not-found" ||
      to.name === "cities" ||
      to.hash === "#top" ||
      to.redirectedFrom === "/go"
    ) {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  },
});

export default router;
