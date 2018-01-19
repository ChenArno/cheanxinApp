/**
 * Created by century on 2017/7/24.
 */
import Vue from 'vue'
import loadVue from './load.vue'
import VueScroller from 'vue-scroller'
import noMessage from './noMessage.vue';
let LoadingConstructor = Vue.extend(noMessage);
const Loading = {
  install(Vue){
    VueScroller.Scroller.props.noDataText.default = '-End-';
    Vue.use(VueScroller);
    Vue.component('tjloading', loadVue);

    let togLoading = ((binding,el) => {
      Vue.nextTick(() => {
        //0 隐藏信息界面 2 没有数据 3 网络异常
        if (binding.rawName == 'v-tloading.type') {
          el.instance.msgState = binding.value;
        }
        if (binding.rawName == 'v-tloading.onclick') {
          el.instance.rest = binding.value;
        }
      })
    })
    Vue.directive('tloading', {
      bind(el, binding) {
        let mask = new LoadingConstructor({
          el: document.createElement('div'),
          data:{
            msgState:0
          }
        });
        el.instance = mask;
        el.mask = mask.$el;
        togLoading(binding,el);
      },
      inserted(el){
        el.appendChild(el.mask);
      },
      update(el, binding){
        togLoading(binding,el);
      }
    });
  }
}
export default Loading

