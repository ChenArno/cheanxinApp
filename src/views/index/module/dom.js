/**
 * Created by century on 2017/7/25.
 */
import Plugin from 'common/plus/plusPlugIn'
import sql from 'common/data/websql'
import store from 'store'
import {plusToast} from 'common/plus'
import {showLongTime} from 'utils/validate'

const gs = {
  subView: null,
  cw: null,
  bodyHeight: 0,
  lists: [],
  info: null,
  setBottom(state){
    this.cw = plus.webview.currentWebview();
    this.bodyHeight = plus.screen.resolutionHeight * 1;
    let option = {};
    if (state) {
      option = mui.os.ios ? {bottom: '0'} : {top: '0', height: this.bodyHeight + 'px'}
      this.subView.setStyle(option);
      store.commit('set_backState', false);
    } else {
      let reduceH = mui.os.ios ? parseInt(plus.storage.getItem('_BarHeight')) : 0
      option = mui.os.ios ? {bottom: '52px'} : {top: '0', height: (this.bodyHeight - 52 - reduceH) + 'px'}
      this.subView.setStyle(option);
      store.commit('set_backState', true);
    }
  },
  ryServer(targetId, time, info, data, isFlag){
    switch (info) {
      case 'text':
        info = data;
        break;
      case 'image':
        info = "[" + this.$t('图片') + "]";
        break;
      case 'sound':
        info = "["+this.$t('语音')+ "]";
        break;
      case 'File':
        info = "["+this.$t('文件')+ "]";
        break;
      default:
        info = "["+this.$t('其他')+ "]";
        break;
    }
    let num = null;
    if (store.getters.TopView) {
      num = 0;
    }
    if (isFlag != null) {//收
      time = showLongTime(parseInt(time));
      this.saveMsgList(targetId, time, info, num);
    } else {  //发
      time = showLongTime(new Date().getTime());
      this.saveMsgList(targetId, time, info, 0);
    }
  },
  saveMsgList(targetId, time, info, num){
    let iflag = true;
    let newList = store.getters.signleList;
    newList.map((val, i) => {   //修改聊天记录
      if (val.id == targetId) {
        val.cont = info;
        if (num != null) {
          val.num = 0;
        } else {
          val.num = parseInt(val.num) + 1;
          if (val.num >= 99) {
            val.num = 99;
          }
        }
        val.time = time;
        if (i > 0) {
          let removed = newList.splice(i, 1);
          newList.splice(0, 0, removed[0]);
          store.commit('set_signleList', newList);
        }
        this.updateOrInsertList(val, true);
        iflag = false;
      }
    })
    if (iflag) { //新增聊天记录
      this.lists.push(targetId);
      this.newCreate(targetId, time, info, num);
    }
  },
  newCreate(targetId, time, info, num){
    let self = this;
    let iflag = true;
    new sql().select('user_info', "*", "ryId = ?", [targetId], (rows) => {
      if (!rows) return;
      let newMessage = {
        id: targetId,
        cont: info,
        name: rows.item(0).shortLabel,
        icon: rows.item(0).avatarUrl,
        time
      };
      newMessage.num = (num !== null) ? 0 : 1
      let newList = store.getters.signleList;
      newList.map((val, i) => {
        if (val.id == targetId) {
          this.lists = this.lists.filter(v => {
            if (v == val.id) return v;
            return false
          })
          if ((num === null)) {
            newMessage.num = this.lists.length;
            if (newMessage.num >= 99) {
              newMessage.num = 99;
            }
          }
          newList.splice(i, 1, newMessage);
          store.commit('set_signleList', newList);
          this.updateOrInsertList(newMessage, true);
          iflag = false;
        }
      });
      if (iflag) {
        newList.splice(0, 0, newMessage);
        store.commit('set_signleList', newList);
        self.updateOrInsertList(newMessage);
      }
    });
  },
  updateOrInsertList(obj, Iflag) {  //	更新消息列表
    if (!obj) return
    if (!Iflag) {
      if (obj.id === undefined) return
      new sql().insertTable('user_list',
        ['id', 'name', 'icon', 'cont', 'num', 'time'],
        [obj.id, obj.name, obj.icon, obj.cont, obj.num, obj.time], () => {
        });
    } else {
      new sql().updateTable('user_list',
        ['name', 'icon', 'cont', 'num', 'time'],
        [obj.name, obj.icon, obj.cont, obj.num, obj.time], "id=?", [obj.id]);
    }
  },
  setTopview(val){
    store.commit('set_TopView', val);
  },
  enterRoom(id){
    new sql().select('user_info', "*", "ryId = ?", [id], function (rows) {
      if (rows.length > 0) {
        new Plugin().OpenRyView(id, rows.item(0).shortLabel, rows.item(0).avatarUrl, res => {
          store.commit('set_TopView', true);
          let info = plus.webview.getWebviewById('info.html');
          info && info.close();
        }, err => err);
      }
    });
  },
  menuChange(val){
    store.commit('SET_BACKIMG', val)
  }
}

window.gs = gs;
