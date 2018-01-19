
class Storage {
  constructor() {
  }

  clearToken() {  //慎用
    plus.storage.clear();
  }

  getToken() {
    if (arguments.length == 0) return plus.storage.getItem('_token');
    if (arguments[0] === "") return plus.storage.removeItem('_token');
    let data = arguments[0];
    if (typeof data === 'number') {
      data = data.toString();
    }
    return plus.storage.setItem('_token', data);
  }

  getUserInfo() {
    if (arguments.length == 0) return JSON.parse(plus.storage.getItem('_UserInfo'));
    if (arguments[0] === "") {
      this.getToken('');
      return plus.storage.removeItem('_UserInfo');
    }
    let data = arguments[0];
    if (typeof data === 'object') {
      this.getToken(data.accountToken);
      data = JSON.stringify(data);
    }
    plus.storage.setItem('_UserInfo', data);
  }

  getBarHeight() {
    if (arguments.length == 0) return plus.storage.getItem('_BarHeight');
    if (arguments[0] === "") return plus.storage.removeItem('_BarHeight');
    let height = plus.navigator.isImmersedStatusbar() ? plus.navigator.getStatusbarHeight() : 0;
    plus.storage.setItem('_BarHeight',height + 'px');
  }

  getMsgCode(){
    if (arguments.length == 0) return plus.storage.getItem('_msgCode');
    if (arguments[0] === "") return plus.storage.removeItem('_msgCode');
    plus.storage.setItem('_msgCode','OK');
  }
}

export default Storage
