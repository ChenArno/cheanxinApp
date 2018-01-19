<template>
  <div class="imgCap-cont">
    <div class="prop">
      <img id="imgCap" :src="ulrSrc"/>
    </div>
    <div class="imgCap-bottom">
      <span class="imgCap-bottom-cell" @click="$emit('submit')"><img
        :src="require('assets/img/icon/cancel.png')"/></span>
      <div class="imgCap-bottom-cell">
        <span class="spin" @click="cropper.rotate(90)"><img :src="require('assets/img/icon/left.png')"/></span>
        <span class="spin" @click="cropper.rotate(-90)"><img :src="require('assets/img/icon/right.png')"/></span>
      </div>
      <span class="imgCap-bottom-cell" @click="getImg()"><img :src="require('assets/img/icon/condim.png')"/></span>
    </div>
  </div>
</template>
<script>
  import Camera from 'common/plus/camera'
  import 'cropperjs/dist/cropper.min.css'
  import Cropper from 'cropperjs'
  import {plusToast} from 'common/plus'
  export default {
    props: ['ulrSrc', 'isRename'],
    data(){
      return {}
    },
    mounted(){
      this.initCropper();
    },
    methods: {
      initCropper(){
        //初始化这个裁剪框
        let image = document.getElementById('imgCap');
        this.cropper = new Cropper(image, {
          aspectRatio: 1 / 1,
          dragMode: 'move',
          autoCropArea: 0.4,
          rotatable: true,
          minCropBoxWidth: 100,
          minCropBoxHeight: 100,
          minCanvasWidth: 200,
          minCanvasHeight: 200,
          minContainerWidth: 200,
          minContainerHeight: 200,
          crop: function (data) {
          }
        });
        plus.nativeUI.closeWaiting();
      },
      getImg(){
        plus.nativeUI.showWaiting();
        let resImg = this.cropper.getCroppedCanvas({
          width: 200,
          height: 200
        }).toDataURL();
        this.saveImg(resImg);
      },
      saveImg(img64){
        let self = this;
        let bitmap = new plus.nativeObj.Bitmap("bit");
        bitmap.loadBase64Data(img64, () => {
          let name = this.isRename ? this.isRename : new Date().getTime()
          bitmap.save(new Camera().fileSave + name + '.jpg', {overwrite:true}, (event) => {
            self.$emit('submit', event.target);
            bitmap.clear();
            bitmap = null;
          }, (e) => {
            plusToast(this.$t('绘制图片失败')+'：' + e.message + " code:" + e.code);
          });
        }, () => {
          plusToast(this.$t('加载Base64图片数据失败'));
        });
      }
    }
  }
</script>

<style scoped>
  .imgCap-cont {
    width: 100%;
    height: 100%;
    background-color: #000;
  }

  .prop {
    max-height: 72vh;
    max-width: 94vw;
    padding: 2rem 3vw 1rem;
  }

  .imgCap-bottom {
    position: fixed;
    bottom: 0;
    height: 44px;
    width: 100%;
    background-color: #262626;
    display: flex;
    justify-content: space-around;
    align-items: center;
  }

  .imgCap-bottom-cell img {
    width: 24px;
  }
</style>
