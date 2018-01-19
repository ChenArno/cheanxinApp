/**
 * Created by century on 2017/8/14.
 * 变量调用
 */

const xcall = {
  state: {
    ipcSerial: '',
    shopMsg: {},
    shopMsgCell:[],
    notice:0,
    viedoState:0,
    timeLoad:false,
    blueList:[],
    epcList:[],
    plusRouter:'index'
  },
  mutations: {
    SET_IPCSERIAL: (state,ipcSerial) =>{
      state.ipcSerial = ipcSerial;
    },
    SET_SHOPMSG: (state, shopMsg) => {
      state.shopMsg = shopMsg;
    },
    SET_SHOPMSGCELL: (state, shopMsgCell) => {
      state.shopMsgCell = shopMsgCell;
    },
    SET_ERPCLIST: (state, epcList) => {
      state.epcList = epcList;
    },
    SET_NOTICE: (state, notice) => {
      state.notice = notice;
    },
    SET_VIEDOSTATE:(state, viedoState) => {
      state.viedoState = viedoState;
    },
    SET_TIMELOAD:(state, timeLoad) => {
      state.timeLoad = timeLoad;
    },
    SET_BLUELIST:(state,blueList)=>{
      state.blueList = blueList;
    },
    SET_PLUSROUTER:(state,plusRouter)=>{
      state.plusRouter = plusRouter;
    }
  }
}

export default xcall
