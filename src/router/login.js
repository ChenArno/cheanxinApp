import Vue from 'vue'
import Router from 'vue-router'

import main from 'views/login/module/index.vue'
import phoneVer from 'views/login/module/phoneVer.vue'
import goVer from 'views/login/module/goVer.vue'
import server from 'views/login/module/server.vue'
import language from 'views/login/module/language.vue'
import setIp from 'views/login/module/setIp.vue'
import showPage from 'views/login/module/showPage.vue'
import forget from 'views/login/module/forget.vue'
import Apply from 'views/login/module/Apply.vue'
import direction from './direction'

Vue.use(Router);

const routes =
  [{
    path: '/forget',
    name: 'forget',
    component: forget
  }, {
    path: '/Apply',
    name: 'Apply',
    component: Apply
  }, {
    path: '/main',
    name: 'main',
    component: main
  }, {
    path: '/phoneVer',
    name: 'phoneVer',
    component: phoneVer
  }, {
    path: '/goVer',
    name: 'goVer',
    component: goVer
  }, {
    path: '/phoneVerO',
    name: 'phoneVerO',
    component: phoneVer
  }, {
    path: '/language',
    name: 'language',
    component: language
  }, {
    path: '/server',
    name: 'server',
    component: server
  }, {
    path: '/setIp',
    name: 'setIp',
    component: setIp
  }];
const router = new Router({
  routes
});
direction('_login', router, routes);

export default router
