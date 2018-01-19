/**
 * Created by century on 2017/8/8.
 */
import Storage from './storage'
import Sql from './websql'
import Plugin from '../plus/plusPlugIn'
import store from 'store'

class Cache {
  static imgUrl = "";

  constructor(val) {
    this.imgUrl = store.getters.fileSave;
    if (val)return;
    this._dateBase();
    this._removeInfo();
    this.clearShop();
  }

  //数据库清理
  _dateBase() {
    localStorage.removeItem("user_info");
    this.clearBase();
  }

  _removeInfo() {
    new Storage().getUserInfo('');
    new Storage().getToken('');
    store.commit('SET_LASTUPDATETIME', "");
  }

  clearImg() {
    plus.nativeUI.showWaiting('正在清理中...请稍候');
    plus.io.resolveLocalFileSystemURL(this.imgUrl, (file) => {
      file.removeRecursively(function (entry) {
        mui.toast("清除图片成功");
        plus.nativeUI.closeWaiting();
      }, function (e) {
        mui.toast("remove faile " + e.message);
        plus.nativeUI.closeWaiting();
      });
    }, (x) => {
      plus.nativeUI.closeWaiting();
    });
  }

  clearBase() {
    let sql = new Sql();
    sql.select('user_list', "id", "", [], (rows) => {
      if (rows.length == 0) return;
      for (let i = 0; i < rows.length; i++) {
        new Plugin().removeConversation(rows.item(i).id, function (x) {
        }, function () {
        });
      }
      sql.execSql('Delete from user_list where 1=1', [], () => {
      });
    })
    sql.execSql('Delete from user_info where 1=1', [], () => {
    });
  }

  clearShop(){
    localStorage.removeItem('_defalutDep');
    localStorage.removeItem('_defalutArea');
  }
}

export default Cache
