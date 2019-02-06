export const state = () => ({
  baseUrl: 'https://deceptr.firebaseio.com/',
  game: JSON.parse(localStorage.getItem('game')) || undefined,
  adminGame: {
    players: []
  }
});

export const mutations = {
  setGame(state, payload) {
    state.game = payload;
  },
  clearGame(state) {
    state.game = undefined;
  },
  setAdminGamePlayers(state, payload) {
    state.adminGame.players = payload;
  }
};

export const actions = {
  setGame(vuexContext, payload) {
    return this.$axios.$post(vuexContext.state.baseUrl + '/users.json', {
      ...payload,
      created: new Date()
    }).then(data => {
      vuexContext.commit("setGame", {...payload, firebase_id: data.name});
      localStorage.setItem('game', JSON.stringify({...payload, firebase_id: data.name}))
    }).catch(e => console.log(e));
  },
  clearGame(vuexContext) {
    vuexContext.commit('clearGame');
    localStorage.removeItem('game');
  },
  adminGetGame(vuexContext, gameId) {
    return this.$axios.$get(vuexContext.state.baseUrl + '/users.json').then(data => {
      let flat_data = Object.entries(data).map(item => {
        return { firebase_id: item[0], ...item[1] }
      });
      let single_game_player_list = flat_data.filter(item => {
        return item.game_id == gameId;
      })
      vuexContext.commit('setAdminGamePlayers', single_game_player_list)
    })
  }
};

export const getters = {
  isInGame(state) {
    return state.game != undefined;
  },
  adminGetPlayers(state) {
    return state.adminGame.players;
  }
}