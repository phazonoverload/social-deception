export const state = () => ({
  game: undefined
});

export const mutations = {
  setGame(vuexContext, id) {
    vuexContext.game = id;
  },
}

export const actions = {
  setGame(vuexContext, id) {
    vuexContext.commit('setGame', id);
  },
}

export const getters = {
  
}