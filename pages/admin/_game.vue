<template>
  <div>
    <h1>Admin Game Single</h1>
    <GameSettings :game='game' :fire='$firestore' v-if='game.state' />
    <UserList :users='users' :votes='votes' />
    <CalculateScores :users='users' :fire='$firestore' :votes='votes' :game='game' v-if='showCalc' />
  </div>
</template>

<script>
import { db } from '~/plugins/firebase.js'
import UserList from '~/components/UserList'
import GameSettings from '~/components/GameSettings'
import CalculateScores from '~/components/CalculateScores'

export default {
  data() {
    return {
      game: {},
      users: [],
      votes: []
    }
  },
  firestore() {
    return {
      game: db.collection('games').doc(this.$route.params.game),
      users: db.collection('users').where('game', '==', this.$route.params.game).orderBy('side', 'desc').orderBy('score', 'desc'),
      votes: db.collection('votes').where('gameId', '==', this.$route.params.game)
    }
  },
  computed: {
    showCalc() {
      if(this.game.state) {
        return this.game.state.phase == 'calculate'
      }
    }
  },
  components: {
    UserList,
    GameSettings,
    CalculateScores
  },
  head () {
    return { title: `Admin for ${this.game.name}` }
  },
}
</script>

<style scoped>
</style>
