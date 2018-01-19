/**
 * Created by century on 2017/7/17.
 */
const position = {
  state: {
    direction: 'forward',
    tabItem: sessionStorage.getItem('_tabItem') ? sessionStorage.getItem('_tabItem') : 0
  },
  mutations: {
    SET_DIRECTION: (state, direction) => {
      state.direction = direction;
    },
    SET_TABITEM: (state, tabItem) => {
      sessionStorage.setItem('_tabItem', tabItem)
      state.tabItem = tabItem
    }
  }
}
export default position
