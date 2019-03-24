export const state = () => ({
  gameId: localStorage.getItem('gameId') || undefined,
  userId: localStorage.getItem('userId') || undefined,
});

export const mutations = {
  setGameId(vuexContext, id) {
    vuexContext.gameId = id;
  },
  setUserId(vuexContext, id) {
    vuexContext.userId = id;
  },
}

export const actions = {
  setGameId(vuexContext, id) {
    vuexContext.commit('setGameId', id);
    localStorage.setItem('gameId', id);
  },
  setUserId(vuexContext, id) {
    vuexContext.commit('setUserId', id);
    localStorage.setItem('userId', id);
  },
}

export const getters = {
  
}