<template>
  <div id='current-round'>
    <h2>Current Round Votes ({{scoresIn.length}}/{{users.length}})</h2>
    <div class="list">
      <table>
      <tbody>
        <tr>
          <td>Name</td>
          <td>Position</td>
          <td>Voted</td>
          <td>Result</td>
        </tr>
        <tr v-for='move in scoresIn' :key="move['.key']">
          <td>{{move.userName}}</td>
          <td>{{move.sideShort}}:{{move.pos}}</td>
          <td>{{move.vote.vote}}</td>
          <td>{{move.outcome.type}}</td>
        </tr>
      </tbody>
    </table>
    </div>
  </div>
</template>

<script>
import { db } from '~/plugins/firebase.js'

export default {
  data() {
    return {
      users: {},
      game: {
        state: { round: 0 }
      },
      moves: {}
    }
  },
  firestore() {
    return {
      users: db.collection('users').where('game', '==', this.$route.params.id).orderBy('side', 'desc').orderBy('score', 'desc'),
      game: db.collection('games').doc(this.$route.params.id),
      moves: db.collection('moves').where('game', '==', this.$route.params.id).orderBy('pos', 'asc')
    }
  },
  computed: {
    userInStore() {
      return this.$store.getters.user;
    },
    scoresIn() {
      return this.moves.filter(data => {
        return data.round == this.game.state.round
      }).map(d => {
        return { ...d, sideShort: d.side == 'left' ? 'l' : 'r' }
      })
    }
  }
}
</script>

<style scoped>
#current-round {
  border: 2px solid slategrey;
  padding: 1em;
}
h2 {
  margin-bottom: 1.5rem;
}
.lists {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 2em;
}
table {
  width: 100%;
  border-collapse: collapse;
}
tr:first-child {
  font-weight: bold
}
table td {
  border-collapse: collapse;
  border: 1px solid lightgrey;
  padding: 0.5em;
  text-transform: uppercase;
}
</style>