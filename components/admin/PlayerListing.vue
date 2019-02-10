<template>
  <div id="players">
    <h2>Players</h2>
    <table>
      <tbody>
        <tr v-for='player in players' :key="player['.key']">
          <td>{{player.name}}</td>
          <td>{{player.score}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { db } from '~/plugins/firebase.js'

export default {
  data() {
    return {
      players: [],
    }
  },
  firestore() {
    return {
      players: db.collection('users').where('game', '==', this.gameInStore).orderBy('score', 'desc')
    }
  },
  computed: {
    gameInStore() {
      return this.$store.getters.game
    }
  }
}
</script>

<style scoped>
#players {
  border: 2px solid slategrey;
  padding: 1em;
}
h2 {
  margin-bottom: 1.5rem;
}
table {
  width: 100%;
  border-collapse: collapse;
}
table td {
  border-collapse: collapse;
  border: 1px solid lightgrey;
  padding: 0.5em;
}
</style>
