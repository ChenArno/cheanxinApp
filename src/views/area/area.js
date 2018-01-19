/**
 * Created by century on 2017/7/24.
 */
import Vue from 'vue'
import App from './App'
import store from 'store'
import config from 'common/data/config'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.css'
Vue.use(VueMaterial.MdCore);
Vue.use(VueMaterial.MdBackdrop);
Vue.use(VueMaterial.MdRadio);
Vue.use(VueMaterial.MdIcon);
Vue.use(config);
Vue.config.productionTip = false;
/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  render: h => h(App)
});
