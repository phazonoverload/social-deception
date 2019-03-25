<template>
  <div v-if='game.state'>
    <h1>{{game.state.phase}}</h1>
    <SetupState :users='users' v-if='game.state.phase == "setup"' />
    <VoteState :fire='$firestore' :user='user' :game='game' v-if='game.state.phase == "vote"' />
  </div>
</template>

<script>
import { db } from '~/plugins/firebase.js'
import SetupState from '~/components/SetupState'
import VoteState from '~/components/VoteState'

export default {
  data() {
    return {
      game: { state: {} },
      user: {},
      users: []
    }
  },
  firestore() {
    return {
      game: db.collection('games').doc(this.$route.params.game),
      users: db.collection('users').where('game', '==', this.$route.params.game).orderBy('side', 'desc'),
      user: db.collection('users').doc(this.$store.state.userId),
      votes: db.collection('votes')
    }
  },
  components: {
    SetupState,
    VoteState
  }
}
</script>

<style scoped>
h1 {
  text-transform: uppercase;
  margin-bottom: 1rem;
}
</style>
