export const state = () => ({
  baseUrl: 'https://deceptr.firebaseio.com/',
  usersGame: JSON.parse(localStorage.getItem('usersGame')) || undefined,
  adminGame: {
    players: [],
    ids: { firebase_id: undefined },
    state: {}
  }
});

export const mutations = {
  addUserToGame(state, payload) {
    state.usersGame = payload;
  },
  clearGame(state) {
    state.usersGame = undefined;
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
          vuexContext.commit("addUserToGame", {...payload, firebase_user_id: data.name});
          localStorage.setItem('usersGame', JSON.stringify({...payload, firebase_user_id: data.name}))
        }).catch(e => console.log(e));
      } else {
        let user = users[0];
        console.log(user);
        vuexContext.commit("addUserToGame", {...payload, firebase_user_id: user.firebase_id});
        localStorage.setItem('usersGame', JSON.stringify({...payload, firebase_user_id: user.firebase_id}))
      }
    }).catch(e => console.log(e));
  },
  clearGame(vuexContext) {
    vuexContext.commit('clearGame');
    localStorage.removeItem('usersGame');
  },
  adminGetGame: async function(vuexContext, gameId) {
    await this.$axios.$get(vuexContext.state.baseUrl + '.json').then(data => {
      // Get all games, check if the gameId already exists. If not, create it.
      let games = Object.entries(data.games).map(item => { return { firebase_id: item[0], ...item[1] } });
      games = games.filter(item => { return item.game_id == gameId });
      if(games.length == 0) {
        this.$axios.$post(vuexContext.state.baseUrl + '/games.json', { game_id: gameId }).then(data => {
          vuexContext.commit('setAdminGameIds', { firebase_id: data.name, game_id: gameId })
        })
      } else {
        let game = games[0];
        vuexContext.commit('setAdminGameState', game.state);
        vuexContext.commit('setAdminGameIds', { firebase_id: game.firebase_id, game_id: game.game_id })
      }

      // Get all players and then filter to get just the current game players 
      let players = Object.entries(data.users).map(item => { return { firebase_id: item[0], ...item[1] } });
      players = players.filter(item => { return item.game_id == gameId; })
      vuexContext.commit('setAdminGamePlayers', players);
    })
  },
  adminSetGameState(vuexContext, payload) {
    this.$axios.$put(vuexContext.state.baseUrl + '/games/' + vuexContext.state.adminGame.ids.firebase_id + '.json', {
      game_id: vuexContext.state.adminGame.ids.game_id,
      state: { phase: payload.phase, round: payload.round }
    })
    vuexContext.commit('setAdminGameState', payload);
  }
};

export const getters = {
  isInGame(state) {
    return state.usersGame != undefined;
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