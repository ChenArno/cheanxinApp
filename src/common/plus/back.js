/**
 * Created by century on 2017/7/26.
 */
import store from 'store'
import Router from 'vue-router'
import Vue from 'vue'
import Plugin from 'common/plus/plusPlugIn'
import {plusready} from 'common/plus'
Vue.use(Router)
const router = new Router();
class Back {
  static state = false;
  static cw = null;

  constructor() {
    if (!window.plus) return;
    this.cw = plus.webview.currentWebview();
    // if (mui.os.ios) return;
  }

  _resize() {
    if (!window.plus) return;
    //获取原始窗口的高度
    let self = this;
    window.onresize = function () {
      if (store.getters.backState || self.cw.type !== 'home') return;
      //软键盘弹起与隐藏  都会引起窗口的高度发生变化
      let resizeHeight = document.documentElement.clientHeight || document.body.clientHeight;
      let NormHeight = plus.screen.resolutionHeight - parseInt(plus.storage.getItem('_BarHeight'));
      if (resizeHeight * 1 < (NormHeight * 1 - 52)) { //软键盘引起的resizeHeight<originalHeight证明窗口被挤压了
        self.cw.setStyle({
          height: NormHeight
        });
      }
    }
  }

  _rightAddevent() {
    if (!mui.os.ios) return
    let self = this;
    document.addEventListener('touchstart', (e) => {
      self.moveY = e.targetTouches[0].pageY;
    })
    document.addEventListener('touchmove', (e) => {
      e.preventDefault();
      let moveWidth = self.moveY - e.targetTouches[0].pageY;
      if (moveWidth !== 0) {
        document.body.scrollTop += moveWidth;
      }
    })
  }

  muiBack() {
    if (!mui.os.ios) {
      this._resize();
      new Plugin().Bug5497();
    }
    mui.back = function () {
      router.go(-1);
    }
  }

  backRouter(val) {
    if (!window.plus) return;
    let module = store.getters.defalutApp && store.getters.defalutApp.moduleType;
    if (!module) return;
    if (this.cw && this.cw.id.indexOf(module) > -1) {
      let tag = `_${this.cw.id.split('.html')[0]}${val}`;
      let tagNum = sessionStorage.getItem(tag) * 1;  //获取当前缓存路由
      if (tagNum != 1) return;
      plus.webview.getWebviewById('index.html').evalJS(`gs.setBottom(false)`);
    }
  }

  setBottom(val) {
    document.activeElement.blur();//软键盘收回
    if (this.cw && (this.cw.type !== "home")) {
      if (!val) router.go(-1);
      return
    }
    setTimeout(() => {
      if (val) {
        this.state = true;
      } else {
        this.state = false;
        router.go(-1);
      }
      plus.webview.getWebviewById('index.html').evalJS(`gs.setBottom(${this.state})`);
    }, 100);
  }
}

export default Back
