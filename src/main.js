import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import api from "./Http/api";
import http from "./Http";
import "./assets/css/global.css";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css"; // 默认主题
import Plugin from "./plugin/AllEven";
import '../node_modules/layui/css/layui.css'
Vue.use(ElementUI);
Vue.prototype.$api = api;
Vue.config.productionTip = false;
Vue.prototype.$http = http;
Vue.config.productionTip = false;
Vue.use(Plugin)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
