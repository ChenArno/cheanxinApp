import {applyName} from 'utils/validate'

import Vue from 'vue'
import Router from 'vue-router'

import alarm from 'views/index/module/alarm.vue'
import charg from 'views/index/module/charg.vue'
import my from 'views/index/module/my.vue'
import quick from 'views/index/module/quick.vue'

Vue.use(Router)

const routes = [
  {
    path: '/',
    name: 'app',
    redirect: '/quick'
  }, {
    path: '/quick',
    name: 'quick',
    component: quick
  }, {
    path: '/alarm',
    name: 'alarm',
    component: alarm
  }, {
    path: '/charg',
    name: 'charg',
    component: charg
  }, {
    path: '/my',
    name: 'my',
    component: my
  }
];

const router = new Router({
  routes
});

export default router
