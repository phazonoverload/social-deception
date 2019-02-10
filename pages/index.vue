<template>
  <div>
    <h1 class="title">Welcome.</h1>
    <div class="instruction">
      Let's get you in the game!
    </div>
    <form @submit.prevent="submitForm">
      <label for="game_id">Game name</label>
      <select id="game_id" v-model="chosenGame">
        <option v-for="op in games" :key="op['.key']" :value="op['.key']">{{op.name}}</option>
      </select>
      <label for="user-id">User ID</label>
      <input type="text" v-model="userId" id="user-id" required>
      <div class="first">
        <h3>Only if joining for the first time</h3>
        <label for="side">Initial table side</label>
        <select id="side" v-model="side">
          <option>left</option>
          <option>right</option>
        </select>
      </div>
      <input type="submit" value="Submit">
    </form>
  </div>
</template>

<script>
import { db } from '~/plugins/firebase.js'

export default {
  data() {
    return {
      games: [],
      users: [],
      chosenGame: '',
      userId: '',
      score: 0,
      side: ''
    }
  },
  firestore() {
    return {
      games: db.collection('games'),
      users: db.collection('users')
    }
  },
  created() {
    if(this.hasGame) {
      this.$router.push('/game/' + this.gameInState);
    }
  },
  methods: {
    submitForm() {
      if(this.userExistsInGame(this.userId, this.chosenGame)) {
        let filteredUserList = this.users.filter(user => {
          return user.name == this.userId && user.game == this.chosenGame
        });
        this.enterLobby(filteredUserList[0]['.key'], this.chosenGame)
      } else {
        this.$firestore.users.add({
          name: this.userId,
          game: this.chosenGame,
          score: parseInt(this.score),
          side: this.side,
          moves: { 0: { vote: 0 } }
        }).then(data => {
          this.enterLobby(data.id, this.chosenGame);
        })
      }
    },
    userExistsInGame(userId, gameId) {
      let filteredUserList = this.users.filter(user => {
        return user.name == userId && user.game == gameId
      });
      return filteredUserList.length > 0;
    },
    enterLobby(userId, gameId) {
      this.$router.push('/game/' + gameId)
      this.$store.dispatch('setGame', gameId);
      this.$store.dispatch('setUser', userId);
      localStorage.setItem('game', gameId);
      localStorage.setItem('user', userId);
    }
  },
  computed: {
    hasGame() {
      return this.$store.getters.hasGame
    },
    gameInState() {
      return this.$store.getters.game
    }
  }
}
</script>

<style scoped>
.first {
  background: rgb(209, 209, 209);
  padding: 1em;
  margin-bottom: 1em;
}
.first h3 {
  margin-bottom: 1em;
}
</style>
