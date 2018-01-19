import {i18n} from 'store'

const plusready = function (fn) {
  if (window.plus) {
    setTimeout(fn, 0)
  } else {
    document.addEventListener('plusready', fn, false);
  }
};
//false 代表默认样式
const plusOpen = (url, id, styles, extras, fn) => {
  if (!styles) {
    styles = {
      statusbar: {background: '#FFFFFF'},
      popGesture: 'close'
    }
  } else if (styles && typeof styles === "object") {
    styles.statusbar = {background: '#FFFFFF'};
    styles.popGesture = 'close'
  } else {
    styles = {}
  }
  let aniShow = "slide-in-right";
  showWaiting();
  let cw = mui.openWindow({
    url,
    id,
    styles,
    extras,
    show: {aniShow},
    waiting: {autoShow: false}
  });
  cw.addEventListener('rendered', () => {
    closeWaiting();
  }, false);
  cw.addEventListener('loading', () => {
    fn && fn();
  }, false);
  return cw
};
const showWaiting = () => {
  return plus.nativeUI.showWaiting("", {
    background: 'rgba(0,0,0,0)',
    loading: {height: "80px", icon: '/static/waiting.png',interval:50}
  });
}

const closeWaiting = () => {
  plus.nativeUI.closeWaiting();
}

const plusToast = (message, options) => {
  plusready(() => {
    plus.nativeUI.toast(message, options)
  })
};

const plusConfirm = (message, title, buttons) => {
  return new Promise((resolve, reject) => {
    let btn = [
      i18n.translate('vux.alert.button_text'),
      i18n.translate('vux.calendar.cancel_text')
    ];
    if (!buttons) {
      buttons = btn
    }
    if (!title) {
      title = i18n.translate('提示');
    }
    plus.nativeUI.confirm(message, (e) => {
      if (e.index == 0) {
        resolve();
      } else {
        reject();
      }
    }, {title,buttons});
  })
}
export {
  plusready,
  plusOpen,
  plusToast,
  plusConfirm,
  showWaiting
}
