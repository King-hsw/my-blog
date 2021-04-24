import {createStore} from 'vuex'

export default createStore({
  state: {
    isFullScreen: false
  },
  mutations: {
    changeFullScreen(state) {
      state.isFullScreen = !state.isFullScreen
    }
  },
  actions: {},
  modules: {}
})
