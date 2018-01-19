<template>
  <div class="stock-list"
       :style="{'border-top-color':border,'color':color,'background-color':color?'#fff':'transparent'}">
    <div class="stock-list-left">
      <span :style="{'background-color':color}" v-if="color"></span>
      <span v-else></span>
    </div>
    <div class="stock-list-right">
      <div :style="{'color':textColor,'padding':data.lists.length == 1 ?'.3rem .2rem':'.1rem .2rem;'}"
           v-for="i in data.lists">
        <span class="stock-list-span" :style="{'color':mainColor}">{{i.name}}</span>
        {{i.value}}
      </div>
    </div>
    <div class="stock-list-unit" :style="{'color':color}" v-if="color">
      <span v-if="data.isValue>0">{{data.isValue}}个</span>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['color', 'data'],
    data(){
      return {
        mainColor: '#999999',
        textColor: '#333333'
      }
    },
    computed: {
      border(){
        if (this.color) {
          this.mainColor = '#999999';
          this.textColor = '#333333';
          return '#EBEBEB'
        }
        this.mainColor = '#fff';
        this.textColor = '#fff';
        return '#fff'
      }
    },
    created(){

    }
  }
</script>

<style lang="less" scoped>

  .stock-list {
    color: #fff;
    display: flex;
    background-color: transparent;
    border-top: 1px solid #fff;
    &:last-child {
      border-bottom: 1px solid #fff;
    }
    &-unit {
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    &-left {
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
      & span {
        width: .2rem;
        height: .2rem;
        border-radius: 50%;
        background-color: #fff;
      }
    }
    &-right {
      flex: 7;
      & div {
        padding: .1rem .2rem;
      }
    }
  }

  .stock-list-span {
    display: inline-block;
  }
</style>
