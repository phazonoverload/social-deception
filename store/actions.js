export default {
  setGame(vuexContext, id) {
    vuexContext.commit('setGame', id)
  },
  setUser(vuexContext, id) {
    vuexContext.commit('setUser', id)
  },
  clearGame(vuexContext) {
    vuexContext.commit('clearGame')
  },
  clearUser(vuexContext) {
    vuexContext.commit('clearUser')
  }
};