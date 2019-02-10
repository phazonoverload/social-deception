export default {
  setGame(vuexContext, id) {
    vuexContext.game = id;
  },
  setUser(vuexContext, id) {
    vuexContext.user = id;
  },
  clearGame(vuexContext) {
    vuexContext.game = '';
  },
  clearUser(vuexContext) {
    vuexContext.user = '';
  }
};