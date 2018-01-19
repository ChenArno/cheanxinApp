<template>
  <div class="tj-cont">
    <x-header :left-options="{backText: ''}">{{ $t('重置登录密码') }}</x-header>
    <div class="ver-cont">
      <group class="ver-input">
        <x-input :placeholder="$t('新密码')" v-model="pass" type="password">
          <i slot="label" class="tj-icon iconfont icon-shouji"></i>
        </x-input>
      </group>
      <group class="ver-input">
        <x-input :placeholder="$t('确认新密码')" type="password" v-model="passAgain">
          <i slot="label" class="tj-icon iconfont icon-icon-test"></i>
        </x-input>
      </group>
      <div class="tj-button">
        <x-button @click.native="nextSub" type="primary" :disabled="disabled">{{ $t('重置') }}</x-button>
      </div>
    </div>
  </div>
</template>
<i18n>
重置登录密码:
  en: Reset Login Password
新密码:
  en: New Password
确认新密码:
  en: Confirm New Password
两个密码不一致，请重新确认:
  en: Different Password , Please Recheck
</i18n>
<script>
  import {XButton, XInput, Group} from 'vux'
  import {updateUserPwdReset} from 'api/login'
  import md5 from 'js-md5';
  export default {
    data(){
      return {
        pass: '',
        passAgain: '',
        disabled: true,
        code: '',
        phone: ''
      }
    },
    mounted(){
      this.code = this.$route.query.code;
      this.phone = this.$route.query.phone;
    },
    watch: {
      pass(val){
        if (val.length >= 6 && this.passAgain.length >= 6) {
          this.disabled = false;
          return;
        }
        this.disabled = true;
      },
      passAgain(val){
        if (val.length >= 6 && this.pass.length >= 6) {
          this.disabled = false;
          return;
        }
        this.disabled = true;
      }
    },
    components: {
      XButton,
      XInput,
      Group
    },
    methods: {
      nextSub(){
        if (this.pass !== this.passAgain) return this.$vux.toast.text(this.$t('两个密码不一致，请重新确认') + '！')
        let data = {
          userAccount: this.phone,
          pwdResetCode: this.code,
          userPwd:md5(this.passAgain)
        }
        updateUserPwdReset(data).then(res => {
          if (res.resultStatus) {
            this.$router.push({name: 'main', query: {phone: this.phone}});
            return
          }
          this.$vux.toast.text(res.msg);
        })
      }
    }
  }
</script>

<style scoped>
  .ver-input {
    padding: 0 .3rem;
  }
</style>
