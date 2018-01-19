<template>
  <div class="head-vice"><slot></slot>
    <p class="head-vice-cell iconfont" @click="gotoArea">{{showTitle}}</p>
  </div>
</template>

<script>
  import {plusready,plusOpen} from 'common/plus'
  import {mapGetters} from 'vuex'

  export default {
    props: ['areaType','page'],   //选项 'shop'  or 'area'
    methods: {
      gotoArea(){
        plusOpen('area.html', 'area.html', {}, {page: this.page, areaType: this.areaType});
      }
    },
    computed: {
      ...mapGetters([
        'defalutDep',
        'defalutArea'
      ]),
      showTitle(){
        return this.areaType == 'shop' ? this.defalutDep.deptName : this.defalutArea.label
      }
    }
  }
</script>

<style scoped>
  .head-vice{
    display: flex;
    justify-content: center;
  }
  .head-vice-cell{
    font-size: .3rem;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    position: relative;
    padding-right: .2rem;
    margin-left: .2rem;
    padding-top: 1px;
  }
  .head-vice-cell:after{
    content: '\e607';
    position: absolute;
    right: -9px;
    bottom: -5px;
    font-size: 21px;
    transform: rotate(-44deg);
    -webkit-transform: rotate(-44deg);
    color: #999797;
  }
</style>
