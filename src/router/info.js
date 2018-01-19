import Vue from 'vue'
import Router from 'vue-router'
import direction from './direction'


import help from 'views/info/module/help.vue'
import email from 'views/info/module/email.vue'
import about from 'views/info/module/about.vue'
import personal from 'views/info/module/personal.vue'
import setting from 'views/info/module/setting/setting.vue'
import settingIndex from 'views/info/module/setting/index.vue'
import menu from 'views/info/module/setting/menu.vue'
import reset from 'views/info/module/setting/reset.vue'
import market from 'views/info/module/market.vue'

import contact from 'views/info/module/contact/index.vue'
import cont from 'views/info/module/contact/cont.vue'
import more from 'views/info/module/contact/more.vue'

Vue.use(Router);

const routes =
  [{
    path: '/contact',
    name: 'contact',
    component: contact,
    redirect:'/contact/cont',
    children:[{
      path: 'cont',
      name: 'cont',
      component: cont
    },{
      path: 'more',
      name: 'more',
      component: more
    }]
  },{
    path: '/help',
    name: 'help',
    component: help
  },{
    path: '/email',
    name: 'email',
    component: email
  },{
    path: '/about',
    name: 'about',
    component: about
  },{
    path: '/setting',
    name: 'setting',
    component: settingIndex,
    redirect:'/setting/set',
    children:[{
      path: 'set',
      name: 'set',
      component: setting
    },{
      path: 'menu',
      name: 'menu',
      component: menu
    },{
      path: 'reset',
      name: 'reset',
      component: reset
    }]
  },{
    path: '/personal',
    name: 'personal',
    component: personal
  }, {
    path: '/market',
    name: 'market',
    component: market
  }];
const router = new Router({
  routes
});
direction('_info',router,routes);
export default router
