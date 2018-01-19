<template>
  <div>
    <x-header :left-options="{backText: '',preventGoBack:true}" @on-click-back="cw.close()">{{ $t('帮助中心') }}</x-header>
    <group>
      <cell :title="$t('咨询热线')" is-link>
        <div slot="value">
          <span style="color: #DF4F45" @click="telePhone">{{ tele }}</span>
        </div>
      </cell>
    </group>
  </div>
</template>
<i18n>
是否拨打电话:
  en: Sure to call
</i18n>
<script>
  import { Cell} from 'vux'
  import {mapGetters} from 'vuex'

  export default {
    data(){
      return {
        tele:'4006-571-160',
        cw: null
      }
    },
    components: {
      Cell
    },
    created(){
      mui.plusReady(this.pluseready)
    },
    methods:{
      pluseready(){
        this.cw = plus.webview.currentWebview();
      },
      telePhone(){
        var tel = this.tele.replace(/-/g, "");
        plus.ui.confirm(this.tele, function(e) {
          if(e.index == 0) return plus.device.dial(tel, false);
        }, this.$t("是否拨打电话"), [this.$t("是"),this.$t("否")]);
      }
    }
  }
</script>

<style scoped>
  .tj-opt{
    margin:0 5px;
  }
</style>
