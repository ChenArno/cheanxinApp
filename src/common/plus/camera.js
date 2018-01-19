/**
 * Created by century on 2017/7/27.
 */
import {plusToast} from 'common/plus'
import md5 from 'js-md5';
import store from 'store'
import {i18n} from 'store'
class Camera {
  static cmr = null;
  static fileSave = '';

  constructor() {
    this.fileSave = store.getters.fileSave + 'camera/';
    this.cmr = plus.camera.getCamera();
  }

  captureImage() {
    let self = this;
    return new Promise((resolve, reject) => {
      this.cmr.captureImage((p) => {
        plus.gallery.save(p); //存照片于相册中
        plus.io.resolveLocalFileSystemURL(p, (entry) => {
          entry.file((file) => {
            const filePath = "file://" + file.fullPath;
            resolve(filePath, file);
          });
        }, (e) => {
          plusToast(i18n.translate("读取拍照文件错误")+'：' + e.message);
          reject(e.message);
        });
      }, (err) => {
        reject(err.message);
      }, {
        filename: self.fileSave,
        index: 1
      });
    })
  }

  zip(files) {
    let self = this;
    return new Promise((resolve, reject) => {
      plus.io.resolveLocalFileSystemURL((files, file) => {
        file.getMetadata((entry) => {
          const size = (entry.size > (1000 * 1024)) ? 25 : 40
          console.log(JSON.stringify(entry))
          const image_md5 = md5(files);
          plus.zip.compressImage({
            src: files,
            dst: self.fileSave + image_md5 + '.jpg',
            overwrite: true,
            quality: size
          }, (zip) => {
            return resolve(zip.target);
          }, (err) => {
            mui.toast(i18n.translate('压缩失败')+'！');
            return reject(err.message);
          });
        });
      });
    });
  }


}

export default Camera
