<template>
  <div class="tj-loading" v-show="load">
    <div class="noImg" @click="click">
      <img class="noImg-msg" :src="require('assets/img/noMessage.png')" v-if="msgOrNet">
      <img class="noImg-msg" :src="require('assets/img/network_error.png')"  v-else>
      <span class="noImg-msg-text">{{text}}</span>
    </div>
  </div>
</template>
<script>
  import loadVue from './load.vue'

  export default {
    data(){
      return {
        msgState:0,
        load:false,
        msgOrNet:true,
        rest:null
      }
    },
    components: {
      loadVue
    },
    watch:{
      msgState(val){
        if(val !== 0){
          if(val == 1){
            this.msgOrNet = true;
          }else{
            this.msgOrNet = false;
          }
          this.load = true;
        }else{
          this.load = false;
        }
      }
    },
    computed:{
      text(){
        return this.msgOrNet?this.$t('暂无记录'):this.$t('暂无网络')
      }
    },
    methods:{
      click(){
        this.rest && this.rest();
      }
    }
  }
</script>

<style scoped>
  .tj-loading{
    position: absolute;
    top:0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 499;
    background-color: #F2F2F2;
  }
  .noImg{
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
  .noImg span{
    margin-top: .4rem;
  }
  .noImg-msg{
    width: 4rem;
    height: 2.64rem;
  }
  .noImg-msg-text{
    color: #999999;
  }
</style>
