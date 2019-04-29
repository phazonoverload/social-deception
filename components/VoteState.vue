<template>
  <div>
    <form @submit.prevent="submitForm" v-if='!submittedVote'>
      <section>
        <div class="input-group">
          <label for="vote">What is your move this turn?</label>
          <div class="ops">
            <div class="radio d">
              <input type="radio" value="d" id="defect" v-model="form.playerVote">
              <label for="defect">Defect</label>
            </div>
            <div class="radio c">
              <input type="radio" value="c" id="cooperate" v-model="form.playerVote">
              <label for="cooperate">Cooperate</label>
            </div>
          </div>
        </div>
        <div class="input-group">
          <label for="vote-why">Why did you make this choice?</label>
          <textarea v-model="form.playerVoteReason" id="vote-why" required></textarea>
        </div>
      </section>
      <section>
        <div class="input-group">
          <label for="op-vote">What do you think your opponent will do this turn?</label>
          <div class="ops">
            <div class="radio d">
              <input type="radio" value="d" id="op-defect" v-model="form.expectedOpponentVote">
              <label for="op-defect">Defect</label>
            </div>
            <div class="radio c">
              <input type="radio" value="c" id="op-cooperate" v-model="form.expectedOpponentVote">
              <label for="op-cooperate">Cooperate</label>
            </div>
          </div>
        </div>
        <div class="input-group">
          <label for="op-vote-why">Why do you think this?</label>
          <textarea v-model="form.expectedOpponentVoteReason" id="op-vote-why" required></textarea>
        </div>
      </section>
      <input type="submit" value="Submit vote">
    </form>
    <p v-else>Thanks for submitting your vote. Hang tight for the reveal.</p>
  </div>
</template>

<script>
export default {
  created() {
    this.submittedVote = this.votes.filter(vote => {
      return vote.userName == this.user.name && 
             vote.round == this.game.state.round
    }).length > 0;
  },
  data() {
    return {
      submittedVote: false,
      form: {}
    }
  },
  methods: {
    submitForm() {
      const { gameId, userId } = this.$store.state;
      const { name, score, side } = this.user

      this.fire.votes.add({
        gameId,
        userId,
        side,
        userName: name,
        currentScore: score,
        round: this.game.state.round,
        vote: { ...this.form },
        outcome: {},
        fact: this.$store.state.fact || 'None'
      }).then(() => {
        this.submittedVote = true;
        this.vote = {};
      })
    }
  },
  props: ['user', 'fire', 'game', 'votes']
}
</script>

<style scoped>
.radio input + label {
  background: #444;
}
.radio.d input:checked + label {
  background: var(--red);
}
.radio.c input:checked + label {
  background: var(--green);
}
section {
  background: var(--dark-alt);
  padding: 1em 1em 1px 1em;
  margin-bottom: 1em;
}
</style>
