<template>
  <div id='calcScores'>
    <h2>Calc Scores for Round {{game.state.round}}</h2>
    <ul v-if='this.usersFull.length > 0'>
      <li 
        v-for='user in this.usersFull' 
        :key='user[".key"]'>
        <div v-if='user.vote' class='record'>
          <span>Seat: {{user.seat}}</span>
          <span>Side: {{user.side}}</span>
          <span>P: {{user.vote.vote.playerVote}}</span>
          <span>O: {{user.vote.outcome.opponentVote}}</span>
          <span>R: {{user.vote.outcome.resultName}}</span>
        </div>
      </li>
    </ul>
    <button class='btn' @click='calc'>Calculate Scores</button>
  </div>
</template>

<script>
import { db } from '~/plugins/firebase.js'
export default {
  methods: {
    async calc() {
      for(let user of this.usersFull) {
        const opponent = this.usersFull.filter(u => {
          return u.seat == user.seat && u['.key'] != user['.key']
        })[0]
        const v = [user.vote.vote.playerVote.toUpperCase(), opponent.vote.vote.playerVote.toUpperCase()];

        let outcome = {};
        function setOutcome(opponentVote, resultName, scoreDelta) {
          outcome = { opponentVote, resultName, scoreDelta }
        }
        if(v[0] == 'C' && v[1] == 'C') {
          setOutcome(v[1], 'both-coop', 1);
        }
        if(v[0] == 'D' && v[1] == 'D') {
          setOutcome(v[1], 'both-defect', -1);
        }
        if(v[0] == 'D' && v[1] == 'C') {
          setOutcome(v[1], 'betray', 2);
        }
        if(v[0] == 'C' && v[1] == 'D') {
          setOutcome(v[1], 'sucker', -2);
        }
        
        // Update votes record to contain the outcome
        db.collection('votes').doc(user.vote['.key']).update({ outcome })
        
        db.collection('users').doc(user['.key']).update({
          score: user.score + outcome.scoreDelta,
          scores: {
            ...user.scores,
            [this.game.state.round]: user.score + outcome.scoreDelta
          }
        })
      }
    }
  },
  computed: {
    usersFull() {
      let u = []
      for(let user of this.users) {
        const userVote = this.votes.filter(vote => {
          return vote.userId == user['.key'] && vote.round == this.game.state.round
        })[0]
        u.push({
          ...user,
          vote: userVote
        })
      }
      return u;
    },
  },
  props: ['users', 'votes', 'game', 'fire']
}
</script>

<style scoped>
#calcScores {
  border: 2px solid var(--dark-alt);
  padding: 1em;
  margin-top: 1em;
}
li {
  margin-top: 0.5em;
  margin-left: 1.25em;
}
ul {
  margin-bottom: 1em;
}
.record {
  text-transform: uppercase;
}
span {
  margin-right: 0.5em;
}
</style>
