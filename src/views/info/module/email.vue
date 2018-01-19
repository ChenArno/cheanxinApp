<template>
  <div class="tj-foot">
    <x-header :left-options="{backText: '',preventGoBack:true}" @on-click-back="cw.close()">{{ $t('反馈意见') }}
      <i slot="right" @click="contact" class="tj-submit">{{ $t('提交') }}</i>
    </x-header>
    <group>
      <x-textarea :max="100" :placeholder="$t('请填写您的意见或建议') + '……'" v-model="cont"></x-textarea>
    </group>
  </div>
</template>
<i18n>
请填写您的意见或建议:
  en: Please fill in your comments or suggestions
</i18n>
<script>
  import {XTextarea} from 'vux'
  export default {
    components: {
      XTextarea
    },
    data(){
      return {
        cont: '',
        cw: null
      }
    },
    created(){
      mui.plusReady(this.pluseready)
    },
    methods: {
      pluseready(){
        this.cw = plus.webview.currentWebview();
      },
      contact(){

      }
    }
  }
</script>

<style scoped>
</style>
