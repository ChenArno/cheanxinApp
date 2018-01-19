/**
 * Created by century on 2017/8/11.
 */
import store from 'store'
import {i18n} from 'store'
class Push {
  constructor() {
    this.pushListener();
  }

  /**
   *
   * 推送的监听
   */
  pushListener() {
    let pointer = this;
    plus.push.addEventListener("click", function (msg) {
      switch (msg.payload) {
        case "LocalMSG":
          mui.toast(i18n.translate("点击本地创建消息启动")+'： ');
          break;
        default:
          break;
      }
      store.commit('SET_NOTICE',1); //切换页面
      pointer.handle();
    }, false);
    plus.push.addEventListener("receive", function (msg) {
      if (msg.aps) { // Apple APNS message
        //"接收到在线APNS消息：";
        // alert(JSON.stringify(msg));
        // pointer.handle();
      } else {
        //接收到在线透传消息：";
      }
      if (plus.os.name == 'iOS') {
        if (msg.payload) {
          pointer.noticeRouter(msg.payload);
        }
      } else {
        pointer.noticeRouter(msg.payload);
      }
    }, false);
  }

  /*
   * 根据监听消息跳转业务
   * */
  noticeRouter(payload) {
    let jsonData = '';
    switch (plus.os.name) {
      case "Android":
        jsonData = JSON.parse(payload).msgCode
        break;
      case "iOS":
        jsonData = payload.msgCode;
        break;
    }
    // mui.toast(jsonData)
    if (jsonData == 'msg004') {  //展保

    }
  }

  /**
   * 根据推送消息在通知栏中显现对应的提示
   * @param {Object} msg
   */
  notificationMessage(msg) {
    let content = '';//你要展示的提示
    let pointer = this;
    let jsonData = '';
    switch (plus.os.name) {
      case "Android":
        jsonData = eval("(" + msg.payload + ")");
        break;
      case "iOS":
        jsonData = msg.payload;
        break;
    }
    pointer.createLocalPushMsg(msg, jsonData, content);
  }

  /**
   *  处理透传消息
   * @param {Object} msg
   * @param {Object} content
   */
  createLocalPushMsg(msg, content) {
    //创建一个符合你自己要显示推送通知
    alert(msg + "//" + content);
    let options = {
      title: msg.title,
      cover: true,
    }
    this.createMessage(str, 'LocalMSG', options);
  }

  /**
   *  创建本地推送消息
   * @param {Object} str
   * @param {Object} jsonData
   * @param {Object} options
   */
  createMessage(str, jsonData, options) {
    // switch (plus.os.name) {
    //   case "Android":
    //     jsonData = jsonData;
    //     break;
    //   case "iOS":
    //     jsonData = jsonData.eid;
    //     break;
    // }
    plus.push.createMessage(str, jsonData, options);
  }

  /**
   * 处理通知方法
   * @param {Object} msg
   */
  handle() {
    //清除ios推送小红点
    // plus.runtime.setBadgeNumber(0);
    setTimeout(()=>{
      this.setGtBadge4IOS();
    },3000);
    // plus.push.clear();
  }

  /**
   * 个推同步服务器角标
   * @param {Object} badge
   */
  setGtBadge4IOS() {
    if (mui.os.ios) {
      let GeTuiSdk = plus.ios.importClass('GeTuiSdk');
      GeTuiSdk.setBadge(0);
    }
  }

  setPlusBadge(key, key_number, total_number) {
    plus.storage.setItem(key, key_number.toString()); // 数字转字符串
    plus.storage.setItem("badge_total_number", total_number.toString());

    // 设置APP图标的角标
    plus.runtime.setBadgeNumber(total_number);
  }

  /**
   * 角标增长
   * @param {String} key  键值
   * @param {Number} step 增长值
   */
  setInc(key, step) {
    key = "badge_" + key;
    let total_number = plus.storage.getItem("badge_total_number");
    let key_number = plus.storage.getItem(key);
    total_number = parseInt(total_number); // 字符串转数字
    key_number = parseInt(key_number);
    if (!key_number) key_number = 0;
    if (!total_number) total_number = 0;
    key_number = key_number + step;
    total_number = total_number + step;

    this.setPlusBadge(key, key_number, total_number);
  }

  /**
   * 角标减少
   * @param {String} key  键值
   * @param {Number} step 减少值
   */
  setDec(key, step) {
    key = "badge_" + key;
    let total_number = plus.storage.getItem("badge_total_number");
    let key_number = plus.storage.getItem(key);
    total_number = parseInt(total_number);
    key_number = parseInt(key_number);
    if (!key_number) key_number = 0;
    if (!total_number) total_number = 0;
    key_number = key_number - step;
    total_number = total_number - step;

    if (key_number < 0) key_number = 0;
    if (total_number < 0) total_number = 0;

    this.setPlusBadge(key, key_number, total_number);
  }

  /**
   * 根据key获取对应的角标值
   * @param {String} key
   */
  getBadgeNumber(key) {
    key = "badge_" + key;
    let key_number = plus.storage.getItem(key);
    key_number = parseInt(key_number);

    if (!key_number) key_number = 0;
    return key_number;
  }

  removeBadgeNumber(key) {
    key = "badge_" + key;
    let total_number = plus.storage.getItem("badge_total_number");
    let key_number = plus.storage.getItem(key);
    total_number = parseInt(total_number);
    key_number = parseInt(key_number);
    if (!key_number) key_number = 0;
    if (!total_number) total_number = 0;
    total_number = total_number - key_number;

    if (total_number < 0) total_number = 0;

    plus.storage.removeItem(key);
    plus.storage.setItem("badge_total_number", total_number.toString());

    // 设置APP图标的角标
    plus.runtime.setBadgeNumber(total_number);
  }
}
export default Push
