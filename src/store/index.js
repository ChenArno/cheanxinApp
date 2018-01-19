/**
 * Created by century on 2017/7/17.
 */
import objectAssign from 'object-assign'
import Vue from 'vue'
import Vuex from 'vuex'
import vuexI18n from 'vuex-i18n'
import getters from './getters'
import position from './modules/position'
import user from './modules/user'
import basic from './modules/basic'
import xcall from './modules/xcall'

Vue.use(Vuex);
const store = new Vuex.Store({
  modules: {
    i18n: vuexI18n.store,
    position,
    user,
    basic,
    xcall
  },
  getters
});
Vue.use(vuexI18n.plugin, store);

const vuxLocales = require('json-loader!yaml-loader!../locales/all.yml')
const componentsLocales = require('json-loader!yaml-loader!../locales/components.yml')
const common = require('json-loader!yaml-loader!../locales/common.yml')
const module = require('json-loader!yaml-loader!../locales/module.yml')

const finalLocales = {
  'zh-CN': objectAssign(vuxLocales['zh-CN'], componentsLocales['zh-CN'], common['zh-CN'],module['zh-CN']),
  'en': objectAssign(vuxLocales['en'], componentsLocales['en'], common['en'],module['en'])
}
for (let i in finalLocales) {
  Vue.i18n.add(i, finalLocales[i])
}

import {LocalePlugin} from 'vux'
Vue.use(LocalePlugin)


const nowLocale = store.getters.lan;

if (/zh/.test(nowLocale)) {
  Vue.i18n.set('zh-CN')
} else {
  Vue.i18n.set('en')
}

export default store

export const i18n = Vue.i18n
