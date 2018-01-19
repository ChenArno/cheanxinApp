<template>
  <div>
    <x-header :left-options="{backText: '',preventGoBack:true}" @on-click-back="cw.close()">{{ $t('设置') }}</x-header>
    <group>
      <cell :title="$t('清除缓存')" is-link @click.native="clear"></cell>
      <cell :title="$t('清除图片')" is-link @click.native="clear('img')"></cell>
    </group>

    <group>
      <cell :title="$t('分享')" is-link @click.native="share"></cell>
    </group>

    <group v-if="androidOrIos">
      <cell :title="$t('检测新版本')" is-link @click.native="update"></cell>
    </group>

    <group>
      <cell :title="$t('主题选择')" is-link :link="{name:'menu'}"></cell>
    </group>
    <group>
      <cell :title="$t('重置密码')" is-link :link="{name:'reset'}"></cell>
    </group>
  </div>
</template>
<i18n>
清除缓存:
  en: Clear Cache
清除图片:
  en: Clear Photo
分享:
  en: Share
检测新版本:
  en: New Version Found
主题选择:
  en: Choose Topic
叮咚运营是思创天机™门店智能运营平台所述的移动端，为连锁门店运营体系相关人员（管理角色、执行角色）提供效率优化方案。:
  en: ShopKeeper is a mobile terminal for Sichuang Shopkeeper™ stores intelligent operating platform which provide efficiency optimization plan for related personnel of chain stores operating system (management role, performing roles) .
</i18n>
<script>
  import {Cell, XSwitch} from 'vux'
  import {mapGetters} from 'vuex'
  import Cache from 'common/data/clearCache'
  import Share from 'common/plus/plusShare'
  import PlugIn from 'common/plus/plusPlugIn'

  export default {
    data(){
      return {
        noVal: true,
        cw: null,
        shares: null,
        shareBts: [],
        Share: null,
        androidOrIos: false
      }
    },
    components: {
      Cell,
      XSwitch
    },
    created(){
      mui.plusReady(this.pluseready)
    },
    methods: {
      pluseready(){
        this.cw = plus.webview.currentWebview();
        this.Share = new Share();
        this.androidOrIos = mui.os.ios ? false : true
      },
      clear(val){
        if (!val) return new Cache('img').clearBase();
        new Cache('img').clearImg();
      },
      onClick(newVal){
        this.noVal = newVal;
        plus.push.setAutoNotification(newVal);
      },
      share(){
        const data = {
          title: this.$t('叮咚·运营'),
          content: this.$t('叮咚运营是思创天机™门店智能运营平台所述的移动端，为连锁门店运营体系相关人员（管理角色、执行角色）提供效率优化方案。')
        };
        if (mui.os.ios) {
          data.href = 'https://itunes.apple.com/cn/app/%E5%8F%AE%E5%92%9A-%E8%BF%90%E8%90%A5/id1256312934?mt=8';
        } else {
          data.href = 'https://www.century.shop/shopkeeper/dingdong.apk';
        }
        this.Share.shareShow(data);
      },
      update(){
        new PlugIn().checkUpdate(e=>e,err=>err);
      }
    }
  }
</script>

<style scoped>
</style>
