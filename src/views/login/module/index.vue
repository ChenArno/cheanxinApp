<template>
  <div class="login-cont">
    <div class="login-logo">
      <img :src="require('assets/img/loginUrl.png')"/>
      <label class="login-title">{{ $t('车安心') }}</label>
    </div>

    <form class="login-form" novalidate @submit.stop.prevent="login">
      <md-input-container md-clearable :class="loginState?'':'md-input-invalid'" class="login-md">
        <md-icon class="iconfont icon-yonghu"></md-icon>
        <label>{{ $t('用户名或者手机号') }}</label>
        <md-input type="text" v-model="username" @change="blur"></md-input>
        <span class="md-error">{{ $t(err) }}</span>
      </md-input-container>

      <md-input-container class="tj-pass" md-has-password :class="loginPassState?'':'md-input-invalid'">
        <md-icon class="iconfont icon-mima"></md-icon>
        <label>{{ $t('密码') }}</label>
        <md-input type="password" v-model="password" @change="blur"></md-input>
        <span class="md-error">{{ $t(errPass) }}</span>
      </md-input-container>
    </form>
    <div class="tj-button">
      <div class="tj-forget">
        <!-- <span @click="Apply" class="tj-forget-left">{{ $t('申请试用') }}</span>车安心 -->
        <span @click="forget" class="tj-forget-right">{{ $t('忘记密码') }}</span>
      </div>
      <x-button class="tj-button-cell" @click.native="login" type="primary" :disabled="disabled"
                :show-loading="loading">{{ $t('登录') }}
      </x-button>
    </div>
    <div class="l-subhead" @click="setting">
      <divider>{{ $t('登录选项') }}</divider>
    </div>
    <!--<footer :style="{'top':bottom}">-->
    <!--<span>COPYRIGHT&copy;&nbsp;2016&nbsp;CENTURY&nbsp;ALLRIGHT&nbsp;RESERVED</span>-->
    <!--</footer>-->
  </div>
</template>
<i18n>
用户名或者手机号:
  en: User or Phone
忘记密码:
  en: Forget Password
登录选项:
  en: Option for Log In
用户名不能为空:
  en: The user name can not be empty
密码不能小于6位:
  en: Password should beyond 6 number
登录超时，请先检查网络:
  en: Login time out, please check the network first
</i18n>
<script>
  import {plusready, plusOpen, plusToast} from 'common/plus'
  import {XButton, Divider} from 'vux'
  import Storage from 'common/data/storage'
  import {login} from 'api/login'
  import sql from 'common/data/websql'
  import Cache from 'common/data/clearCache'
  import md5 from 'js-md5';

  export default {
    created(){
//      let height = window.document.body.clientHeight || document.documentElement.clientHeight;
//      this.bottom = `${height - 33}px`;
      plusready(this.plusready);
    },
    components: {
      XButton,
      Divider
    },
    data(){
      return {
        loginState: true,
        loginPassState: true,
        cw: '',
        iconType: '',
        username: '',
        password: '',
//        bottom: '',
        err: '',
        errPass: '',
        getui: '',
        sql: null,
        disabled: true,
        loading: false,
        plusViedo: null
      }
    },
    mounted(){
      if (this.$route.query.phone) {
        this.username = this.$route.query.phone;
      }
      document.onkeydown = (event) => {
        if (event.keyCode == 13) {
          this.login();
        }
      };
      var old_back = mui.back;
      mui.back = function () {
        mui.confirm(this.$t("手滑了一下，要退出吗") + '?', '', function (e) {
          if (e.index == 1) {
            plus.runtime.quit();
          }
        });
      }
    },
    watch: {
      username(val){
        if (val !== "" && this.password.length >= 6) {
          this.disabled = false;
          return;
        }
        this.disabled = true;
      },
      password(val){
        if (val.length >= 6 && (this.username !== "")) {
          this.disabled = false;
          return;
        }
        this.disabled = true;
      }
    },
    computed: {},
    methods: {
      plusready(){
        this.cw = plus.webview.currentWebview();
        let plusGetui = plus.push.getClientInfo();
        this.getui = plusGetui.clientid;
        new Cache();
      },
      check(){
        if (this.username === "") {
          this.loginState = false;
          this.err = this.$t('用户名不能为空');
          return false
        }
        if (this.password.length < 6) {
          this.loginPassState = false;
          this.errPass = this.$t('密码不能小于6位');
          return false
        }
        return true
      },
      login(){
        if (!this.check()) return;
        let data = {
          userAccount: this.username,
          userPwd: md5(this.password),
          userCid: this.getui,
          osType: mui.os.ios ? 2 : 1
        };
        this.loading = true;
        login(data).then(res => {
          if (res.resultStatus) {
            if (res.data.isPhoneCheck === 1) {
              this.phoneCheck();
              this.loading = false;
            } else {
              this.$emit('viewshow');
            }
            new Storage().getUserInfo(res.data);
          } else {
            this.loginState = false;
            this.err = res.msg;
            this.loading = false;
          }
        }).catch(err => {
          plusToast(this.$t("登录超时，请先检查网络"));
          this.loading = false;
        });
      },
      phoneCheck(){
        this.$router.push({name: 'phoneVer'});
      },
      setting(){
        this.$router.push({name: 'server'})
      },
      blur(){
        this.loginState = true;
        this.loginPassState = true;
      },
      forget(){
        this.$router.push({name: 'goVer', query: {type: 'forget'}});
      },
      Apply(){
        this.$router.push({name: 'Apply'});
      }
    }
  }
</script>

<style scoped>
  .login-form .md-input-container label {
    font-size: 14px !important;
  }

  .login-form .md-theme-default.md-input-container.md-input-focused:after {
    height: 1px !important;
  }

  .login-logo {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 4.8rem;
    position: relative;
  }

  .login-logo img {
    width: 1.6rem;
  }

  .login-title {
    font-size: .38rem;
    padding: .1rem;
    color: #808080;
    position: absolute;
    width: 100%;
    text-align: center;
    bottom: .5rem;
    letter-spacing: 4px;
  }

  .login-form {
    padding: 0 .4rem;
  }

  .l-subhead {
    color: #666666;
    font-size: .3rem;
    text-align: center;
    margin-top: .8rem;
    padding: 0 .4rem;
  }
  .tj-button-cell {
    border-color: transparent;
  }
  .tj-button-cell:after{
    border-color: transparent;
  }
  .tj-button {
    padding-top: 0;
  }

  .tj-forget {
    color: #d32f2f;
    padding-bottom: 16px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .tj-forget-left{
    color: #B3B3B3;
  }

  .tj-pass {
    margin-bottom: 16px;
  }
</style>
