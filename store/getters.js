export default {
  hasGame(state) {
    return state.game != ''
  },
  game(state) {
    return state.game
  }
}