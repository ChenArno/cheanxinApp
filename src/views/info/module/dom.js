/**
 * Created by century on 2017/10/26.
 */
import store from 'store'

const addevent = {
  router:'index',
  setRouter(val){
    this.router = val;
    store.commit("SET_PLUSROUTER",val);
  }
}
window.addevent = addevent
