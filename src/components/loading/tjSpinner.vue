<template>
  <div class="tj-spinner" v-if="tjLoad">
    <spinner type="bubbles" slot="value" size="40px"></spinner>
  </div>
</template>

<script>
  import {Spinner} from 'vux'
  export default {
    props:['tjLoad'],
    components: {
      Spinner
    },
    data(){
      return {}
    }
  }
</script>

<style scoped>
  /*加载等待框*/
  .tj-spinner{
    position: fixed;
    display: flex;
    align-items: center;
    justify-content:center;
    top:0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 9999;
  }
  .tj-spinner .vux-spinner {
    stroke: #EC4F46 !important;
    fill: #EC4F46 !important;
  }
</style>
