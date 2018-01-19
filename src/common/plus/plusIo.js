/**
 * Created by century on 2017/8/23.
 */
import Storage from 'common/data/storage'
import md5 from 'js-md5';
import store from 'store'
import {i18n} from 'store'

class PlusIo {
  static fileSave = '';
  static baseURL = '';
  static localDir = 'json';

  constructor() {
    this.localDir = 'json';
    this.fileSave = store.getters.fileSave + 'business/';
    let ip = `${store.getters.ip}:${store.getters.port}`;
    this.baseURL = ip + process.env.MODULE_URL;
  }

  getFIlePath(path){
    return plus.io.convertLocalFileSystemURL('_downloads/json/'+path+'.txt');
  }

  clearFile() {
    return new Promise((resolve, reject) => {
      plus.nativeUI.showWaiting(i18n.translate('正在清理中'));
      plus.io.resolveLocalFileSystemURL(store.getters.fileSave, (file) => {
        file.removeRecursively((entry) => {
          mui.toast(i18n.translate("清除图片成功"));
          plus.nativeUI.closeWaiting();
          resolve();
        }, (e) => {
          mui.toast("remove faile " + e.message);
          plus.nativeUI.closeWaiting();
          reject(e.message);
        });
      }, (err) => {
        plus.nativeUI.closeWaiting();
        reject(err);
      });
    });
  }

  Upload(files, url, data) {
    return new Promise((resolve, reject) => {
      let name = null;
      const task = plus.uploader.createUpload(this.baseURL + url, {
        method: "POST"
      }, (t, status) => {
        if (status == 200) {
          let response = JSON.parse(t.responseText);
          if (response.resultStatus) {
            const imgurl = JSON.parse(t.responseText).data;
            resolve(imgurl);
            return
          }
          reject("resultStatus：" + response.msg);
        } else {
          reject(i18n.translate("错误信息" )+'： '+ status);
        }
      });
      files.map(v => {
        v = v.split("file://")[1];
        v = plus.io.convertAbsoluteFileSystem(v); // 将平台绝对路径转换成本地URL路径
        name = v.substr(v.lastIndexOf('/') + 1);
        task.addFile(v, {
          key: name
        });
      })
      if (data) {
        for (let i in data) {
          task.addData(i, data[i]);
        }
      }
      task.setRequestHeader('AccountToken', new Storage().getToken());
      task.start();
    });
  }

  download(url) {
    return new Promise((reslove, reject) => {
      let time = new Date().getTime();
      const image_md5 = 'down_' + time;
      const local_image_url = this.fileSave + image_md5 + '.png'; // 缓存本地图片url
      url = this.baseURL + url;
      const download_task = plus.downloader.createDownload(url, {
        filename: local_image_url
      }, (download, status) => {
        if (download.state == 4 && status === 200) {
          const newImg = "file://" + plus.io.convertLocalFileSystemURL(local_image_url); // 平台绝对路径
          reslove(newImg);
        } else {
          reject(i18n.translate('下载报错'));
        }
      });
      download_task.setRequestHeader('AccountToken', new Storage().getToken());
      download_task.start();
    });
  }

  removeFile(url) {
    return new Promise((reslove, reject) => {
      plus.io.resolveLocalFileSystemURL(url, function (entry) {  //删除图片
        entry.remove(function (e) {
          reslove();
        }, function (err) {
          reject(JSON.stringify(err))
        });
      }, function (err) {
        reject(JSON.stringify(err))
      });
    })
  }

  getFileUrl(path) {
    return new Promise((reslove, reject) => {
      plus.io.requestFileSystem(plus.io.PUBLIC_DOWNLOADS, (fs) => {
        fs.root.getDirectory(this.localDir, {
          create: true
        }, (entry) => {
          // fs.root是根目录操作对象DirectoryEntry
          entry.getFile(path + '.txt', {
            create: true
          }, (fileEntry) => {
            reslove(fileEntry);
          });
        }, (e) => {
          mui.toast(i18n.translate("打开目录失败")+'： ' + e.message);
          reject();
        });
      }, (e) => {
        mui.toast(i18n.translate("打开文件目录失败")+'： ' + e.message);
        reject();
      });
    })
  }

  readFile(path) {
    return new Promise((reslove, reject) => {
      this.getFileUrl(path).then(fileEntry => {
        fileEntry.file((file) => {
          let fileReader = new plus.io.FileReader();
          // console.log("getFile:" + JSON.stringify(file));
          fileReader.readAsText(file, 'utf-8');
          fileReader.onloadend = function (evt) {
            if (file.size == 0) return reslove(false);
            reslove(JSON.parse(evt.target.result));
          }

          // console.log(file.size + '--' + file.name);
        });
      }, err => {
        reject();
      });
    })
  }

  writeFile(path, data) {
    return new Promise((reslove, reject) => {
      this.getFileUrl(path).then(fileEntry => {
        fileEntry.createWriter((writer) => {
          writer.onwrite = (e) => {
            reslove();
          };
          writer.seek(0);
          writer.write(JSON.stringify(data));
        }, function (e) {
          mui.toast(i18n.translate("写入文件失败")+'： ' + e.message);
          reject();
        });
      }, err => {
        reject();
      });
    })
  }

}

export default PlusIo
