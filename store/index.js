export const state = () => ({
  gameId: localStorage.getItem('gameId') || undefined,
});

export const mutations = {
  setGameId(vuexContext, id) {
    vuexContext.gameId = id;
  },
}

export const actions = {
  setGameId(vuexContext, id) {
    vuexContext.commit('setGameId', id);
    localStorage.setItem('gameId', id);
  },
}

export const getters = {
  
}