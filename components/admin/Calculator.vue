<template>
  <div id="c">
    <div id='cta' @click="calculate">Calculate scores</div>
  </div>
</template>

<script>
import { db } from '~/plugins/firebase.js'

export default {
  data() {
    return {
      game: {},
      users: {}
    }
  },
  firestore() {
    return {
      game: db.collection('games').doc(this.$route.params.id),
      users: db.collection('users').where('game', '==', this.$route.params.id)
    }
  },
  methods: {
    calculate() {
      for(let i = 1; i < this.game.seats + 1; i++) {
        // Grab both moves from the ith seat position
        // Then restructure so their latest vote is at the root level
        let players = this.users.filter(user => (user.current == i));
        players = players.map(user => ({ ...user, vote: user.moves[this.game.state.round].vote }));

        let p1 = players[0].vote;
        let p2 = players[1].vote;

        if(p1 == 1 && p2 == 1) {
          this.commitScore(players[0]['.key'], 1, 'both-coop', 1);
          this.commitScore(players[1]['.key'], 1, 'both-coop', 1);
        }
        if(p1 == -1 && p2 == -1) {
          this.commitScore(players[0]['.key'], -1, 'both-coop', -1);
          this.commitScore(players[1]['.key'], -1, 'both-coop', -1);
        }
        if(p1 != p2) {
          if(p1 == 1) {
            this.commitScore(players[0]['.key'], -1, 'both-coop', -2);
            this.commitScore(players[1]['.key'], 1, 'both-coop', 2);
          } else {
            this.commitScore(players[0]['.key'], 1, 'both-coop', 2);
            this.commitScore(players[1]['.key'], -1, 'both-coop', -2);
          }
        }
      }
    },
    commitScore(userId, opponentScore, type, scoreDelta) {
      db.collection('users').doc(userId).update({
        moves: {
          [this.game.state.round]: {
            outcome: {
              opponent: opponentScore,
              scoreDelta,
              type
            }
          }
        }
      })
    }
  }
}
</script>


<style scoped>
#c {
  border: 2px solid slategrey;
  padding: 1em;
}
#cta {
  background: mediumseagreen;
  color: white;
  text-align: center;
  padding: 1em;
  text-transform: uppercase;
  font-weight: bold;
  cursor: pointer;
}
</style>