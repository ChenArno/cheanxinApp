<template>
  <div>
    <x-header :left-options="{backText: '',preventGoBack:true}"
              @on-click-back="go">{{isIndex?$t("应用市场"):$t("数据接口应用")}}
      <span slot="left" class="iconfont icon-guanbi" @click="close" v-if="!isIndex"></span>
      <x-progress class="progress" :percent="percent" :show-cancel="false"></x-progress>
    </x-header>
  </div>
</template>
<i18n>
应用市场:
  en: App Store
数据接口应用:
  en: Data Interface
</i18n>
<script>
  import {plusready} from 'common/plus'
  import {mapGetters} from 'vuex'
  import {XProgress} from 'vux'
  export default {
    data(){
      return {
        cw: null,
        embed: null,
        percent: 0,
        isOver: false,
        isIndex:true
      }
    },
    created(){
      this.plusAdd();
      plusready(this.plusready);
    },
    components: {
      XProgress
    },
    watch: {
      plusRouter(val, oldVal){
        if (val == "index") {
          this.isIndex = true;
        } else {
          this.isIndex = false;
        }
      }
    },
    methods: {
      plusready(){
        this.cw = plus.webview.currentWebview();
        let url = this.url + '/tjMarket/platforms/index.html#/appMarket/index';
        this.embed = plus.webview.create(url, 'market', {
          top: '47px',
          bottom: '0px',
          position: 'dock',
          dock: 'bottom',
          bounce: 'vertical'
        });
        this.cw.append(this.embed);

        this.embed.addEventListener('loaded', () => {
          this.isOver = true;
        }, false);
        this.embed.addEventListener('loading', () => {
          this.isOver = false;
        }, false);
      },
      go(){
        if (this.plusRouter == "index") {
          this.cw.close();
        } else {
          this.embed.evalJS("addevent.goback()");
        }
      },
      close(){
        this.cw.close();
      },
      plusAdd(){
        setTimeout(() => {
          this.percent++;
          if (this.isOver) {
            this.percent = 0;
            return
          }
          if (this.percent > 100) {
            this.percent = 0;
            return
          }
          this.plusAdd();
        }, 50)
      }
    },
    computed: {
      ...mapGetters([
        'url',
        'plusRouter'
      ])
    }
  }
</script>

<style scoped>
  .icon-guanbi {
    margin-left: .8rem;
  }

  .progress {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
  }

</style>
