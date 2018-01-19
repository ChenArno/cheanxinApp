<template>
  <div class="tj-foot">
    <x-header :left-options="{backText: '',preventGoBack:true}" @on-click-back="cw.close()">{{ $t('个人信息') }}
      <i slot="right" @click="contact" class="tj-submit">{{ $t('保存') }}</i>
    </x-header>
    <group>
      <x-input :title='$t("姓名")' :show-clear="false" text-align="right" v-model="userName"></x-input>
      <cell :title='$t("性别")' :value="genderName" is-link @click.native="getter"></cell>
      <cell :title='$t("组织")' :value="orgName"></cell>
      <cell :title='$t("角色")' :value="roleName"></cell>
      <cell :title='$t("帐号类型")' :value="accountTypeName"></cell>
      <cell :title='$t("绑定手机")' :value="phone"></cell>
      <cell :title='$t("绑定邮箱")' :value="email"></cell>
      <cell :title='$t("生日")' @click.native="showPlugin">
        <span class="my-span" slot="child">{{birthday}}</span>
      </cell>
    </group>
    <tjSpinner :tjLoad="tjLoad"></tjSpinner>
  </div>
</template>
<i18n>
未绑定:
  en: Unbounded
</i18n>
<script>
  import {XInput, Datetime, dateFormat, Cell} from 'vux'
  import Storage from 'common/data/storage'
  import nativeUi from 'common/plus/plusNativeUI'
  import {queryUserDetail, updateLoginUser} from 'api/Initialize'
  import tjSpinner from 'components/loading/tjSpinner.vue'

  export default {
    data(){
      return {
        userName: '',
        gender: 1,
        orgName: '',
        cw: null,
        accountTypeName: '',
        phone: '',
        roleName: '',
        email: '',
        birthday: '1991-01-01',
        time: 0,
        tjLoad: false,
        getForm: [this.$t('男'), this.$t('女')],
        isChange: false,
        userInfo:null
      }
    },
    components: {
      XInput,
      Cell,
      tjSpinner
    },
    computed: {
      genderName(){
        return this.getForm[this.gender - 1];
      },
      postData(){
        return {
          birthday: this.birthday,
          email: this.email,
          gender: this.gender,
          telephone: this.phone,
          userName: this.userName
        }
      }
    },
    watch: {
      postData(val, oldVal){
        if (!oldVal.userName) return
        this.isChange = true;
      }
    },
    created(){
      mui.plusReady(this.pluseready);
    },
    methods: {
      pluseready(){
        this.cw = plus.webview.currentWebview();
        this.tjLoad = true;
        this.queryUserDetail().then(res => {
          let {handphone, email, gender, birthday, userName} = res;
          this.userName = userName;
          this.foPhone(handphone);
          this.faEmail(email);
          this.gender = gender;
          this.time = birthday;
          this.birthday = dateFormat(birthday, 'YYYY-MM-DD');
          this.userInfo = new Storage().getUserInfo();
          let {role, accountTypeName, orgName} =  this.userInfo;
          this.orgName = orgName;
          this.accountTypeName = accountTypeName;
          this.faRole(role);
          this.tjLoad = false;
        }).catch(err => {
          this.tjLoad = false;
          this.$vux.toast.text(err.toString())
        });
      },
      queryUserDetail(){
        return new Promise((reslove, reject) => {
          queryUserDetail().then(res => {
            if (res.data) {
              reslove(res.data);
            }
            reslove(false);
          }).catch(err => {
            reject(err);
          })
        })
      },
      foPhone(val){
        if (val && val.length === 11) {
          let forstr = val.substr(0, 3);
          let backStr = val.substr(7, 4);
          this.phone = forstr + "****" + backStr;
        } else {
          this.phone = this.$t('未绑定')
        }
      },
      faEmail(val){
        if (!val) return this.email = this.$t('未绑定')
        let newEmail = '';
        if (val.indexOf('@') > -1) {
          newEmail = val.split('@')[0];
          newEmail = newEmail.substr(0, 3);
          this.email = newEmail + '******@' + email.split('@')[1];
          return;
        }
        newEmail = val.substr(0, 3);
        this.email = newEmail + '******';
      },
      faRole(val){
        if (val && val.length > 0) {
          val.map((v, index) => {
            let str = '|';
            if (index == val.length - 1) {
              str = '';
            }
            this.roleName += v.roleName + str;
          });
        }
      },
      getter(){
        new nativeUi().actionSheet('', this.getForm).then(res => {
          if (res) {
            this.gender = res - 1;
          }
        }).catch(err => err);
      },
      contact(){
        if (!this.isChange) return;
        updateLoginUser(this.postData).then(res => {
          this.$vux.toast.show({
            type: res.resultStatus ? 'success' : 'warn',
            text: res.msg
          })
          if(res.resultStatus){
            this.userInfo.userName = this.userName;
            new Storage().getUserInfo(this.userInfo);
          }
        })
      },
      showPlugin () {
        let max = new Date();
        new nativeUi().pickDate(new Date(this.time), {maxDate: max}).then(res => {
          this.birthday = dateFormat(res, 'YYYY-MM-DD');
        }).catch(err => err);
      }
    }
  }
</script>

<style scoped>
  .my-span {
    color: #666666;
  }
</style>
