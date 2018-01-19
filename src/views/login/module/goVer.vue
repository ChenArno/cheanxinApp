<template>
  <div class="tj-cont">
    <x-header :left-options="{backText: ''}">{{ $t(title) }}</x-header>
    <div class="ver-cont">
      <group class="ver-input">
        <x-input :placeholder="$t(placeholder)" v-model="telphone" :type="type?'text':'number'">
          <i slot="label" class="tj-icon iconfont icon-shouji"></i>
        </x-input>
      </group>
      <group class="ver-input">
        <x-input :placeholder="$t('请输入验证码')" type="number" v-model="validation" :max="4" :show-clear="false">
          <i slot="label" class="tj-icon iconfont icon-icon-test"></i>
          <div slot="right" @click="sendCode" class="ver-send">
            <span v-if="getVer">{{ $t('发送验证码') }}</span>
            <span v-else><span :style="{color:'#DE4F45'}">{{count}}</span>{{ $t('秒后再获取') }}</span>
          </div>
        </x-input>
      </group>
      <div class="tj-button">
        <x-button @click.native="nextSub" type="primary" :disabled="disabled">{{ $t('下一步') }}</x-button>
      </div>
    </div>
  </div>
</template>
<i18n>
找回密码:
  en: Retrieve Password
请输入您的手机号码或者帐号:
  en: Phone or Account
</i18n>
<script>
  import {plusToast} from 'common/plus'
  import {
    getHandphoneVCode,
    updateHandphoneValidator,
    getResetPwdHandphoneVCode,
    validatorResetPwdVCode
  } from 'api/login'
  import Storage from 'common/data/storage'
  import {XButton, XInput, Group} from 'vux'
  export default {
    data(){
      return {
        title: this.$t('手机认证'),
        type: false,
        getVer: true,
        count: 59,
        Interval: null,
        telphone: '',
        validation: "",
        disabled: true,
        placeholder: this.$t('请输入您的手机号')
      }
    },
    mounted(){
      if (this.$route.query.type && this.$route.query.type == 'forget') {
        this.type = true;
        this.placeholder = this.$t('请输入您的手机号码或者帐号')
      }
    },
    components: {
      XButton,
      XInput,
      Group
    },
    watch: {
      validation(val){
        if (this.validation.length === 4) {
          this.disabled = false;
        }
      },
      type(val){
        if (val) {
          this.title = this.$t('找回密码');
        }
      }
    },
    methods: {
      sendCode(){
        if (!this.getVer) return;
        if (this.type) {
          getResetPwdHandphoneVCode(this.telphone).then(res => {
            this.$vux.toast.show({
              text:res.msg,
              type:res.resultStatus?'success':'warn'
            });
          });
        } else {
          getHandphoneVCode(this.telphone).then(res => {
            this.$vux.toast.show({
              text:res.msg,
              type:res.resultStatus?'success':'warn'
            });
          });
        }
        this.getVer = false;
        this.Interval = setInterval(this.update, 1000);
      },
      update () {
        if (this.count <= 0) {
          clearInterval(this.Interval);
          this.count = 59;
          this.getVer = true;
        } else {
          this.count--;
        }
      },
      nextSub(){
        if (this.type) {
          validatorResetPwdVCode({userAccount: this.telphone, validateCode: this.validation}).then(res => {
            if (res.resultStatus) {
              this.$router.push({name: 'forget', query: {code: res.data.resetCode, phone: this.telphone}});
              return
            }
            this.$vux.toast.text(res.msg);
          });
          return
        }
        let data = {
          userAccount: new Storage().getUserInfo().userAccount,
          handphone: this.telphone,
          validateCode: this.validation
        };
        updateHandphoneValidator(data).then(res => {
          if (res.resultStatus) {
            this.$router.push({name: 'phoneVerO'})
          }
        })
      }
    }
  }
</script>

<style scoped>
  .ver-input {
    padding: 0 .3rem;
  }

  .ver-send {
    border-left: 1px solid #D9D9D9;
    color: #333333;
    font-size: .28rem;
    text-align: center;
    padding-left: .27rem;
    width: 2.2rem;
  }
</style>
