<template>
  <div class="tj-cont">
    <x-header :left-options="{backText: ''}">{{ $t('申请试用') }}</x-header>
    <div class="step">
      <div :class="step==0?'step-process':'step-finish'">
        <div class="apply-cont">
          <group class="ver-input">
            <x-input :placeholder="$t('请输入您的姓名')" v-model="name">
              <i slot="label" class="tj-icon iconfont icon-yonghu"></i>
            </x-input>
          </group>
          <group class="ver-input">
            <x-input :placeholder="$t('请输入您的手机号')" v-model="phoneNumber" type="number">
              <i slot="label" class="tj-icon iconfont icon-shouji"></i>
            </x-input>
          </group>
          <group class="ver-input weui-cells_form">
            <x-input :placeholder="$t('请输入验证码')" v-model="code" type="number" class="weui-vcode" :show-clear="false" :max="4">
              <i slot="label" class="tj-icon iconfont icon-icon-test"></i>
              <div slot="right" class="ver-send" @click="getCode">
                <span v-if="getVer">{{ $t('发送验证码') }}</span>
                <span v-else>{{getTime}}</span>
              </div>
            </x-input>
          </group>
        </div>
      </div>
      <div :class="step==1?'step-process':'step-finish'">
        <div class="apply-cont">
          <group class="ver-input">
            <x-input :placeholder="$t('请输入公司邮箱')" v-model="email" type="email">
              <i slot="label" class="tj-icon iconfont icon-email"></i>
            </x-input>
          </group>
          <group class="ver-input">
            <x-input :placeholder="$t('请输入公司名')" v-model="company" type="text">
              <i slot="label" class="tj-icon iconfont icon-gongsi"></i>
            </x-input>
          </group>
          <group class="ver-input">
            <x-input :placeholder="$t('请输入公司地址')" v-model="addr" type="text">
              <i slot="label" class="tj-icon iconfont icon-icon1"></i>
            </x-input>
          </group>
        </div>
      </div>
      <div :class="step==2?'step-process':'step-finish'">
        <div class="apply-cont">
          <group class="ver-input">
            <x-input :placeholder="$t('职位')" v-model="job" type="text">
              <i slot="label" class="tj-icon iconfont icon-yonghu"></i>
            </x-input>
          </group>
          <group class="ver-input" @click.native="choseSource">
            <div class="source-input">
              <i slot="label" class="tj-icon iconfont icon-xiaoxi"></i>
              <span>{{ $t(source) }}</span>
            </div>
          </group>
          <div class="remarks">
            <textarea class="textarea" :placeholder="$t('填写备注')" v-model="remarks"></textarea>
          </div>
        </div>
      </div>
    </div>
    <div class="btn_wrap">
      <x-button type="primary" @click.native="nextStep" class="btn">{{ $t(btnVal) }}</x-button>
    </div>
    <div>
      <popup-picker ref="picker" v-show="false" :data="sourceData" @on-change="onChange"></popup-picker>
    </div>
    <div>
      <alert v-model="alertShow">{{ $t(alertContent) }}</alert>
    </div>
  </div>
</template>
<i18n>
请输入公司邮箱:
  en: Company's E-mail
请输入公司名:
  en: Company's Name
请输入公司地址:
  en: Company's Adress
职位:
  en: Position
展会:
  en: Exhition
网站:
  en: Website
推荐:
  en: Recommandation
来源:
  en: Source
填写备注:
  en: Remarks
姓名长度大于2:
  en: Length of name is longer than 2
请输入正确的手机号码:
  en: Incorrect Phone Number
邮箱格式不正确:
  en: Incorrect email format
公司名不能为空:
  en: Company's name can not be empty
公司地址不能为空:
  en: Company's adress can not be empty
来源不能为空:
  en: The source cannot be empty
感谢您的注册，请等待我们的商务跟您联系:
  en: Thank you for your registration. Please wait for our staff contact with you
