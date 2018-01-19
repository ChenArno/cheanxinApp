/**
 * Created by century on 2017/7/27.
 */


const basic = {
  state: {
    TopView: false,   //true代表从通讯录进入
    signleList: [],
    backState:false
  },
  mutations: {
    set_TopView: (state, TopView) => {
      state.TopView = TopView;
    },
    set_signleList: (state, signleList) => {
      state.signleList = signleList;
    },
    set_backState:(state,backState)=>{
      state.backState = backState;
    }
  }
}

export default basic
