/**
 * Created by century on 2017/9/4.
 */
import Vue from 'vue'
import App from './App.vue'
import Router from 'vue-router'
import direction from 'router/direction'
import store from 'store'
import config from 'common/data/config'
import 'assets/theme/tjCurve'
import 'common/plus/areaDom'

import index from './module/index.vue'
import alarm from './module/alarm.vue'

Vue.use(config);
Vue.config.productionTip = false;

Vue.use(Router);
const routes =
  [{
    path: '/',
    name: 'index',
    redirect: '/main',
  }, {
    path: '/main',
    name: 'main',
    component: index,
  },{
    path: '/alarm',
    name: 'alarm',
    component: alarm,
  }];
const router = new Router({
  routes
});
direction('_sysVehicle', router, routes);
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
});
