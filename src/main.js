import Vue from "vue";
import "./plugins/bootstrap-vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "material-icons/iconfont/material-icons.css";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";

Vue.config.productionTip = false;
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
