import Vue from "vue";
import VueRouter from "vue-router";
import store from "@/store";

import WeatherInformer from "@/views/WeatherInformer.vue";
import NotFound from "@/views/NotFound.vue";
import ListAllCities from "@/views/ListAllCities.vue";
import TabInformerDay from "@/views/TabInformerDay.vue";
import TabInformerHourly from "@/views/TabInformerHourly.vue";
import TabInformerMain from "@/views/TabInformerMain.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/:lang?/cities",
    name: "cities",
    component: ListAllCities,
    meta: {
      breadcrumb: [{ name: "main" }, { name: "cities" }],
    },
  },
  {
    path: "/:lang?",
    component: WeatherInformer,
    children: [
      {
        path: "",
        name: "main",
        component: TabInformerMain,
        meta: {
          breadcrumb: [{ name: "main" }],
        },
      },
      {
        path: "pogoda/:city/day",
        name: "day",
        component: TabInformerDay,
        meta: {
          breadcrumb: [{ name: "main" }, { name: "weather" }],
        },
      },
      {
        path: "pogoda/:city/hourly",
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
    path: "/:lang?/not-found",
    name: "page-404",
    component: NotFound,
    alias: "*",
    meta: {
      breadcrumb: [{ name: "404" }],
    },
  },
  {
    path: "/:lang?/:pathMatch(.*)*",
    name: "not-found",
    component: NotFound,
    meta: {
      breadcrumb: [{ name: "404" }],
    },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
  scrollBehavior(to) {
    if (to.name === "not-found" || to.name === "cities" || to.hash === "#top") {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
    if (to.hash && to.hash !== "#top") {
      return { selector: to.hash };
    }
  },
});
router.beforeEach((to, from, next) => {
  console.log("to", to);
  const obj = {
    lang: to.params.lang,
    city: to.params.city,
  };
  store.dispatch("setParams", obj).then((res) => {
    console.log(res);
    if (res === 404) {
      next({
        name: "not-found",
        params: { pathMatch: to.path.split("/").slice(1) },
        meta: {
          breadcrumb: [{ name: "404" }],
        },
      });
    } else {
      store.commit("loading", false);
      next();
    }
  });
});

export default router;
