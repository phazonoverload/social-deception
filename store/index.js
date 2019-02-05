export const state = () => ({
  baseUrl: 'https://deceptr.firebaseio.com/',
  game: undefined
});

export const mutations = {
  setGame(state, payload) {
    state.game = payload;
  },
  clearGame(state) {
    state.game = undefined;
  }
};

export const actions = {
  setGame(vuexContext, payload) {
    return this.$axios.$post(vuexContext.state.baseUrl + '/users.json', {
      ...payload,
      created: new Date()
    }).then(data => {
      console.log(data);
      vuexContext.commit("setGame", {...payload, firebase_id: data.name});
    }).catch(e => console.log(e));
  },
  clearGame(vuexContext) {
    vuexContext.commit('clearGame');
  }
};

export const getters = {
  isInGame(state) {
    return state.game != undefined;
  }
}