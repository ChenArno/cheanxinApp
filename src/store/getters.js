/**
 * Created by century on 2017/7/17.
 */
const getters = {
  direction: state => state.position.direction,
  tabItem: state => state.position.tabItem,
  lan: state => state.user.lan,
  url: state => state.user.url,
  ip: state => state.user.ip,
  port: state => state.user.port,
  backImg: state => state.user.backImg,
  defalutApp: state => {
    let val = state.user.defalutApp;
    return val && JSON.parse(val)
  },
  defalutDep: state => {
    let val = state.user.defalutDep;
    return val && JSON.parse(val)
  },
  defalutArea: state => {
    let val = state.user.defalutArea;
    return val && JSON.parse(val)
  },
  showPage: state => state.user.showPage,
  userInfo: state => state.user.userInfo,
  lastUpdateTime: state => state.user.lastUpdateTime,
  carMsg: state => {
    let val = state.user.carMsg;
    return val && JSON.parse(val)
  },
  TopView: state => state.basic.TopView,
  signleList: state => state.basic.signleList,
  backState: state => state.basic.backState,

  ipcSerial: state => state.xcall.ipcSerial,
  shopMsg: state => state.xcall.shopMsg,
  shopMsgCell: state => state.xcall.shopMsgCell,
  notice: state => state.xcall.notice,
  viedoState: state => state.xcall.viedoState,
  timeLoad: state => state.xcall.timeLoad,
  blueList: state => state.xcall.blueList,
  epcList: state => state.xcall.epcList,
  plusRouter: state => state.xcall.plusRouter,

  fileSave: state => {
    return '_downloads/image/'
  }
};
export default getters
