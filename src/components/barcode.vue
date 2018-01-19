<template>
  <div>
    <div class="bcid" id="barcode">
      <div style="height:40%"></div>
      <p class="tip">{{ $t('...载入中...') }}</p>
    </div>
    <footer>
      <div class="fbt" @click="back">{{ $t('取　消') }}</div>
      <div class="fbt" @click="scanPicture">{{ $t('从相册选择二维码') }}</div>
    </footer>
  </div>
</template>
<script>
  import {plusready} from 'common/plus'
  export default {
    data(){
      return {
        wo: null,
        scan: null
      }
    },
    created(){
      plusready(this.plusready);
    },
    methods: {
      plusready(){
        this.scan = new plus.barcode.Barcode("barcode");
        this.scan.onmarked = this.onmarked;
        this.scan.start({conserve: true, filename: '_doc/barcode/'});
        let self = this;
        mui.back = ()=>{
          if(this.scan){
            self.scan.close();
            self.back();
          }
        }
      },
      onmarked(type, result, file){
        switch (type) {
          case plus.barcode.QR:
            type = 'QR';
            break;
          case plus.barcode.EAN13:
            type = 'EAN13';
            break;
          case plus.barcode.EAN8:
            type = 'EAN8';
            break;
          default:
            type = this.$t('其它') + type;
            break;
        }
        result = result.replace(/\n/g, '');
        this.$emit('getCodeNum', result);
        this.scan.close();
      },
      back(){
        this.$emit('getCodeNum');
        this.scan.close();
      },
      scanPicture(){
        let self = this;
        plus.gallery.pick(function (path) {
          plus.barcode.scan(path, self.onmarked, function (error) {
            plus.nativeUI.alert(this.$t('无法识别此图片'));
          });
        }, function (err) {
          console.log('Failed: ' + err.message);
        });
      }
    }
  }
</script>

<style scoped>
  .bcid {
    width: 100%;
    position: absolute;
    top: 0;
    bottom: 44px;
    text-align: center;
    background-color: #000000;
  }

  .tip {
    color: #FFFFFF;
    font-weight: bold;
    text-shadow: 0 -1px #103E5C;
  }

  footer {
    width: 100%;
    height: 44px;
    position: absolute;
    bottom: 0;
    line-height: 44px;
    text-align: center;
    color: #FFF;
  }

  .fbt {
    width: 50%;
    height: 100%;
    background-color: #FFCC33;
    float: left;
  }

  .fbt:active {
    -webkit-box-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.5);
    box-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.5);
  }
</style>
