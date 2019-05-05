<template>
  <div>
    <h1>Admin Game Single</h1>
    <GameSettings :game='game' :fire='$firestore' v-if='game.state' />
    
    <vac :end-time="new Date().getTime() + 60000" v-if='showCountdown' id='countdown'>
      <span slot="process" slot-scope="{ timeObj }"><i class="fas fa-clock"></i>{{ `${timeObj.s} seconds` }}</span>
      <span slot="finish">Discussion time is over.</span>
    </vac>

    <UserList :users='users' :votes='votes' />
    <CalculateScores :users='users' :fire='$firestore' :votes='votes' :game='game' v-if='showCalc' />
    <ToggleFacts :users='users' :fire='$firestore' />
    <ExportGame :users='users' :votes='votes' :game='game' />
  </div>
</template>

<script>
import { db } from '~/plugins/firebase.js'
import UserList from '~/components/UserList'
import GameSettings from '~/components/GameSettings'
import CalculateScores from '~/components/CalculateScores'
import ExportGame from '~/components/ExportGame'
import ToggleFacts from '~/components/ToggleFacts'

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
    },
    showCountdown() {
      if(this.game.state) {
        return this.game.state.phase == 'play'
      }
    }
  },
  components: {
    UserList,
    GameSettings,
    CalculateScores,
    ExportGame,
    ToggleFacts
  },
  head () {
    return { title: `Admin for ${this.game.name}` }
  },
}
</script>

<style scoped>
#countdown {
  background: var(--dark-alt);
  padding: 1em;
  text-align: center;
  display: block;
  width: 100%;
  margin-bottom: 1em;
  margin-top: 1em;
}
#countdown i {
  margin-right: 0.5em;
}
</style>
