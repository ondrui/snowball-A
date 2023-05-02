import Vue from "vue";
import VueRouter from "vue-router";
import store from "@/store";

import WeatherInformer from "@/views/WeatherInformer.vue";
// import NotFound from "@/views/NotFound.vue";
import HomePage from "@/views/HomePage.vue";
import ListAllCities from "@/views/ListAllCities.vue";
import TabInformerDay from "@/views/TabInformerDay.vue";
import TabInformerHourly from "@/views/TabInformerHourly.vue";
import TabInformerMain from "@/views/TabInformerMain.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/:lang(am|ru)?",
    component: HomePage,
    children: [
      {
        path: "",
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
        path: "cities",
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
  // {
  //   path: "/:pathMatch(.*)*",
  //   name: "not-found",
  //   component: NotFound,
  // },
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
  const lang = to.params.lang || "ru";
  const city = to.params.city;
  const path = to.path;
  const obj = { lang, city, path };

  store.dispatch("setParams", obj).then((res) => {
    console.log(res);
    next();
  });
  // if (
  //   lang === store.getters.getLocale &&
  //   city === store.getters.getCitySelected?.name_en
  // ) {
  //   next();
  // } else if (city) {
  //   console.log("router commit");
  //   store.commit("setLocale", lang);
  //   store.commit("setCity", city);
  //   next();
  // } else {
  // next();
  // }
});
export default router;
