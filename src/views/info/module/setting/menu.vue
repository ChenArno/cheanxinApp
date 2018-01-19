<template>
  <div>
    <x-header :left-options="{backText: ''}">{{ $t('主题选择') }}</x-header>
    <div class="back-img">
      <md-card-media class="back-img-cell" v-for="(list,index) in lists" :key="index">
        <img :src="require('assets/img/'+list+'.jpg')" alt="back1"  @click="click(list)">
        <span class="weui-icon-checked checked" v-if="checked==list"></span>
      </md-card-media>
    </div>

  </div>
</template>
<i18n>
主题选择:
  en: Choose Topic
</i18n>
<script>
  import {Divider} from 'vux'
  import {mapGetters} from 'vuex'
  export default {
    data(){
      return {
        lists:['back0','back1','back2','back3','back4','back5','back6'],
        checked:'back0'
      }
    },
    components: {
      Divider
    },
    mounted(){
      this.checked = this.backImg
    },
    methods:{
      click(val){
        this.checked = val;
        plus.webview.getWebviewById('index.html').evalJS('gs.menuChange("'+val+'")');
      }
    },
    computed: {
      ...mapGetters([
        'backImg'
      ])
    }
  }
</script>

<style scoped>
  .back-img{
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-wrap: wrap;
    padding: 2%;
  }
  .back-img-cell{
    width: 50%;
    padding: 2%;
    position: relative;
  }
  .checked{
    width: .4rem;
    height: .4rem;
    line-height: .4rem;
    position: absolute;
    right: .3rem;
    top:.3rem;
    background-color: #7db450;
    text-align: center;
    border-radius: 50%;
  }
  .checked:after{
    display: block;
    content: "\EA08";

    color: #FFFFFF;
    font-size: .24rem;
  }
</style>
