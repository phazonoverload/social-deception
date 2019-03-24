<template>
  <div v-if='game.state'>
    <h1>{{game.state.phase}}</h1>
    <VoteState :fire='$firestore' :user='user' :game='game' v-if='game.state.phase == "vote"' />
  </div>
</template>

<script>
import { db } from '~/plugins/firebase.js'
import VoteState from '~/components/VoteState'

export default {
  data() {
    return {
      game: { state: {} },
      user: {}
    }
  },
  firestore() {
    return {
      game: db.collection('games').doc(this.$route.params.game),
      user: db.collection('users').doc(this.$store.state.userId),
      votes: db.collection('votes')
    }
  },
  components: {
    VoteState
  }
}
</script>

<style scoped>
</style>
