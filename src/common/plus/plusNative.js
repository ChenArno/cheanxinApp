/**
 * Created by century on 2017/7/31.
 */
import plusViedo from './plusRtspview'
import {plusConfirm} from 'common/plus'
import {i18n} from 'store'


class PlusNative {
  static RtspView = '';
  static type = "";

  constructor(val) {
    this.type = val;
    this.RtspView = new plusViedo(val);
    this.RtspView.ViewInit(this.top());
  }

  static w = null;

  top() {
    return parseInt(plus.storage.getItem('_BarHeight')) + 47;
  }

  setToken(val) {
    if (this.type == "EZactive") {
      this.RtspView.setToken(val);
    }
  }

  static view = null;

  firstPlay() {
    return new Promise((resolve, reject) => {
      switch (plus.networkinfo.getCurrentType()) {
        case plus.networkinfo.CONNECTION_ETHERNET:
        case plus.networkinfo.CONNECTION_WIFI:
          resolve();
          break;
        default:
          plusConfirm(i18n.translate('当前网络为非wifi网络，是否确认播放')).then(res => {
            resolve();
          }).catch(err => err);
          break;
      }
    })
  }

  playVideo(url, status, playType) {
    switch (status) {
      case 1:
        this.RtspView.ViewPlay([url,playType], x => {
          this.view = true;
        }, e => e);
        break;
      case 2:
        if (!this.view) {
          this.playVideo(url, 1,playType);
          return;
        }
        this.RtspView.changeCurrentChannel([url,playType], (x) => {
          this.view = true
        }, () => {
        });
        break;
      case 3:
        this.RtspView.removeViedo();
        break;
      default:
        break;
    }
    // if (mui.os.ios) {
    //   this._iosPlay(url, status, playType);
    //   return;
    // }
    // this._androidPaly(url, status, playType);
  }

  // _iosPlay(url, status) {
  //   let notiClass = null;
  //   switch (status) {
  //     case 1:
  //       notiClass = plus.ios.importClass("NSNotificationCenter");
  //       notiClass.defaultCenter().postNotificationNameobject("StartNativeRTSPPlayer", url);
  //       this.view = true;
  //       break;
  //     case 2:
  //       if (!this.view) {
  //         this.playVideo(url, 1);
  //         return;
  //       }
  //       notiClass = plus.ios.importClass("NSNotificationCenter");
  //       notiClass.defaultCenter().postNotificationNameobject("ChangeNativeRTSPPlayer", url);
  //       break;
  //     case 3:
  //       notiClass = plus.ios.importClass("NSNotificationCenter");
  //       notiClass.defaultCenter().postNotificationNameobject("EndNativeRTSPPlayer", null);
  //       break;
  //     default:
  //       break;
  //   }
  // }
  _iosPlay(url, status, playType) {
    switch (status) {
      case 1:
        this.RtspView.ViewPlay([url,playType], x => {
          this.view = true;
        }, e => e);
        break;
      case 2:
        if (!this.view) {
          this.playVideo(url, 1,playType);
          return;
        }
        this.RtspView.changeCurrentChannel([url,playType], (x) => {
          this.view = true
        }, () => {
        });
        break;
      case 3:
        this.RtspView.removeViedo();
        break;
      default:
        break;
    }
  }


  _androidPaly(url, status, playType) {
    switch (status) {
      case 1:
      // this.RtspView.toUrl(url, x => x, err => err);
      // break;
      case 2:
        this.RtspView.ViewPlay([url,playType], (x) => {
          this.view = x
        }, () => {
        });
        break;
      case 3:
        this.RtspView.removeViedo();
        break;
      default:
        break;
    }
  }

  showMonitor() {
    this.RtspView.bottomMonitor();
  }

  hideMonitor() {
    this.RtspView.topMonitor();
  }
}
export default PlusNative;
