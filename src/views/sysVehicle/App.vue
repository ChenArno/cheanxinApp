<template>
  <transition :name="'vux-pop-' + (direction === 'forward' ? 'in' : 'out')">
    <router-view class="router-view" :defalutDep="defalutDep"></router-view>
  </transition>
</template>

<script>
  import {mapGetters} from 'vuex'
  import 'assets/css/vuxActive.css'
  import {plusready, plusOpen} from 'common/plus'
  import Back from 'common/plus/back'

  export default {
    name: 'app',
    data(){
      return {
        cw: null,
        back:null,
      }
    },
    watch: {
      '$route'(to, from){
        if (to.query.id && (to.name == 'index')) return
        // this.back.backRouter(to.path);
      }
    },
    computed: {
      ...mapGetters([
        'direction',
        'defalutDep'
      ])
    },
    created(){
      plusready(this.plusready);
    },
    methods: {
      plusready(){
        this.cw = plus.webview.currentWebview();
        // this.back = new Back();
        // this.back.muiBack();
      }
    }
  }
</script>

<style scoped>
</style>
