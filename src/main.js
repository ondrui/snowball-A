import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import components from "./components/UI";
import directives from "./directives";
/**
 * Регистрация часто используемых компонент и директив глобально.
 */
components.forEach((component) => {
  Vue.component(component.name, component);
});

directives.forEach((directive) => {
  Vue.directive(directive.name, directive);
});

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
