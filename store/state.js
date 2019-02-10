export default () => ({
  baseUrl: 'https://deceptr.firebaseio.com/',
  game: localStorage.getItem('game') || '',
  user: localStorage.getItem('user') || ''
  // user: JSON.parse(localStorage.getItem('user')) || {},
  // userGame: {},
  // opponentMove: {},
  // playerMove: {},
  // adminGame: {
  //   players: [],
  //   ids: { firebase_id: undefined },
  //   state: {}
  // },
  // scores: {
  //   both_coop: 1,
  //   both_defect: -1,
  //   backstab: 2,
  //   sucker: -2
  // }
});