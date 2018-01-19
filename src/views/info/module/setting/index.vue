<template>
  <transition :name="show">
    <router-view class="router-view" :type.sync="type"></router-view>
  </transition>
</template>

<script>
  import 'assets/css/vuxActive.css'
  import {mapGetters} from 'vuex'
  export default {
    data(){
      return {
        type: '',
        show:''
      }
    },
    watch:{
      "$route"(to,from){
        this.show = 'vux-pop-' + (this.direction === 'forward' ? 'in' : 'out');
      }
    },
    computed: {
      ...mapGetters([
        'direction'
      ])
    }
  }
</script>

<style scoped>
</style>
