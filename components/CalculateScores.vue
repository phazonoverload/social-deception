<template>
  <div id='calcScores'>
    <h2>Calc Scores for Round {{game.state.round}}</h2>
    
    <!-- v-if is used to only load this list if the data has been loaded from database -->
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

    <!-- Only show button if scores haven't already been calculated -->
    <button class='btn' @click='calc' v-if='!hasCalculated'>Calculate Scores</button>
  </div>
</template>

<script>
import { db } from '~/plugins/firebase.js'
export default {
  data() {
    return {
      hasCalculated: false
    }
  },
  methods: {
    async calc() {
      // Hide button
      this.hasCalculated = true;

      // For each user
      for(let user of this.usersFull) {
        // Find their opponent
        const opponent = this.usersFull.filter(u => {
          return u.seat == user.seat && u['.key'] != user['.key']
        })[0]

        // Create an array where the first item is the current users vote, and the second is their opponent's vote
        const v = [user.vote.vote.playerVote.toUpperCase(), opponent.vote.vote.playerVote.toUpperCase()];

        let outcome = {};

        // Based on results, put some data in the the outcome object above 
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
        
        // Update user score and scores object
        await db.collection('users').doc(user['.key']).update({
          score: user.score + outcome.scoreDelta,
          scores: {
            ...user.scores,
            [this.game.state.round]: user.score + outcome.scoreDelta
          }
        })

        // Utility function to set the outcome object with a set of provided values 
        function setOutcome(opponentVote, resultName, scoreDelta) {
          outcome = { opponentVote, resultName, scoreDelta }
        }
      }

      // Update seat position for each user
      const usersLeft = this.usersFull.filter(user => user.side == 'left');
      const usersRight = this.usersFull.filter(user => user.side == 'right');
      function updateUserListByScore(input) {
        const l = input.sort((a, b) => {
          if(a.score > b.score) { return 1; }
          if(a.score < b.score) { return -1; }
          if(a.score == b.score) {
            let aO = a.scores[a.scores.length-1];
            let bO = b.scores[b.scores.length-1];
            if(aO > bO) return 1;
            if(aO < bO) return -1;
            return 0;
          }
        })
        for(let [i, user] of l.entries()) {
          db.collection('users').doc(user['.key']).update({
            seat: i + 1
          })
        }
      }
      updateUserListByScore(usersLeft);
      updateUserListByScore(usersRight);
    }
  },
  computed: {
    // Combine a user's votes with their user record
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
