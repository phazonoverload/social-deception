<template lang="">
  <div>
    <form @submit.prevent="submitMove" v-if="showForm">
      <h2 v-if="game.state">Round {{game.state.round}} voting</h2>
      <label for="pos">What is your table position?</label>
      <input type="text" id="pos" v-model="move.pos" required>
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
    <div v-else>
      <h2>Please chat with your partner.</h2>
      <p>Remember that you'll need to make a choice between cooperating and defecting at the end of this round.</p>
    </div>
    <ul id="dev">
      <h2>Debugging</h2>
      <li>Game ID: {{game.game_id}}</li>
      <li>Game firebase ID: {{game.firebase_id}}</li>
      <li v-if="game.state">State: Round {{game.state.round}}: {{game.state.phase}}</li>
      <li>Your player ID: {{player.player_id}}</li>
      <li>Your player firebase ID: {{player.firebase_user_id}}</li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      move: {},
      polling: null,
      voted: false
    }
  },
  created: async function() {
    this.pollData();
  },
  methods: {
    // https://renatello.com/vue-js-polling-using-setinterval/
    pollData() {
      this.polling = setInterval(() => {
        this.$store.dispatch('getGame', this.$route.params.id);
        if(this.voted === true && this.game.state.phase == 'play') {
          this.voted = false;
        }
      }, 5000)
    },
    submitMove() {
      this.move.round = this.game.state.round;
      this.$store.dispatch('vote', this.move);
      this.voted = true;
      this.move = {};
    }
  },
  beforeDestroy() {
    clearInterval(this.polling);
  },
  computed: {
    game() {
      return this.$store.getters.getGame;
    },
    player() {
      return this.$store.getters.getUser;
    },
    showForm() {
      return !this.voted && this.game.state.phase == 'vote';
    }
  }
}
</script>

<style scoped>
form {
  margin-top: 2em;
}
h2 {
  margin-bottom: 0.5em;
}
#dev {
  background: lightgrey;
  font-family: monospace;
  padding: 1em;
  list-style-type: none;
  margin-top: 2em;
}
</style>
