<template>
  <div id="orchestrator">
    <h1 class="title">Orchestrator</h1>
    <form @submit.prevent="enterGame">
      <label for="game_id">Enter existing game</label>
      <div class="input-group">
        <select id="game_id" v-model="chosenGame">
          <option v-for="op in games" :key="op['.key']" :value="op['.key']">{{op.name}}</option>
        </select>
        <input type="submit" value="Submit">
      </div>
    </form>
    <form @submit.prevent="createGame">
      <label for="new_game">Create new game</label>
      <div class="input-group">
      <input type="text" v-model="newGameName" id="new_game" required>
      <input type="submit" value="Submit">
      </div>
    </form>
  </div>
</template>

<script>
import { db } from '~/plugins/firebase.js'

export default { 
  data() {
    return {
      chosenGame: '',
      newGameName: '',
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
      this.$router.push('/orchestrator/' + this.chosenGame);
    },
    createGame() {
      this.$firestore.games.add({
        name: this.newGameName,
        state: {
          round: 0,
          phase: 'play'
        },
      }).then(doc => {
        this.$router.push('/orchestrator/' + doc.id);
      });
      this.newGameName = ''
    }
  }
}
</script>

<style scoped>
form {
  border: 2px solid slategrey;
  padding: 1em;
  margin-bottom: 2em;
}
.input-group {
  display: grid;
  grid-template-columns: 4fr 1fr;
  grid-gap: 1em;
}
input,
select {
  margin-bottom: 0;
}
</style>