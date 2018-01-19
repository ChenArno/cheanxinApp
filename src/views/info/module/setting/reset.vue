<template>
  <div>
    <x-header :left-options="{backText: ''}">{{ $t('重置密码') }}
      <i slot="right" class="tj-red" @click="submit">{{ $t('完成') }}</i>
    </x-header>
    <div class="resetPd">{{ $t('密码可用于登录天机手机版和电脑版（需6~20位）') }}</div>
    <group>
      <x-input :placeholder="$t('请输入原密码')" type="password" v-model="pass" :max="20">
        <i slot="label" class="tj-icon iconfont icon-icon-test"></i>
      </x-input>
      <x-input :placeholder="$t('请输入6~20位密码')" type="password" v-model="newPass" :min="6" :max="20">
        <i slot="label" class="tj-icon iconfont icon-icon-test"></i>
      </x-input>
    </group>
  </div>
</template>
<i18n>
密码可用于登录天机手机版和电脑版（需6~20位）:
  en: The password can be used to log into Mobile and computer version of Shopkeeper (6-20 characters)
请输入原密码:
  en: Please enter the original password
请输入6~20位密码:
  en: Please enter 6-20 characters password
</i18n>
<script>
  import {XInput,Group} from 'vux'
  import {updateUserPwd} from 'api/login'
  import md5 from 'js-md5';
  export default {
    data(){
      return {
        step:0,
        pass:'',
        newPass:''
      }
    },
    components:{
      XInput,
      Group
    },
    methods:{
      submit(){
        let data = {
          userPwd: md5(this.newPass),
          oldUserPwd: md5(this.pass)
        }
        updateUserPwd(data).then(res=>{
          this.$vux.toast.show({
            type: res.resultStatus ? 'success' : 'warn',
            text: res.msg
          })
        }).catch(err=>{
          this.$vux.toast.show({
            type: 'warn',
            text: err.toString()
          })
        })
      }
    }
  }
</script>

<style scoped>
  .resetPd{
    padding: 10px 15px 0;
    font-size: .28rem;
  }
  .tj-red{
    font-style: normal;
  }
</style>
