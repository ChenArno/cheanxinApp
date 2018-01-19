<template>
  <div>
    <div class="titleContent">
      <div>{{ title }}</div>
      <div @click="showMore">
        <span>{{ listContent }}</span>
        <i class="iconfont icon-arrow-down arrow-down"></i>
      </div>
    </div>
    <div>
      <popup-picker ref="picker" v-show="false" :popup-style="styles" :data="list" @on-change="onChange"></popup-picker>
    </div>
  </div>
</template>

<script>
  import { PopupPicker } from 'vux'
  export default {
    data(){
      return {
        listContent: '',
        styles: {top:'58%',height:'42%',width:'80%',borderRadius:'10px',left:'50%',transform: 'translate(-50%,-50%)'},
      }
    },
    props:['list','title'],
    components:{ PopupPicker },
    created(){
      this.listContent = this.list[0][0];
    },
    methods:{
      showMore(){
        this.$refs.picker.onClick();
      },
      onChange(val){
        this.listContent = val[0];
        this.$emit('onClick', val[0]);
      }
    }
  }
</script>

<style scoped>
  .titleContent{
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: 0 .2rem;
    height: .81rem;
    line-height: .81rem;
    color: #666;
  }

  .arrow-down {
    font-size: .28rem;
  }
</style>
