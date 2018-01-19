import Vue from 'vue'
import App from './App'
import store from 'store'
import router from 'router'
import config from 'common/data/config'
import 'assets/theme/tjCurve'
import AMap from 'vue-amap';
import './module/dom'
Vue.use(AMap);
AMap.initAMapApiLoader({
  key: '07ce74fea60afe30a0d4391fc61e6644',
  plugin: ['Geolocation','Autocomplete', 'PlaceSearch', 'Scale', 'OverView', 'ToolBar', 'MapType', 'PolyEditor', 'AMap.CircleEditor']
});
Vue.use(config);
Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
});
