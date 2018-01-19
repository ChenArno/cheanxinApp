<template>
  <div class="contact-trans">
    <div class="allSort">
      <div class="sortMenu clearfix">
        <ul class="sortMenu-ul">
          <li class="cell" v-for="(item,x) in list">
            <span class="contact-reg" :class="x==(list.length-1)?'active':''"
                  @click="click(x,item)">{{item[newProp]}}
            </span>
            <span class="contact-arrow" v-if="x!=list.length-1">
              <i class="iconfont icon-arrow-down"></i>
            </span>
            <!--<md-icon class="contact-arrow" v-if="x!=list.length-1">keyboard_arrow_right</md-icon>-->
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['list', 'props'],
    name: 'allSort',
    data () {
      return {}
    },
    methods: {
      click(x, val){
        if (x == (this.list.length - 1)) return
        this.$emit('na-click', val);
      }
    },
    computed: {
      newProp(){
        return this.props && this.props.label ? this.props.label : 'shortLabel'
      }
    }
  }
</script>
<style scoped>
  /* 分类菜单*/
  .allSort {
    width: 100%;
    overflow: hidden;
    margin: auto;
  }

  .sortMenu {
    width: 100%;
    background-color: #fff;
    overflow-x: scroll;
    -webkit-overflow-x: scroll;

  }

  .contact-trans {
    height: 40px;
    width: 100%;
    padding: 0 .35rem;
    line-height: 40px;
    background-color: #ffffff;
    border-bottom: 1px solid #E6E6E6;
    overflow-x: auto;
    display: flex;
    justify-content: flex-start;
  }

  ::-webkit-scrollbar {
    width: 0px
  }

  .sortMenu::-webkit-scrollbar {
    width: 0;
    height: 0;
    background-color: #fff;
  }

  .sortMenu-ul {
    min-width: 500px;
    display: flex;
    justify-content: flex-start;
  }

  .sortMenu .cell {
    font-size: .32rem;
    margin: 0;
    height: 40px;
    line-height: 40px;
    text-align: center;
    position: relative;
    text-overflow: ellipsis;
    word-break: keep-all;
    display: flex;
    justify-content: flex-start;
  }

  .contact-reg {
    color: #DF4F45;
  }

  .contact-reg.active {
    color: #999999;
  }
  .contact-arrow{
    width: .32rem;
    height: .32rem;
    margin: auto 3px;
    display: -ms-inline-flexbox;
    display: inline-flex;
    -ms-flex-align: center;
    align-items: center;
    fill: currentColor;
    text-rendering: optimizeLegibility;
    vertical-align: middle;
    font-weight: bold;
    font-style: normal;
    line-height: 1;
    text-transform: none;
    letter-spacing: normal;
    word-wrap: normal;
    white-space: nowrap;
    direction: ltr;
    -webkit-font-smoothing: antialiased;
    text-rendering: optimizeLegibility;
    -moz-osx-font-smoothing: grayscale;
    font-feature-settings: 'liga';
  }

  .icon-arrow-down {
    color: #999999;
    transform:rotate(-90deg);
    -ms-transform:rotate(-90deg); 	/* IE 9 */
    -moz-transform:rotate(-90deg); 	/* Firefox */
    -webkit-transform:rotate(-90deg); /* Safari 和 Chrome */
    -o-transform:rotate(-90deg);
    font-size: .32rem;
  }
</style>

