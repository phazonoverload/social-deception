<template>
  <div id='current-round'>
    <h2>Current Round</h2>
    <div class="list">
      <ul>
        <li v-for='move in scoresIn' :key='move[".key"]' :class="{active: move.outcome != {}}">
          {{move.userName}} [{{move.side}}:{{move.pos}}] ({{move.outcome.type}})
        </li>
      </ul>
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
      moves: db.collection('moves').where('game', '==', this.$route.params.id)
    }
  },
  computed: {
    userInStore() {
      return this.$store.getters.user;
    },
    scoresIn() {
      return this.moves.filter(data => {
        return data.round == this.game.state.round
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
}
ul {
  padding-left: 0;
  list-style-type: none;
}
li {
  border: 2px solid lightgrey;
  color: lightgrey;
  display: inline-block;
  padding: 0.5em 1em; 
  margin-right: 0.5em;
  text-transform: uppercase;
  font-weight: bold;
  font-size: 0.8em;
}
li.active {
  border-color: mediumseagreen;
  color: mediumseagreen;
}
</style>