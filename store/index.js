export const state = () => ({
  gameId: localStorage.getItem('gameId') || undefined,
  userId: localStorage.getItem('userId') || undefined,
  fact: localStorage.getItem('fact') || undefined
});

export const mutations = {
  setGameId(vuexContext, id) {
    vuexContext.gameId = id;
  },
  setUserId(vuexContext, id) {
    vuexContext.userId = id;
  },
  setFact(vuexContext, fact) {
    vuexContext.fact = fact;
  }
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
  setFact(vuexContext, fact) {
    vuexContext.commit('setFact', fact);
    localStorage.setItem('fact', fact);
  },
}

export const getters = {
  
}