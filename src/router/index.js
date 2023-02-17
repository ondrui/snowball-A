import Vue from "vue";
import VueRouter from "vue-router";

import MainInformer from "../views/MainInformer.vue";
import NotFound from "@/components/NotFound.vue";
import HourlyTabContent from "@/components/Tabs/HourlyTabContent.vue";
import MainTabContent from "@/components/Tabs/MainTabContent.vue";
import DayTabContent from "@/components/Tabs/DayTabContent.vue";

Vue.use(VueRouter);

const routes = [
  { path: "/go", redirect: "/" },
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
        path: "/hourly",
        name: "hourly",
        component: HourlyTabContent,
      },
      {
        path: "/days",
        name: "days",
        component: DayTabContent,
      },
    ],
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
});

export default router;
