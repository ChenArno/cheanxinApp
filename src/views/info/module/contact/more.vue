<template>
  <div>
    <x-header :left-options="{backText: ''}">{{shopMsg.shortLabel}}</x-header>
    <div class="more-cont">
      <div class="more-cont-img">
        <headIcon :title="shopMsg.shortLabel" class="Icon-img" max
                  :avatarUrl="shopMsg.avatarUrl"></headIcon>
      </div>
      <div class="more-cont-role">{{shopMsg.deptName}}</div>
      <div class="more-cont-name">{{phone}}</div>
    </div>
    <div class="more-phone">
      <span @click="openView" :style="isSend?{color:'#E6E5E5'}:{}"><i class="iconfont icon-xiaoxi"></i>{{ $t('发消息') }}</span>
      <span @click="telephone"><i class="iconfont icon-bodadianhua"></i>{{ $t('打电话') }}</span>
    </div>
  </div>
</template>
<i18n>
发消息:
  en: Message
打电话:
  en: Call up
是否拨打电话:
  en: Sure to make a call
</i18n>
<script>
  import {plusready} from 'common/plus'
  import {mapGetters} from 'vuex'
  import Storage from 'common/data/storage'
  import headIcon from 'components/headIcon.vue'
  import {queryUserDetailById} from 'api/Initialize'

  export default {
    data(){
      return {
        uuId: null,
        phone: ''
      }
    },
    created(){
      this.plusready(plusready);
    },
    mounted(){
      this.queryUserDetailById(this.shopMsg.id);
    },
    components: {
      headIcon
    },
    watch: {
      shopMsg(val){
        this.queryUserDetailById(val.id);
      }
    },
    computed: {
      ...mapGetters([
        'shopMsg'
      ]),
      isSend(){
        return (this.shopMsg.ryId == this.uuId) ? true : false
      }
    },
    methods: {
      plusready(){
        this.uuId = new Storage().getUserInfo().userUuid;
      },
      openView(){
        if (this.isSend || !this.shopMsg.ryId) return;
        plus.webview.getWebviewById('index.html').evalJS(`gs.enterRoom('${this.shopMsg.ryId}')`);
      },
      telephone(){
        if (!this.phone || this.phone == this.$t('暂无')) return
        if(mui.os.ios){
          plus.device.dial(this.phone, false);
          return
        }
        plus.ui.confirm(this.phone, (e) => {
          if (e.index == 0) return plus.device.dial(this.phone, false);
        }, this.$t("是否拨打电话"), [this.$t("是"), this.$t("否")]);
      },
      queryUserDetailById(id){
        queryUserDetailById(id).then(res => {
          if (res.data) {
            this.phone = res.data.handphone;
          } else {
            this.phone = this.$t('暂无')
          }
        }).catch(err => {
          this.phone = this.$t('暂无')
        })
      }
    }
  }
</script>

<style lang="less" scoped>
  .more-cont {
    height: 4.3rem;
    &-img {
      height: 2.7rem;
      padding: .4rem 1rem;
      text-align: center;
      border-radius: 50%;
      .Icon-img {
        width: 2rem;
        height: 2rem;
        border-radius: 50%;
        display: inline-block;
        margin: 0;
      }
    }
    &-role, &-name {
      padding: .1rem 0;
      text-align: center;
      width: 100%;
    }
  }

  .more-phone {
    color: #333333;
    height: 1.1rem;
    border-top: 1px solid #E6E5E5;
    border-bottom: 1px solid #E6E5E5;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: .1rem 0;

    & span {
      flex: 1;
      align-items: center;
      display: flex;
      justify-content: center;
      & i {
        margin-right: .1rem;
      }
      &:first-child {
        border-right: 1px solid #E6E5E5;
      }
    }
  }
</style>
