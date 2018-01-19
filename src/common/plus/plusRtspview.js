/**
 * Created by century on 2017/7/26.
 */

class RtspView {
  static B = null;
  static _VIDEOCODE = '';

  constructor(val) {
    this.B = window.plus.bridge;
    //'RtspView'    'EZactive'
    this._VIDEOCODE = val;
  }

  ViewInit(Argus, successCallback, errorCallback) {
    let success = typeof successCallback !== 'function' ? null : function (args) {
        successCallback(args);
      },
      fail = typeof errorCallback !== 'function' ? null : function (code) {
        errorCallback(code);
      };
    let callbackID = this.B.callbackId(success, fail);
    return this.B.exec(this._VIDEOCODE, "ViewInit", [callbackID, Argus]);
  }

  setToken(Argus, successCallback, errorCallback) {
    let success = typeof successCallback !== 'function' ? null : function (args) {
        successCallback(args);
      },
      fail = typeof errorCallback !== 'function' ? null : function (code) {
        errorCallback(code);
      };
    let callbackID = this.B.callbackId(success, fail);
    return this.B.exec(this._VIDEOCODE, "setToken", [callbackID, Argus]);
  }

  setAppkey(Argus, Argus1, successCallback, errorCallback) {
    let success = typeof successCallback !== 'function' ? null : function (args) {
        successCallback(args);
      },
      fail = typeof errorCallback !== 'function' ? null : function (code) {
        errorCallback(code);
      };
    let callbackID = this.B.callbackId(success, fail);
    return this.B.exec(this._VIDEOCODE, "setAppkey", [callbackID, Argus, Argus1]);
  }

  ViewPlay([Argus, Argus1], successCallback, errorCallback) {
    let success = typeof successCallback !== 'function' ? null : function (args) {
        successCallback(args);
      },
      fail = typeof errorCallback !== 'function' ? null : function (code) {
        errorCallback(code);
      };
    let callbackID = this.B.callbackId(success, fail);
    return this.B.exec(this._VIDEOCODE, "ViewPlay", [callbackID, Argus, Argus1]);
  }

  changeCurrentChannel([Argus, Argus1], successCallback, errorCallback) {
    let success = typeof successCallback !== 'function' ? null : function (args) {
        successCallback(args);
      },
      fail = typeof errorCallback !== 'function' ? null : function (code) {
        errorCallback(code);
      };
    let callbackID = this.B.callbackId(success, fail);
    return this.B.exec(this._VIDEOCODE, "changeCurrentChannel", [callbackID, Argus, Argus1]);
  }

  removeViedo() {
    return this.B.execSync(this._VIDEOCODE, "removeViedo", []);
  }

  /*
   * 下滑展示视频
   * */
  bottomMonitor() {
    return this.B.execSync(this._VIDEOCODE, "bottomMonitor", []);
  }

  /*
   * 上滑隐藏视频
   * */
  topMonitor() {
    return this.B.execSync(this._VIDEOCODE, "topMonitor", []);
  }
}

export default RtspView
