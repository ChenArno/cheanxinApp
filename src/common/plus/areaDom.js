/**
 * Created by century on 2017/7/24.
 */
import store from 'store'

window.selection = {
  shop(val) {
    store.commit('SET_DEFALUTDEP',val);
  },
  area(val){
    store.commit('SET_DEFALUTAREA',val);
  }
}
