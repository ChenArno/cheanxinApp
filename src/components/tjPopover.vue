<template>
  <div class="mask">
    <div class="v-popover-tag" @click.stop="pop($event)">
      <span ref="span">
        <slot></slot>
      </span>
    </div>
    <div class="v-popover-wrap" v-show="show" ref="pop" :style="{right:0,top:y+'px'}">
      <div class="v-popover-arrow"></div>
      <slot name="content"></slot>
    </div>
    <masker ref="mask" :opacity="isShow?0:.3" fullscreen v-if="show" @click.native="show=!show">
    </masker>
  </div>
</template>

<script>
  import {Masker} from 'vux'
  export default {
    props: {
      placement: {
        type: String,
        default: 'top'
      },
      isShow: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        show: false,
        x: 0,
        y: 0
      }
    },
    mounted(){
    },
    components: {
      Masker
    },
    computed: {},
    methods: {
      pop(e) {
        if (this.show) {
          this.show = false;
          return
        }
        const tot = document.querySelector('body').offsetWidth;
//        const target = e.target;
        const target = this.$refs.span;
//        this.x = (tot - this.pageX(target) - target.offsetWidth) / 2;
        this.y = target.offsetHeight + 24;
        this.show = true;
      },
      closeMask(){
        this.show = false;
      },
      pageX(elem){
        return elem.offsetParent ? elem.offsetLeft + this.pageX(elem.offsetParent) : elem.offsetLeft
      },
      pageY(elem){
        return elem.offsetParent ? elem.offsetTop + this.pageY(elem.offsetParent) : elem.offsetTop;
      }
    }
  }
</script>

<style lang="less" scoped>
  .v-popover-cont {
    z-index: 999;
  }

  .mask {
    position: relative;
  }

  .v-popover-wrap {
    position: absolute;
    z-index: 10002;
    -webkit-transition: opacity .3s;
    transition: opacity .3s;
    -webkit-transition-property: opacity;
    transition-property: opacity;
    -webkit-transform: none;
    transform: none;
    border-radius: 7px;
    background-color: #f7f7f7;
    -webkit-box-shadow: 0 0 40px rgba(0, 0, 0, .3);
    box-shadow: 0 0 40px rgba(0, 0, 0, .3);
  }

  .v-popover-arrow {
    position: absolute;
    z-index: 10002;
    overflow: hidden;
    width: 24px;
    height: 24px;
    top: -24px;
    right: 7px;
    &:after {
      position: absolute;
      top: 19px;
      left: 0;
      width: 24px;
      height: 24px;
      content: ' ';
      -webkit-transform: rotate(45deg);
      transform: rotate(45deg);
      border-radius: 3px;
      background: #f7f7f7;
    }
  }

  .v-popover-mask {
    position: fixed;
    z-index: 1000;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    background: rgba(0, 0, 0, .3);
    &.active {
      background: rgba(0, 0, 0, .1);
    }
  }
</style>
