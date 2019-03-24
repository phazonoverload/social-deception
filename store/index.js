export const state = () => ({
  gameId: undefined,
  game: {}
});

export const mutations = {
  setGameId(vuexContext, id) {
    vuexContext.gameId = id;
  },
  setGame(vuexContext, game) {
    vuexContext.game = game;
  },
}

export const actions = {
  setGameId(vuexContext, id) {
    vuexContext.commit('setGameId', id);
  },
  setGame(vuexContext, game) {
    vuexContext.commit('setGame', game);
  },
}

export const getters = {
  
}