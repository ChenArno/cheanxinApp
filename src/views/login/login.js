// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from 'router/login'
import config from 'common/data/config'
import store from 'store'
import 'assets/theme/material'

Vue.use(config);
Vue.config.productionTip = false;
/* eslint-disable no-new */

window.loginApp = new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
});
