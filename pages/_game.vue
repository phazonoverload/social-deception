<template>
  <div v-if='game.state && users.length > 0 && votes.length > 0'>
    <h1>{{game.state.phase}}</h1>
    <SetupState :users='users' v-if='game.state.phase == "setup"' />
    <PlayState :game='game' :users='users' :user='user' :votes='votes' v-if='game.state.phase == "play"' />
    <VoteState :fire='$firestore' :user='user' :game='game' :votes='votes' v-if='game.state.phase == "vote"' />
    <CalculateState v-if='game.state.phase == "calculate"' />
    <RevealState v-if='game.state.phase == "reveal"' :user='user' :votes='votes' :game='game' />

    <!-- Hide footer during calcuation phase -->
    <footer v-if='game.state.phase != "calculate"'>
      <p>Round {{game.state.round}}. Your score is {{user.score}}</p>
    </footer>
  </div>
</template>

<script>
import { db } from '~/plugins/firebase.js'
import SetupState from '~/components/SetupState'
import PlayState from '~/components/PlayState'
import VoteState from '~/components/VoteState'
import CalculateState from '~/components/CalculateState'
import RevealState from '~/components/RevealState'

export default {
  data() {
    return {
      game: { state: {} },
      user: {},
      users: [],
      votes: []
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
    PlayState,
    VoteState,
    CalculateState,
    RevealState
  },
  head () {
    return { title: `${this.game.name} - ${this.user.name}` }
  },
}
</script>

<style scoped>
h1 {
  text-transform: uppercase;
  margin-bottom: 1rem;
}

footer {
  position: fixed;
  bottom: 0;
  left: 0;
  display: block;
  width: 100vw;
  background: var(--dark-alt);
  color: white;
  text-align: center;
  padding: 0.5em;
  text-transform: uppercase;
  box-sizing: border-box;
  border-top: 2px solid var(--dark);
}
</style>
