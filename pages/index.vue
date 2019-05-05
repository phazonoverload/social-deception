<template>
  <div>
    <h1>Let's get started</h1>
    <form @submit.prevent='submitForm'>
      <div class="input-group">
        <label for="game_id">Game name</label>
        <select id="game_id" v-model="gameId" required>
          <option v-for="op in games" :key="op['.key']" :value="op['.key']">{{op.name}}</option>
        </select>
      </div>
      <div class="input-group">
        <label for="user-id">User ID</label>
        <input type="text" v-model="userId" id="user-id" required>
      </div>
      <div class="first">
        <div class="input-group">
          <label for="side">Table side</label>
          <select id="side" v-model="side" required>
            <option>left</option>
            <option>right</option>
          </select>
        </div>
        <div class="input-group">
          <label for="score">Score</label>
          <input type="number" v-model='score' required>
        </div>
      </div>
      <input type="submit" value='Enter game'>
    </form>
  </div>
</template>

<script>
import { db } from '~/plugins/firebase.js'

export default {
  data() {
    return {
      gameId: '',
      userId: '',
      side: '',
      score: '',
      facts: false,
      factType: '',
      games: [],
      users: [],
    }
  },
  firestore() {
    return {
      games: db.collection('games'),
      users: db.collection('users')
    }
  },
  methods: {
    async submitForm() {
      this.userId = this.userId.toUpperCase();
      const { gameId, userId, side, score, facts, factType } = this;
      const userExistsInGame = this.userExistsInGame(gameId, userId);
      if(userExistsInGame) {
        this.enterLobby(gameId, userExistsInGame);
      } else {
        const s = parseInt(score);
        this.$firestore.users.add({
          name: userId,
          game: gameId,
          score: s,
          side: side,
          seat: s,
          facts,
          factType,
          scores: { 0: s }
        }).then(res => {
          this.enterLobby(gameId, res.id);
        })
      }
    },
    userExistsInGame(gameId, userId) {
      let filteredUserList = this.users.filter(user => {
        return user.name == userId && user.game == gameId
      });
      return filteredUserList.length > 0 ? filteredUserList[0]['.key'] : false
    },
    enterLobby(gameId, userId) {
      this.$router.push('/' + gameId)
      this.$store.dispatch('setGameId', gameId);
      this.$store.dispatch('setUserId', userId);
    }
  }
}
</script>

<style scoped>
.first {
  background: var(--dark-alt);
  padding: 1em;
  margin-bottom: 1em;
}
.first h3 {
  font-size: 1em;
}
</style>
