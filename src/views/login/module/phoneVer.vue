<template>
  <div class="tj-cont">
    <x-header :left-options="{backText: ''}">{{ $t('手机认证') }}</x-header>
    <div class="ver-cont">
      <div class="ver-img">
        <img class="ver-main" :src="require('assets/img/phoneVer.png')">
        <i class="ver-i" :class="statue?'active':''" :style="img"></i>
      </div>
      <div class="ver-span">
        <span v-if="statue">{{ $t('您暂未认证手机号，点击去认证') }}</span>
        <span v-else>{{ $t('恭喜您，认证成功！') }}</span>
      </div>
      <div class="tj-button">
        <x-button @click.native="ver" type="primary">{{ statue ? $t('认证') : $t('完成') }}</x-button>
      </div>
    </div>
  </div>
</template>
<i18n>
您暂未认证手机号，点击去认证:
  en: You have not authenticated the mobile phone number, click to authenticate
恭喜您，认证成功！:
  en: Congradulations ,authentication succeed
认证:
  en: Authentication
</i18n>
<script>
  import {plusready, plusOpen} from 'common/plus'
  import {XButton} from 'vux'
  import Storage from 'common/data/storage'

  export default {
    data(){
      return {
        statue: true,
        img: {'backgroundImage': `url(${require('assets/img/happy.png')})`}
      }
    },
    mounted(){
      this.statue = (this.$route.name == "phoneVer") ? true : false
    },
    components: {
      XButton
    },
    methods: {
      ver(){
        if (this.statue) {
          this.$router.push({name: 'goVer'});
        } else {
          let userInfo = new Storage().getUserInfo();
          userInfo.isPhoneCheck = 2;
          new Storage().getUserInfo(userInfo);
          this.$emit('viewshow');
        }
      }
    }
  }
</script>

<style scoped>

  .ver-img {
    height: 5.85rem;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    position: relative;
  }

  .ver-main {
    height: 2.4rem;
  }

  .ver-i {
    width: .34rem;
    height: .15rem;
    position: absolute;
    top: 3.1rem;
    left: 48.2%;
    background-size: 100% 100%;
  }

  .ver-i.active {
    ransform: rotate(180deg);
    -ms-transform: rotate(180deg); /* IE 9 */
    -moz-transform: rotate(180deg); /* Firefox */
    -webkit-transform: rotate(180deg); /* Safari 和 Chrome */
    -o-transform: rotate(180deg); /* Opera */
  }

  .ver-span {
    width: 100%;
    text-align: center;
    padding-bottom: .5rem;
    color: #666666;
    font-size: 0.3rem;
  }
</style>
