<template>
  <div>
    <h1>Admin Home</h1>
    <form @submit.prevent='enterGame'>
      <h2>Enter Existing Game</h2>
      <div class="input-group">
        <label for="enter-game">Choose Game</label>
        <select id="game_id" v-model="chosenGame">
          <option v-for="op in games" :key="op['.key']" :value="op['.key']">{{op.name}}</option>
        </select>
      </div>
      <input type="submit" value='Enter Game'>
    </form>
    <form @submit.prevent='createGame'>
      <h2>Create New Game</h2>
      <div class="input-group">
        <label for="new-game-name">Game Name</label>
        <input type="text" id='new-game-name' v-model='newGameName'>
      </div>
      <input type="submit" value='Create Game'>
    </form>
  </div>
</template>

<script>
import { db } from '~/plugins/firebase.js';

export default {
  data() {
    return {
      newGameName: '',
      chosenGame: '',
      games: []
    }
  },
  firestore() {
    return {
      games: db.collection('games')
    }
  },
  methods: {
    enterGame() {
      this.$router.push('/admin/' + this.chosenGame);
      this.$store.dispatch('setGameId', this.chosenGame);
    },
    createGame() {
      this.$firestore.games.add({
        name: this.newGameName,
        facts: false,
        state: {
          round: 0,
          phase: 'setup',
        },
      }).then(doc => {
        this.$router.push('/admin/' + doc.id);
        this.$store.dispatch('setGameId', doc.id);
      });
      this.newGameName = ''
    }
  }
}
</script>

<style scoped>
form h2 {
  margin-bottom: 0.5em;
}
</style>
