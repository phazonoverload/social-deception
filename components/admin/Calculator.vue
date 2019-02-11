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
      users: db.collection('users').where('game', '==', this.$route.params.id),
      moves: db.collection('moves').where('game', '==', this.$route.params.id)
    }
  },
  methods: {
    calculate() {
      for(let i = 1; i < this.game.seats + 1; i++) {
        let players = this.moves.filter(move => (move.round == i));
        let p1 = players[0];
        let p2 = players[1];

        if(p1.vote == 1 && p2.vote == 1) {
          this.commitScore(players[0], 1, 'both-coop', 1,);
          this.commitScore(players[1], 1, 'both-coop', 1);
        }
        if(p1.vote == -1 && p2.vote == -1) {
          this.commitScore(players[0], -1, 'both-defect', -1);
          this.commitScore(players[1], -1, 'both-defect', -1);
        }
        if(p1.vote != p2.vote) {
          if(p1 == 1) {
            this.commitScore(players[0], -1, 'suckers-luck', -2);
            this.commitScore(players[1], 1, 'betray', 2);
          } else {
            this.commitScore(players[0], 1, 'betray', 2);
            this.commitScore(players[1], -1, 'suckers-luck', -2);
          }
        }
      }
    },
    commitScore(move, opponentScore, type, scoreDelta) {
      db.collection('moves').doc(move['.key']).update({
        outcome: {
          opponent: opponentScore,
          type,
          scoreDelta
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