<template>
  <div class="tj-foot">
    <x-header :left-options="{backText: '',preventGoBack:true}" @on-click-back="cw.close()">{{ $t('关于我们') }}</x-header>
    <div class="a-logo">
      <img :src="require('assets/img/aboutLogo.png')">
    </div>
    <div class="a-ver">
      <divider class="a-ver-cell">{{ $t('版本号') }}:{{version}}</divider>
    </div>
    <div class="a-introduce">
      &nbsp;&nbsp;&nbsp;&nbsp;
      {{ $t('思创医惠科技股份有限公司成立于2003年11月,2010年4月在深圳创业板上市(股票代码300078),是一家专业从事电子商品防盗(EAS)、无线射频识别系统(RFID)定制化产品及行业应用解决方案的开发与服务的高科技企业，是全球零售支持领域新理念的开拓者和引领者。')}}
      <br/>
      &nbsp;&nbsp;&nbsp;&nbsp;{{ $t('公司拥有总资产12亿，员工1500余人，在香港、瑞典、意大利、西班牙美国多个国家建立子公司，是全球零售系统解决方案领域的龙头企业和最具规模的生产基地之一。产品远销至世界各地，获得来自70多个国家客户的信赖与好评。')}}
    </div>
  </div>
</template>
<i18n>
版本号:
  en: Version
思创医惠科技股份有限公司成立于2003年11月,2010年4月在深圳创业板上市(股票代码300078),是一家专业从事电子商品防盗(EAS)、无线射频识别系统(RFID)定制化产品及行业应用解决方案的开发与服务的高科技企业，是全球零售支持领域新理念的开拓者和引领者。:
  en: Century Group set up in Nov,2003 and Public on Shenzhen Stock Market in April, 2010(Stock Code 300078),which Specialized in EAS、RFID and solution development and service , also is the leader of global retail development .
公司拥有总资产12亿，员工1500余人，在香港、瑞典、意大利、西班牙美国多个国家建立子公司，是全球零售系统解决方案领域的龙头企业和最具规模的生产基地之一。产品远销至世界各地，获得来自70多个国家客户的信赖与好评。:
  en: The company has total assets of 1.2 billion, around 1500 staffs, which set up subsidiaries in many countries include Hong Kong, Sweden, Italy, Spain, the United States , is a leading enterprise in the field of global retail system solutions and one of the largest production base.Our products have been exported to all over the world, and we have received the trust and praise from more than 70 countries.
</i18n>
<script>
  import {Divider} from 'vux'
  import {plusready} from 'common/plus'
  export default {
    data(){
      return {
        version: '1.0.0',
        cw:null
      }
    },
    created(){
      plusready(this.plusready);
    },
    components: {
      Divider
    },
    methods: {
      plusready(){
        let self = this;
        this.cw = plus.webview.currentWebview();
        plus.runtime.getProperty(plus.runtime.appid, function (inf) {
          self.version = inf.version;
        });
      }
    }
  }
</script>

<style scoped>
  .tj-foot {
    height: 100%;
  }

  .a-logo {
    height: 2.8rem;
    text-align: center;
    margin-top: 1rem;
  }

  .a-logo img {
    width: 3.3rem;
    height: 2.55rem;
  }

  .a-ver {
    width: 100%;
  }

  .a-ver-cell {
    width: 50%;
    margin-left: 25%;
    color: #999899;
  }
  .a-introduce{
    padding: .5rem 0.31rem 0;
    font-size: .28rem;
    color: #666666;
  }
</style>
