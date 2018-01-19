// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from 'router/info'
import config from 'common/data/config'
import store from 'store'
import './module/dom'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.css'
Vue.use(VueMaterial.MdCore);
Vue.use(VueMaterial.MdCard);
Vue.use(VueMaterial.MdIcon);
Vue.use(VueMaterial.MdButton);

Vue.use(config);
Vue.config.productionTip = false;
/* eslint-disable no-new */

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
});
