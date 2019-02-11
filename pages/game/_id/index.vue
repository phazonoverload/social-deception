<template>
  <div>
    <div v-if="game.state">
      <h1 class="title">Round {{game.state.round}}: {{game.state.phase}}</h1>

      <div v-if="game.state.phase == 'play'">
        <p>Have a chat with your partner. Remember that you'll both have to secretly choose whether you will cooperate or defect.</p>
      </div>

      <div v-if="game.state.phase == 'vote'">
        <form @submit.prevent="voteSubmit" v-if='!subtmittedVote'>
          <label for="vote">What is your move this turn?</label>
          <select v-model="move.vote" id="vote" required>
            <option value="1">cooperate</option>
            <option value="-1">defect</option>
          </select>
          <label for="vote-why">Why did you make this choice?</label>
          <textarea v-model="move.voteWhy" id="vote-why" required></textarea>
          <label for="op-vote">What do you think your opponent will do this turn?</label>
          <select v-model="move.opVote" id="op-vote" required>
            <option value="1">cooperate</option>
            <option value="-1">defect</option>
          </select>
          <label for="op-vote-why">Why do you think this?</label>
          <textarea v-model="move.opVoteWhy" id="op-vote-why" required></textarea>
          <input type="submit" value="Submit">
        </form>
        <p v-else>Thanks for submitting your vote. Hang tight for the reveal.</p>
      </div>

      <div v-if="game.state.phase == 'calculate'">
        <p>We're calculating the scores now.</p>
      </div>

      <div v-if="game.state.phase == 'reveal'">
        <p>Your opponent chose to {{currentMove.outcome.opVote}}</p>
        <h2 class='reveal'>Your move was {{currentMove.outcome.type}}</h2>
        <p>Please move {{currentMove.outcome.scoreDelta}} seats</p>
      </div>

      <div v-if="game.state.phase == 'move'">
        <form @submit.prevent='roundEndSubmit' v-if='!submittedPos'>
          <label for="pos">What is your new table position?</label>
          <input type="number" id="pos" v-model="movePos" required>
          <input type="submit">
        </form>
        <p v-else>Thanks for submitting your position. Hang tight for the start of the next round.</p>
      </div>

      <div id="dev">
        <h2>Debugging</h2>
        <ul>
          <li>User: {{user.name}} ({{user['.key']}})</li>
          <li>Game: {{game.name}} ({{game['.key']}})</li>
          <li>User score: {{user.score}}</li>
          <li>All scores: <span v-for='(score, i) in user.scores' :key='i'>{{score}}, </span></li>
          <li>Current pos: {{user.current}}</li>
          <li>Current side: {{user.side}}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { db } from '~/plugins/firebase.js'

export default {
  data() {
    return {
      game: {},
      user: {},
      moves: {},
      move: {},
      movePos: undefined,
      submittedPos: false,
      subtmittedVote: false,
    }
  },
  firestore() {
    return {
      game: db.collection('games').doc(this.$route.params.id),
      user: db.collection('users').doc(this.userInState),
      moves: db.collection('moves')
    }
  },
  methods: {
    roundEndSubmit() {
      this.$firestore.user.update({
        scores: {
          ...this.user.scores,
          [this.game.state.round]: parseInt(this.movePos)
        },
        score: this.user.score + parseInt(this.movePos),
        current: parseInt(this.movePos)
      }).then(() => {
        this.$toast.success('Submitted successfully')
        this.submittedPos = true;
        this.subtmittedVote = false; 
      });
    },
    voteSubmit() {
      this.move.vote = parseInt(this.move.vote);
      this.$firestore.moves.add({
        game: this.$route.params.id,
        user: this.userInState,
        userName: this.user.name,
        pos: this.user.current,
        side: this.user.side,
        round: this.game.state.round,
        vote: { ...this.move },
        outcome: {}
      }).then(() => {
        this.$toast.success('Successfully voted')
        this.subtmittedVote = true;
        this.submittedPos = false;
      })
      
    }
  },
  computed: {
    userInState() {
      return this.$store.getters.user
    },
    currentMove() {
      let m = this.moves.filter(move => {
        return move.round == this.game.state.round && move.user == this.userInState
      })[0];
      return {
        ...m,
        outcome: {
          ...m.outcome,
          opVote: m.outcome.opponent == 1 ? 'cooperate' : 'defect'
        }
      }
    }
  }
}
</script>

<style scoped>
h1.title {
  text-transform: uppercase;
}
#dev {
  background: lightgrey;
  font-family: monospace;
  padding: 1em;
  list-style-type: none;
  margin-top: 2em;
}
h2.reveal {
  margin: 1em 0;
}
</style>
