/**
 * Created by century on 2017/7/26.
 */
class PlugIn {
  static B = null;
  static _ARNOCODE = '';

  constructor() {
    this.B = window.plus.bridge;
    this._ARNOCODE = 'PlugIn';
  }

  Bug5497() {
    return this.B.execSync(this._ARNOCODE, "Bug5497", []);
  }

  setUserInfo(Argus) {
    return this.B.execSync(this._ARNOCODE, "setUserInfo", [Argus]);
  }

  AccordinPlay(successCallback, errorCallback) {
    let success = typeof successCallback !== 'function' ? null : function (args) {
        successCallback(args);
      },
      fail = typeof errorCallback !== 'function' ? null : function (code) {
        errorCallback(code);
      };
    let callbackID = this.B.callbackId(success, fail);
    return this.B.exec(this._ARNOCODE, "AccordinPlay", [callbackID]);
  }

  hiddenPlay(successCallback, errorCallback) {
    let success = typeof successCallback !== 'function' ? null : function (args) {
        successCallback(args);
      },
      fail = typeof errorCallback !== 'function' ? null : function (code) {
        errorCallback(code);
      };
    let callbackID = this.B.callbackId(success, fail);
    return this.B.exec(this._ARNOCODE, "hiddenPlay", [callbackID]);
  }

  RYconnect(Argus, successCallback, errorCallback) {
    let success = typeof successCallback !== 'function' ? null : function (args) {
        successCallback(args);
      },
      fail = typeof errorCallback !== 'function' ? null : function (code) {
        errorCallback(code);
      };
    let callbackID = this.B.callbackId(success, fail);
    return this.B.exec(this._ARNOCODE, "RYconnect", [callbackID, Argus]);
  }

  getUserInfoCache(Argus1, Argus2, Argus3) {
    return this.B.execSync(this._ARNOCODE, "getUserInfoCache", [Argus1, Argus2, Argus3]);
  }

  OpenRyView(Argus1, Argus2, Argus3, successCallback, errorCallback) {
    let success = typeof successCallback !== 'function' ? null : function (args) {
        successCallback(args);
      },
      fail = typeof errorCallback !== 'function' ? null : function (code) {
        errorCallback(code);
      };
    let callbackID = this.B.callbackId(success, fail);
    return this.B.exec(this._ARNOCODE, "OpenRyView", [callbackID, Argus1, Argus2, Argus3]);
  }

  RYlogout() {
    return this.B.execSync(this._ARNOCODE, "RYlogout", []);
  }

  checkUpdate(successCallback, errorCallback) {
    let success = typeof successCallback !== 'function' ? null : function (args) {
        successCallback(args);
      },
      fail = typeof errorCallback !== 'function' ? null : function (code) {
        errorCallback(code);
      };
    let callbackID = this.B.callbackId(success, fail);
    return this.B.exec(this._ARNOCODE, "checkUpdate", [callbackID]);
  }
  updateNew(){
    let success = typeof successCallback !== 'function' ? null : function (args) {
        successCallback(args);
      },
      fail = typeof errorCallback !== 'function' ? null : function (code) {
        errorCallback(code);
      };
    let callbackID = this.B.callbackId(success, fail);
    return this.B.exec(this._ARNOCODE, "updateNew", [callbackID]);
  }

  checkVersion(successCallback, errorCallback) {
    let success = typeof successCallback !== 'function' ? null : function (args) {
        successCallback(args);
      },
      fail = typeof errorCallback !== 'function' ? null : function (code) {
        errorCallback(code);
      };
    let callbackID = this.B.callbackId(success, fail);
    return this.B.exec(this._ARNOCODE, "checkVersion", [callbackID]);
  }

  //清空会话缓存数据
  removeConversation(Argus1, successCallback, errorCallback) {
    let success = typeof successCallback !== 'function' ? null : function (args) {
        successCallback(args);
      },
      fail = typeof errorCallback !== 'function' ? null : function (code) {
        errorCallback(code);
      };
    let callbackID = this.B.callbackId(success, fail);
    return this.B.exec(this._ARNOCODE, "removeConversation", [callbackID, Argus1]);
  }
  //选择框
  selectArea(Argus, successCallback, errorCallback) {
    let success = typeof successCallback !== 'function' ? null : function (args) {
        successCallback(args);
      },
      fail = typeof errorCallback !== 'function' ? null : function (code) {
        errorCallback(code);
      };
    let callbackID = this.B.callbackId(success, fail);
    return this.B.exec(this._ARNOCODE, "selectArea", [callbackID, Argus]);
  }
}
export default PlugIn
