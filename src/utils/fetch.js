/**
 * Created by century on 2017/7/17.
 */
import axios from 'axios'
import store from 'store'
import Storage from 'common/data/storage'
import {plusready, plusToast, plusOpen, plusConfirm} from 'common/plus'

var Promise = require('es6-promise').Promise;
let storage = new Storage();

let ip = `${store.getters.ip}:${store.getters.port}`;
let baseURL = ip + process.env.MODULE_URL;
let timeout = 1000 * 60;
// axios.defaults.headers['Content-type'] = 'application/json; charset=utf-8';
const service = axios.create({
  baseURL,
  timeout
});
service.interceptors.request.use(config => {
  if (process.env.NODE_ENV === "production") {
    if (storage.getToken()) {
      config.headers['AccountToken'] = new Storage().getToken(); // 让每个请求携带token
    }
  } else {
    config.headers['AccountToken'] = 'tj_session_d9a5ed2b-7dfa-4bfc-84bf-b6e30052ad12';
  }
  return config
}, error => {
  console.log("拦截器===>" + error);
  Promise.reject(error);
});

let msg_code = false;
service.interceptors.response.use(response => {
  let code = response.data.status;
  switch (code) {
    case 4000:
    case 4001:
      plusready(() => {
        if (storage.getMsgCode()) return;
        storage.getMsgCode(true);
        plusToast(`msg:${response.data.msg},code:${response.config.msgCode}`);
        plusConfirm(`${response.data.msg}，请重新登陆`).then(() => {
          if (plus.webview.getWebviewById('login.html')) return;
          plusOpen('login.html', 'login.html', true, {module: 'click'});
          let wvs = plus.webview.all();
          let nw = plus.webview.currentWebview();
          wvs.map(val => {
            if ((val.id !== nw.id) && (val.id !== "login.html")) {
              val.close();
            }
          });
          storage.getMsgCode('');
          storage.getToken('');
          setTimeout(() => {
            plus.nativeUI.closeWaiting();
            nw.close();
          }, 1000);
        }).catch(() => {
          storage.getMsgCode('');
        })
      });
      return response.data;
      break;
    case 4003:
    case 4005:
      if (msg_code) return;
      msg_code = true;
      if (response.config.msgCode) {
        plusready(() => {
          plus.nativeUI.alert(`msg:权限不足,请与企业管理人员联系;code:${response.config.msgCode}`, () => {
            msg_code = false;
          }, "提示", "确定");
        })
      }
      return response.data;
      break;
    default:
      break;
  }
  if (!response.data.resultStatus) {
    // let _urls = response.config.url.split('/');
    // let _url = _urls[_urls.length - 1];
    plusToast(response.config.msgCode)
  }
  return response.data
}, err => {
  // plusToast('service ' + err.message);
  return Promise.reject(err);
});

export default service
