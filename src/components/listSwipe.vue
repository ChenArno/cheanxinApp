<template>
  <div class="mui-table-view-cell">
    <div class="mui-slider-right mui-disabled" v-if="swipe">
      <a class="mui-btn mui-btn-red" @click="onDelete">{{ $t('删除') }}</a>
    </div>
    <div class="mui-slider-handle" @click="onclick" :class="height === undefined ? '' : 'active'">
      <slot name="tImg" v-if="imgOpen">
        <img class="list-icon" :src="avatarUrl" @error="errImg">
        <badge class="list-barge" v-if="barge == 0"></badge>
      </slot>
      <div class="list-body" >
        <slot name="body"></slot>
      </div>
      <div class="list-right" :style="{'flex':flex === undefined?3:0}">
        <slot name="right"></slot>
      </div>
      <slot></slot>
    </div>
  </div>
</template>
<script>
  import {Badge} from 'vux'
  export default {
    props: ['avatarUrl', 'switch', 'flex', 'barge','errUrl','height'],
    data(){
      return {}
    },
    computed: {
      imgOpen(){
        if (this.avatarUrl === undefined) return false
        return true
      },
      swipe(){
        if (this.switch === undefined) return false
        return true
      },
      errImg(){
        if (this.errUrl === undefined) return this.$Basic.detarImg
        return this.errtoImg
      },
    },
    components: {
      Badge
    },
    methods: {
      onclick(){
        this.$emit('onClick');
      },
      onDelete(){
        this.$emit('onDelete');
      },
      errtoImg(e){
        e.target.src = require('assets/img/msgNotice.png');
      }
    }
  }
</script>

<style scoped>
  .list-icon {
    width: 1rem;
    min-width: 1rem;
    height: 1rem;
    /*flex: 1;*/
    border-radius: 50%;
  }

  .list-body {
    flex: 5;
    padding: 0 .2rem;
    width: 50%;
  }

  .list-right {
    flex: 3;
  }

  .mui-table-view-cell {
    position: relative;
    overflow: hidden;
    -webkit-touch-callout: none;
  }

  .mui-table-view-cell > .mui-slider-right {
    right: 0;
    -webkit-transition: -webkit-transform 0ms ease;
    transition: transform 0ms ease;
    -webkit-transform: translateX(100%);
    transform: translateX(100%);
  }

  .mui-table-view-cell > .mui-slider-left,
  .mui-table-view-cell > .mui-slider-right {
    position: absolute;
    top: 0;
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    height: 100%;
  }

  .mui-table-view-cell.mui-transitioning > .mui-slider-handle,
  .mui-table-view-cell.mui-transitioning > .mui-slider-left .mui-btn,
  .mui-table-view-cell.mui-transitioning > .mui-slider-right .mui-btn {
    -webkit-transition: -webkit-transform 300ms ease;
    transition: transform 300ms ease;
  }

  .mui-table-view-cell > .mui-slider-left > .mui-btn, .mui-table-view-cell > .mui-slider-right > .mui-btn {
    position: relative;
    left: 0;
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    padding: 0 30px;
    color: #fff;
    border: 0;
    border-radius: 0;
    -webkit-box-align: center;
    -webkit-align-items: center;
    align-items: center;
  }

  .mui-table-view-cell > .mui-slider-left > .mui-btn:after,
  .mui-table-view-cell > .mui-slider-right > .mui-btn:after {
    position: absolute;
    z-index: -1;
    top: 0;
    width: 600%;
    height: 100%;
    content: '';
    background: inherit;
  }

  .mui-btn-danger,
  .mui-btn-negative,
  .mui-btn-red {
    color: #fff;
    border: 1px solid #dd524d;
    background-color: #dd524d;
  }

  .mui-table-view-cell.mui-transitioning > .mui-slider-handle,
  .mui-table-view-cell.mui-transitioning > .mui-slider-left .mui-btn,
  .mui-table-view-cell.mui-transitioning > .mui-slider-right .mui-btn {
    -webkit-transition: -webkit-transform 300ms ease;
    transition: transform 300ms ease;
  }

  .mui-table-view-cell > .mui-slider-handle,
  .mui-table-view-cell > .mui-slider-left .mui-btn,
  .mui-table-view-cell > .mui-slider-right .mui-btn {
    -webkit-transition: -webkit-transform 0ms ease;
    transition: transform 0ms ease;
  }

  .mui-table-view-cell > .mui-slider-handle {
    position: relative;
    background-color: #fff;
    padding: .17rem .29rem;
    height: 1.4rem;
    display: flex;
    justify-content: space-around;
  }
   .mui-table-view-cell > .mui-slider-handle.active{
    padding: .1rem .29rem;
    height: 1rem;
    font-size: .32rem;
   }

  .mui-slider-handle:after {
    content: " ";
    position: absolute;
    left: 0;
    bottom: 0;
    right: 0;
    height: 1px;
    border-top: 1px solid #D9D9D9;
    color: #D9D9D9;
    -webkit-transform-origin: 0 0;
    transform-origin: 0 0;
    -webkit-transform: scaleY(0.5);
    transform: scaleY(0.5);
  }

  .list-barge {
    position: absolute;
    top: .17rem;
    left: 1.1rem;
    width: 5px;
    height: 5px;
    background-color: #DF4F45;
  }
</style>
