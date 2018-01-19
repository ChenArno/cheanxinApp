import 'assets/css/common.css'
import 'assets/fonts/icon.css'
import 'assets/js/mui.min'
import '../plus/ready'

import {XHeader, Group, ToastPlugin, Cell, DatetimePlugin,ConfirmPlugin} from 'vux'
import loading from 'components/loading/index'
function formatComponentName(vm) {
  if (vm.$root === vm) return 'root';
  var name = vm._isVue ? vm.$options.name || vm.$options._componentTag : vm.name;
  return (name ? 'component <' + name + '>' : 'anonymous component') + (vm._isVue && vm.$options.__file ? ' at ' + vm.$options.__file : '');
}
const Basic = {
  pageSize: 10,
  timer: 500,
  statusbar: '#FFFFFF',
  defaultImg: require('assets/img/default.png'),
  nodataImg: require('assets/img/nodata.jpg'),
  errorImg: e => {
    e.target.src = require('assets/img/Splitimage.png');
  },
  noImg: e => {
    e.target.src = require('assets/img/noImg.png');
  },
  detarImg: e => {
    e.target.src = require('assets/img/detar.png');
  }
}

const config = {
  install(Vue){
    Vue.component('XHeader', XHeader);
    Vue.component('Group', Group);
    Vue.component('Cell', Cell);
    Vue.use(ToastPlugin);
    Vue.use(DatetimePlugin);
    Vue.use(loading);
    Vue.use(ConfirmPlugin);
    Vue.prototype.$Basic = Basic;
  }
};
const FastClick = require('fastclick');
FastClick.attach(document.body);

export default config
