/**
 * Created by century on 2017/11/6.
 */
import {i18n} from 'store'
import {querySystemBySysCode} from 'api/Initialize'
import {plusConfirm} from './index'
// import PlugIn from 'common/plus/plusPlugIn'

// ......
// 获取本地应用资源版本号
class AppUpdate {
  static wgtVer = "";
  static wgtUrl = "";

  // static plugIn = null;

  constructor() {
    // this.plugIn = new PlugIn();
    if (!mui.os.ios) return;
    this.wgtUrl = `https://www.century.shop/downloads/H52020D4A.wgt`;
    this.getProperty();
  }

  toNum(a) {
    var a = a.toString();
    //也可以这样写 var c=a.split(/\./);
    var c = a.split('.');
    var num_place = ["", "0", "00", "000", "0000"], r = num_place.reverse();
    for (var i = 0; i < c.length; i++) {
      var len = c[i].length;
      c[i] = r[len] + c[i];
    }
    var res = c.join('');
    return res;
  }

  cpr_version(a, b) {
    var _a = this.toNum(a), _b = this.toNum(b);
    if (_a == _b) return false;
    if (_a > _b) return false;
    if (_a < _b) return true;
  }

  getProperty() {
    plus.runtime.getProperty(plus.runtime.appid, (inf) => {
      this.wgtVer = inf.version;
      // this.plugIn.setUserInfo("当前应用版本：" + this.wgtVer);
      this.checkUpdate()
    });
  }

  checkUpdate() {
    querySystemBySysCode().then(res => {
      // this.plugIn.setUserInfo("请求后台结果：" + JSON.stringify(res));
      if (this.wgtVer && res.data && res.data.sysVersion) {
        if (this.cpr_version(this.wgtVer, res.data.sysVersion)) {
          plusConfirm(i18n.translate('发现新版本')).then(res => {
            mui.toast(i18n.translate("后台更新中，请等待"));
            this.downWgt();  // 下载升级包
          }).catch(err => err);
        }
      }
    });
  }

  // 下载wgt文件
  downWgt() {
    plus.nativeUI.showWaiting(i18n.translate("下载wgt文件")+'...');
    plus.downloader.createDownload(this.wgtUrl, {filename: "_doc/update/", retryInterval: 1}, (d, status) => {
      if (status == 200) {
        this.installWgt(d.filename); // 安装wgt包
      } else {
        plus.nativeUI.alert(i18n.translate("下载wgt失败")+'！');
      }
      plus.nativeUI.closeWaiting();
    }).start();
  }

  installWgt(path) {
    plus.nativeUI.showWaiting(i18n.translate("安装wgt文件")+'...');
    plus.runtime.install(path, {}, () => {
      plus.nativeUI.closeWaiting();
      plus.nativeUI.alert(i18n.translate("应用资源更新完成")+'！', function () {
        plus.runtime.restart();
      });
    }, (e) => {
      plus.nativeUI.closeWaiting();
      plus.nativeUI.alert(i18n.translate("安装wgt文件失败")+'[' + e.code + "]：" + e.message);
    });
  }

}

export default AppUpdate
