import {createStore} from 'vuex'

export default createStore({
  state: {
    isFullScreen: false,
    ip:'http://101.133.141.41/'
  },
  mutations: {
    changeFullScreen(state) {
      state.isFullScreen = !state.isFullScreen
    }
  },
  actions: {},
  modules: {}
})
