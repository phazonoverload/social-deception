export const strict = false

export const state = () => ({
  baseUrl: 'https://deceptr.firebaseio.com/',
  user: JSON.parse(localStorage.getItem('user')) || {},
  userGame: {},
  adminGame: {
    players: [],
    ids: { firebase_id: undefined },
    state: {}
  }
});

export const mutations = {
  setUser(state, payload) {
    state.user = payload;
  },
  setGame(state, payload) {
    state.userGame = payload;
  },
  clearGame(state) {
    state.user = {};
    state.userGame = {};
  },
  setAdminGameIds(state, payload) {
    state.adminGame.ids = payload;
  },
  setAdminGamePlayers(state, payload) {
    state.adminGame.players = payload;
  },
  setAdminGameState(state, payload) {
    state.adminGame.state = payload;
  }
};

export const actions = {
  addUserToGame: async function(vuexContext, payload) {
    // Get all users, check if there's already a game with that user. If not, create the user.
    this.$axios.$get(vuexContext.state.baseUrl + '/users.json').then(data => {
      let users = Object.entries(data).map(item => { return { firebase_id: item[0], ...item[1] } });
      users = users.filter(item => { return item.game_id == payload.game_id && item.player_id == payload.player_id });
      if(users.length == 0) {
        this.$axios.$post(vuexContext.state.baseUrl + '/users.json', payload).then(data => {
          vuexContext.commit("setUser", {...payload, firebase_user_id: data.name});
          vuexContext.commit("setUser", {...payload, firebase_user_id: data.name});
          localStorage.setItem('user', JSON.stringify({...payload, firebase_user_id: data.name}))
        }).catch(e => console.log(e));
      } else {
        let user = users[0];
        vuexContext.commit("setUser", {...payload, firebase_user_id: user.firebase_id});
        localStorage.setItem('user', JSON.stringify({...payload, firebase_user_id: user.firebase_id}))
      }
    }).catch(e => console.log(e));
  },
  clearGame(vuexContext) {
    vuexContext.commit('clearGame');
    localStorage.removeItem('user');
  },
  adminGetGame: async function(vuexContext, gameId) {
    await this.$axios.$get(vuexContext.state.baseUrl + '.json').then(data => {
      // Get all games, check if the gameId already exists. If not, create it.
      let games = Object.entries(data.games).map(item => { return { firebase_id: item[0], ...item[1] } });
      games = games.filter(item => { return item.game_id == gameId });
      if(games.length == 0) {
        this.$axios.$post(vuexContext.state.baseUrl + '/games.json', { 
          game_id: gameId,
          state: { round: 0, phase: 'prep' }
        }).then(data => {
          vuexContext.commit('setAdminGameIds', { firebase_id: data.name, game_id: gameId })
        })
      } else {
        vuexContext.commit('setAdminGameState', games[0].state);
        vuexContext.commit('setAdminGameIds', { firebase_id: games[0].firebase_id, game_id: games[0].game_id })
      }
    })
  },
  adminGetPlayers(vuexContext, gameId) {
    // Get all players and then filter to get just the current game players 
    this.$axios.$get(vuexContext.state.baseUrl + '/users.json').then(data => {
      let players = Object.entries(data).map(item => { return { firebase_id: item[0], ...item[1] } });
      players = players.filter(item => { return item.game_id == gameId })
      vuexContext.commit('setAdminGamePlayers', players);
    })
  },
  adminSetGameState(vuexContext, payload) {
    this.$axios.$put(vuexContext.state.baseUrl + '/games/' + vuexContext.state.adminGame.ids.firebase_id + '.json', {
      game_id: vuexContext.state.adminGame.ids.game_id,
      state: { phase: payload.phase, round: payload.round }
    })
    vuexContext.commit('setAdminGameState', payload);
  },
  getGame(vuexContext, gameId) {
    this.$axios.$get(vuexContext.state.baseUrl + '/games.json').then(data => {
      let games = Object.entries(data).map(item => { return { firebase_id: item[0], ...item[1] } });
      games = games.filter(item => { return item.game_id == gameId });
      vuexContext.commit('setGame', games[0]);
    })
  }
};

export const getters = {
  isInGame(state) {
    // return state.userGame != {};
    return false
  },
  getUser(state) {
    return state.user;
  },
  getGame(state) {
    return state.userGame;
  },
  adminGetPlayers(state) {
    return state.adminGame.players;
  },
  adminGameState(state) {
    return state.adminGame.state != {} ? state.adminGame.state : false;
  },
  adminGetGameId(state) {
    return state.adminGame.ids.firebase_id;
  }
}