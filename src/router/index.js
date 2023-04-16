import Vue from "vue";
import VueRouter from "vue-router";
import store from "@/store";

import WeatherInformer from "@/views/WeatherInformer.vue";
import NotFound from "@/views/NotFound.vue";
import HomePage from "@/views/HomePage.vue";
import ListAllCities from "@/views/ListAllCities.vue";
import TabInformerDay from "@/views/TabInformerDay.vue";
import TabInformerHourly from "@/views/TabInformerHourly.vue";
import TabInformerMain from "@/views/TabInformerMain.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: HomePage,
    children: [
      {
        path: "/",
        component: WeatherInformer,
        children: [
          {
            path: "/",
            name: "main",
            component: TabInformerMain,
            meta: {
              breadcrumb: [{ name: "main" }],
            },
          },
          {
            path: "/pogoda/:city/day",
            name: "day",
            component: TabInformerDay,
            meta: {
              breadcrumb: [{ name: "main" }, { name: "weather" }],
            },
          },
          {
            path: "/pogoda/:city/hourly",
            name: "hourly",
            component: TabInformerHourly,
            meta: {
              breadcrumb: [{ name: "main" }, { name: "weather" }],
            },
          },
        ],
        meta: {
          breadcrumb: [{ name: "main" }, { name: "weather" }],
        },
      },
      {
        path: "/cities",
        name: "cities",
        component: ListAllCities,
        meta: {
          breadcrumb: [{ name: "main" }, { name: "cities" }],
        },
      },
    ],
    meta: {
      breadcrumb: [{ name: "main" }],
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
      from.name === "cities"
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
  if (to.params.city) {
    store.commit("setCity", to.params.city);
  }
  next();
});
export default router;
