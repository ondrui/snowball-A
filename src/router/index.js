import Vue from "vue";
import VueRouter from "vue-router";

import WeatherInformer from "../views/WeatherInformer.vue";
import NotFound from "@/components/NotFound.vue";

import ListAllCities from "@/components/ListAllCities.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/:locale?",
    name: "main",
    component: WeatherInformer,
    meta: {
      breadcrumb: [{ name: "main" }],
    },
  },
  {
    path: "/:locale?/cities",
    name: "cities",
    component: ListAllCities,
    meta: {
      breadcrumb: [{ name: "main" }, { name: "cities" }],
    },
  },
  {
    path: "/:locale?/pogoda/:city/day",
    name: "pogodaDay",
    component: WeatherInformer,
    meta: {
      breadcrumb: [{ name: "main" }, { name: "weather" }],
    },
  },
  {
    path: "/:locale?/pogoda/:city/hourly",
    name: "pogodaHourly",
    component: WeatherInformer,
    meta: {
      breadcrumb: [{ name: "main" }, { name: "weather" }],
    },
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
  scrollBehavior(to, from) {
    if (
      to.name === "not-found" ||
      to.name === "cities" ||
      to.hash === "#top" ||
      (from.name === "cities" && to.params.tab === "hourly") ||
      from.params.city !== to.params.city
    ) {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  },
});
router.beforeEach((to, from, next) => {
  console.log("to", to);
  console.log("from", from);
  console.log("next", next);
  next();
});
export default router;
