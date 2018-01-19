<template>
  <div class="tj-alarm" :class="borderShow?'tj-alarm-bottom':''">
    <div class="tj-triangle" v-if="triangleIsshow">
      <i class="tj-triangle-icon" :class="typeClass"></i>
      <span class="tj-triangle-cell">{{triangle.text}}</span>
    </div>
    <div class="tj-alarm-head">
      <slot name="left">{{title}}</slot>
      <slot name="right">
        <div class="tj-alarm-right">{{time}}</div>
      </slot>
    </div>
    <div class="tj-alarm-body" v-if="bodyIs">
      <slot></slot>
    </div>
    <slot v-else></slot>
  </div>
</template>

<script>
  export default {
    props: ['time', 'title','lbody','triangle','border'],
    data(){
      return {}
    },
    computed:{
      bodyIs(){
        if(this.lbody === undefined) return true;
        return false
      },
      triangleIsshow(){  //右上角三角形
        if(this.triangle === undefined) return false;
        return true
      },
      borderShow(){  //底部线
        if(this.border === undefined) return false;
        return true
      },
      typeClass(){
        if(this.triangle.type == 2){
          return 'pendding'
        }else if(this.triangle.type == 1){
          return 'active'
        }
      }
    }
  }
</script>

<style scoped>
  .tj-alarm {
    padding: .3rem .29rem;
    background-color: #fff;
    margin-top: .2rem;
    position: relative;
    color: #666666;
    font-size: .28rem;
  }

  .tj-alarm-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .tj-alarm-body {
    padding: .3rem 0 0;
    display: flex;
  }
  .tj-triangle{
    position: absolute;
    top: -.22rem;
    right: -1.2rem;
    width: 2rem;
    transform: rotate(45deg);
    -webkit-transform: rotate(45deg);
  }
  .tj-triangle-icon{
    border-bottom: .9rem solid  #FD5F57;
    border-left: .9rem solid transparent;
    border-right: .9rem solid transparent;
    height: 0;
    width: 0;
  }
  .tj-triangle-cell{
    color: #fff;
    font-size: .3rem;
    position: absolute;
    top: .78rem;
    left: .4rem;
  }
  .tj-triangle-icon.active{
    border-bottom-color: #54A1FD;
  }
  .tj-triangle-icon.pendding{
    border-bottom-color: #01ae94;
  }

  .tj-alarm.tj-alarm-bottom{
    /*border-bottom: 1px solid #D9D9D9;*/
    margin: 0;
    position: relative;
  }
  .tj-alarm.tj-alarm-bottom:after{
    content: " ";
    position: absolute;
    left: 0;
    bottom: 0;
    right: 0;
    border-bottom: 1px solid #D9D9D9;
    -webkit-transform-origin: 0 0;
    transform-origin: 0 0;
    -webkit-transform: scaleY(0.5);
    transform: scaleY(0.5);
    color: #666666;
  }
</style>
