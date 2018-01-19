/**
 * Created by century on 2017/7/17.
 */
const user = {
  state: {
    lan:localStorage.getItem('_lan'),
    url: localStorage.getItem('_url'),
    ip:localStorage.getItem('_ip'),
    port:localStorage.getItem('_port'),
    backImg:localStorage.getItem('_backImg'),
    defalutApp:localStorage.getItem('_defalutApp'),
    defalutDep:localStorage.getItem('_defalutDep'),
    defalutArea:localStorage.getItem('_defalutArea'),
    showPage:localStorage.getItem('_showPage'),
    userInfo:localStorage.getItem("user_info"),
    lastUpdateTime:localStorage.getItem("_lastUpdateTime"),
    carMsg:localStorage.getItem("_carMsg")
  },
  mutations: {
    SET_LAN: (state,lan) => {
      localStorage.setItem('_lan',lan);
      state.lan = lan;
    },
    SET_URL: (state,url) => {
      localStorage.setItem('_url',url);
      state.url = url;
    },
    SET_IP: (state,ip) => {
      localStorage.setItem('_ip',ip);
      state.ip = ip;
    },
    SET_PORT: (state,port) => {
      localStorage.setItem('_port',port);
      state.port = port;
    },
    SET_BACKIMG: (state,backImg) => {
      localStorage.setItem('_backImg',backImg);
      state.backImg = backImg;
    },
    SET_DEFALUTAPP:(state,defalutApp) => {
      localStorage.setItem('_defalutApp',defalutApp);
      state.defalutApp = defalutApp;
    },
    SET_DEFALUTDEP:(state,defalutDep) => {
      localStorage.setItem('_defalutDep',defalutDep);
      state.defalutDep = defalutDep;
    },
    SET_DEFALUTAREA:(state,defalutArea) => {
      localStorage.setItem('_defalutArea',defalutArea);
      state.defalutArea = defalutArea;
    },
    SET_SHOWPAGE:(state,showPage) => {
      localStorage.setItem('_showPage',showPage);
      state.showPage = showPage;
    },
    SET_USERINFO:(state,userInfo) => {
      localStorage.setItem('user_info',userInfo);
      state.userInfo = userInfo;
    },
    SET_LASTUPDATETIME:(state,lastUpdateTime) => {
      localStorage.setItem('_lastUpdateTime',lastUpdateTime);
      state.lastUpdateTime = lastUpdateTime;
    },
    SET_CARMSG:(state,carMsg) => {
      localStorage.setItem('_carMsg',carMsg);
      state.carMsg = carMsg;
    }
  }
};

export default user
