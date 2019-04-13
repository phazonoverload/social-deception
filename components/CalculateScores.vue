<template>
  <div id='calcScores'>
    <h2>Calc Scores for Round {{game.state.round}}</h2>
    <ul v-if='this.usersFull.length > 0'>
      <li 
        v-for='user in this.usersFull' 
        :key='user[".key"]'>
        <div v-if='user.vote'>
          <span>Vote: {{user.vote.vote.playerVote.toUpperCase()}},</span>
          <span>Opp: {{user.vote.outcome.opponentVote.toUpperCase()}}</span>
          <span>Result: {{user.vote.outcome.resultName.toUpperCase()}}</span>
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
        if(v[0] == 'C' && v[1] == 'C') {
          outcome = {
            opponentVote: v[1],
            resultName: 'both-coop',
            scoreDelta: 1
          }
        }
        if(v[0] == 'D' && v[1] == 'D') {
          outcome = {
            opponentVote: v[1],
            resultName: 'both-defect',
            scoreDelta: -1
          }
        }
        if(v[0] == 'D' && v[1] == 'C') {
          outcome = {
            opponentVote: v[1],
            resultName: 'betray',
            scoreDelta: 2
          }
        }
        if(v[0] == 'C' && v[1] == 'D') {
          outcome = {
            opponentVote: v[1],
            resultName: 'sucker',
            scoreDelta: -2
          }
        }

        // db.collection('votes').doc(user.vote['.key']).update({
        //   outcome
        // })
        
        db.collection('users').doc(user['.key']).update({
          scores: {
            // ...this.4
            // Need to keep old score  in DB using spread
            
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
    }
  },
  props: ['users', 'votes', 'game', 'fire']
}
</script>

<style scoped>
#calcScores {
  border: 2px solid var(--light);
  padding: 1em;
  margin-top: 1em;
}
li {
  margin-top: 0.5em;
  margin-left: 1.25em;
}
</style>
