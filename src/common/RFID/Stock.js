/**
 * Created by century on 2017/10/21.
 */

class Stock {
  static B = null;
  static _ARNOCODE = '';

  constructor() {
    this.B = window.plus.bridge;
    this._ARNOCODE = 'Stock';
  }

  readSet(successCallback, errorCallback) {
    let success = typeof successCallback !== 'function' ? null : function (args) {
        successCallback(args);
      },
      fail = typeof errorCallback !== 'function' ? null : function (code) {
        errorCallback(code);
      };
    let callbackID = this.B.callbackId(success, fail);
    return this.B.exec(this._ARNOCODE, "readSet", [callbackID]);
  }

  setOption(Argus, successCallback, errorCallback) {
    let success = typeof successCallback !== 'function' ? null : function (args) {
        successCallback(args);
      },
      fail = typeof errorCallback !== 'function' ? null : function (code) {
        errorCallback(code);
      };
    let callbackID = this.B.callbackId(success, fail);
    return this.B.exec(this._ARNOCODE, "setOption", [callbackID, Argus]);
  }

  openBlue(successCallback, errorCallback) {
    let success = typeof successCallback !== 'function' ? null : function (args) {
        successCallback(args);
      },
      fail = typeof errorCallback !== 'function' ? null : function (code) {
        errorCallback(code);
      };
    let callbackID = this.B.callbackId(success, fail);
    return this.B.exec(this._ARNOCODE, "openBlue", [callbackID]);
  }

  searchBlue(successCallback, errorCallback) {
    let success = typeof successCallback !== 'function' ? null : function (args) {
        successCallback(args);
      },
      fail = typeof errorCallback !== 'function' ? null : function (code) {
        errorCallback(code);
      };
    let callbackID = this.B.callbackId(success, fail);
    return this.B.exec(this._ARNOCODE, "searchBlue", [callbackID]);
  }

  contBlue(Argus, successCallback, errorCallback) {
    let success = typeof successCallback !== 'function' ? null : function (args) {
        successCallback(args);
      },
      fail = typeof errorCallback !== 'function' ? null : function (code) {
        errorCallback(code);
      };
    let callbackID = this.B.callbackId(success, fail);
    return this.B.exec(this._ARNOCODE, "contBlue", [callbackID, Argus]);
  }

  onBack(successCallback, errorCallback) {
    let success = typeof successCallback !== 'function' ? null : function (args) {
        successCallback(args);
      },
      fail = typeof errorCallback !== 'function' ? null : function (code) {
        errorCallback(code);
      };
    let callbackID = this.B.callbackId(success, fail);
    return this.B.exec(this._ARNOCODE, "onBack", [callbackID]);
  }

  pause(successCallback, errorCallback) {
    let success = typeof successCallback !== 'function' ? null : function (args) {
        successCallback(args);
      },
      fail = typeof errorCallback !== 'function' ? null : function (code) {
        errorCallback(code);
      };
    let callbackID = this.B.callbackId(success, fail);
    return this.B.exec(this._ARNOCODE, "pause", [callbackID]);
  }

  inventoryStart(Argus, successCallback, errorCallback) {
    let success = typeof successCallback !== 'function' ? null : function (args) {
        successCallback(args);
      },
      fail = typeof errorCallback !== 'function' ? null : function (code) {
        errorCallback(code);
      };
    let callbackID = this.B.callbackId(success, fail);
    return this.B.exec(this._ARNOCODE, "inventoryStart", [callbackID, Argus]);
  }
}

export default Stock