</i18n>
<script>
  import {mapGetters} from 'vuex'
  import {XButton, Group, Alert, PopupPicker, XInput} from 'vux'
  import {getHandphoneVCode, validatorHandphomeVCode, addApply} from 'api/sysApply'
  export default {
    data(){
      return {
        step: 0,
        name: '',
        getVer: true,
        count: 119,
        phoneNumber: '',
        code: '',
        btnVal: '下一步',
        alertShow: false,
        alertContent: '',
        email: '',
        company: '',
        addr: '',
        job: '',
        source: this.$t('来源'),
        remarks: '',
        validate: false,
        commitCode: '',
        sourceData: [[
          this.$t('展会'),
          this.$t('网站'),
          this.$t('推荐'),
          this.$t('其他')
        ]]
      }
    },
    computed:{
      ...mapGetters([
        'lan'
      ]),
      getTime(){
        if (/en/.test(this.lan)) {
          return 'Resend after'+this.count + 's'
        }
        return this.count + '秒后再获取'
      }
    },
    components: {
      XButton,
      Group,
      Alert,
      XInput,
      PopupPicker
    },
    methods: {
      nextStep () {
        if (this.step == 0) {
          if (this.name.length < 2) {
            this.alertShow = true;
            this.alertContent = this.name.length == 0 ? this.$t('请输入您的姓名') : this.$t('姓名长度大于2')
            return
          }
          let data = {
            handphone: this.phoneNumber,
            validateCode: this.code
          }
          validatorHandphomeVCode(data).then(res => {
            if (res.resultStatus) {
              this.commitCode = res.data.commitCode;
              this.step++;
            } else {
              this.validate = false;
              this.alertShow = true;
              this.alertContent = res.msg;
            }
          })
        } else if (this.step == 1) {
          let reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
          let isemail = reg.test(this.email)
          if (!isemail || !this.company || !this.addr) {
            if (!isemail) {
              this.alertContent = this.$t('邮箱格式不正确')
            } else if (!this.company) {
              this.alertContent = this.$t('公司名不能为空')
            } else {
              this.alertContent = this.$t('公司地址不能为空')
            }
            this.alertShow = true;
            return
          }
          this.alertShow = false;
          this.btnVal = this.$t('提交')
          this.step++;
        } else {
          if (!this.source && this.source != this.$t('来源')) {
            this.alertContent = this.$t('来源不能为空')
            this.alertShow = true;
            return
          }
          let data = {
            contactName: this.name,
            handphone: this.phoneNumber,
            email: this.email,
            companyName: this.company,
            companyAddress: this.addr,
            companyPosition: this.job,
            comeFrom: this.source,
            description: this.remarks,
            commitCode: this.commitCode
          }
          addApply(data).then(res => {
            if (res.resultStatus) {
              plus.nativeUI.alert(this.$t('感谢您的注册，请等待我们的商务跟您联系'),()=>{},this.$t('提示'));
              this.$router.push({name: 'main'});
              return
            }
            this.alertContent = res.msg;
            this.alertShow = true;
          })
        }
      },
      getCode(){
        if (!this.getVer) return;
        if (this.phoneNumber.length != 11) {
          this.alertShow = true;
          this.alertContent = this.$t('请输入正确的手机号码');
          return
        }
        let data = {
          handphone: this.phoneNumber
        }
        getHandphoneVCode(data).then(res => {
          if (res.resultStatus) {
            this.getVer = false;
            this.Interval = setInterval(this.update, 1000);
          }
          this.$vux.toast.show({
            text: res.msg,
            type: res.resultStatus ? 'success' : 'warn'
          })
        }).catch(err => {
          this.$vux.toast.show({
            text: this.$t("网络异常，请先检查网络"),
            type: 'warn'
          });
        })
      },
      update () {
        if (this.count <= 0) {
          clearInterval(this.Interval);
          this.count = 119;
          this.getVer = true;
        } else {
          this.count--;
        }
      },
      choseSource(){
        this.$refs.picker.onClick();
      },
      onChange(val){
        this.source = val[0]
      }
    }
  }
</script>

<style scoped>
  .btn_wrap {
    padding: 0 .3rem;
    margin-top: .3rem;
  }

  .step-process {
    display: block;
  }

  .step-finish {
    display: none;
  }

  .btn {
    font-size: .36rem;
  }

  .apply-cont {
    padding: 0 .3rem;
  }

  .group-content {
    padding: 0 .3rem;
  }

  .ver-send {
    border-left: 1px solid #D9D9D9;
    color: #333333;
    font-size: .28rem;
    text-align: center;
    padding-left: .27rem;
  }

  .remarks {
    margin-top: .3rem;
  }

  .textarea {
    width: 100%;
    height: 1.61rem;
    font-size: .28rem;
    padding: 5px .3rem;
    border-radius: 8px;
    resize: none;
    border: 1px solid #CCCCCC;
  }
  .source-input{
    width: 100%;
    height: 100%;
    padding: 10px 15px;
    display: flex;
    flex-wrap: nowrap;
    justify-content: flex-start;
    align-items: center;
  }
</style>
