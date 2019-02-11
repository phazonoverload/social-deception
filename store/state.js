export default () => ({
  baseUrl: 'https://deceptr.firebaseio.com/',
  game: localStorage.getItem('game') || '',
  user: localStorage.getItem('user') || ''
});