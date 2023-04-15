import Vue from "vue";
import VueRouter from "vue-router";

// import WeatherInformer from "@/views/WeatherInformer.vue";
import NotFound from "@/views/NotFound.vue";
import HomePage from "@/views/HomePage.vue";
// import ListAllCities from "@/views/ListAllCities.vue";
// import TabInformerDayContent from "@/components/TabInformerDayContent.vue";
// import TabInformerHourlyContent from "@/components/TabInformerHourlyContent.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: HomePage,
    // children: [
    //   {
    //     path: "/pogoda/:city/day",
    //     name: "pogodaDay",
    //     component: TabInformerDayContent,
    //     meta: {
    //       breadcrumb: [{ name: "main" }, { name: "weather" }],
    //     },
    //   },
    //   {
    //     path: "/pogoda/:city/hourly",
    //     name: "pogodaHourly",
    //     component: TabInformerHourlyContent,
    //     meta: {
    //       breadcrumb: [{ name: "main" }, { name: "weather" }],
    //     },
    //   },
    // ],
    meta: {
      breadcrumb: [{ name: "main" }],
    },
  },
  // {
  //   path: "/cities",
  //   name: "cities",
  //   component: ListAllCities,
  //   meta: {
  //     breadcrumb: [{ name: "main" }, { name: "cities" }],
  //   },
  // },
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
