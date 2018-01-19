/**
 * Created by century on 2017/7/18.
 */
import store from 'store'
import {plusready, plusOpen} from 'common/plus'

const dir = function (mod,router,routes){
  const history = window.sessionStorage;
  history.removeItem(`${mod}count`);
  routes.map(v => {
    history.removeItem(`${mod}${v.path}`);
  });
  let historyCount = history.getItem(`${mod}count`) * 1 || 0;
  history.setItem(`${mod}/`, 0);
  router.beforeEach((to, from, next) => {
    //退出
    if(to.path == "/" && from.path !=="/"){
      plusready(()=>{
        let aniShow = plus.os.ios ? "pop-out" : "slide-out-right";
        plus.webview.currentWebview().close(aniShow);
      });
      return
    }
    const toIndex = history.getItem(`${mod}${to.path}`);
    const fromIndex = history.getItem(`${mod}${from.path}`);

    if (toIndex) {
      if (!fromIndex || parseInt(toIndex, 10) > parseInt(fromIndex, 10) || (toIndex === '0' && fromIndex === '0')) {
        store.commit(`SET_DIRECTION`, 'forward')
      } else {
        store.commit(`SET_DIRECTION`, 'reverse')
      }
    } else {
      ++historyCount;
      history.setItem(`${mod}count`, historyCount);
      to.path !== '/' && history.setItem(`${mod}${to.path}`, historyCount);
      store.commit('SET_DIRECTION', 'forward');
    }
    if (/\/http/.test(to.path)) {
      let url = to.path.split('http')[1];
      plusOpen(`http${url}`,`http${url}`);
    } else {
      next()
    }
  });
};


export default dir
