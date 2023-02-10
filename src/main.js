import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import components from "./components/UI";
/**
 * Регистрация часто используемых компонент глобально.
 */
components.forEach((component) => {
  Vue.component(component.name, component);
});

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
