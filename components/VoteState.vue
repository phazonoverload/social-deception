<template>
  <div>
    <form @submit.prevent="submitForm" v-if='!submittedVote'>
      <div class="input-group">
        <label for="vote">What is your move this turn?</label>
        <div class="ops">
          <div class="radio">
            <input type="radio" value="d" id="defect" v-model="form.playerVote">
            <label for="defect">Defect</label>
          </div>
          <div class="radio">
            <input type="radio" value="c" id="cooperate" v-model="form.playerVote">
            <label for="cooperate">Cooperate</label>
          </div>
        </div>
      </div>
      <div class="input-group">
        <label for="vote-why">Why did you make this choice?</label>
        <textarea v-model="form.playerVoteReason" id="vote-why" required></textarea>
      </div>
      <div class="input-group">
        <label for="op-vote">What do you think your opponent will do this turn?</label>
        <div class="ops">
          <div class="radio">
            <input type="radio" value="d" id="op-defect" v-model="form.expectedOpponentVote">
            <label for="op-defect">Defect</label>
          </div>
          <div class="radio">
            <input type="radio" value="c" id="op-cooperate" v-model="form.expectedOpponentVote">
            <label for="op-cooperate">Cooperate</label>
          </div>
        </div>
      </div>
      <div class="input-group">

        <label for="op-vote-why">Why do you think this?</label>
        <textarea v-model="form.expectedOpponentVoteReason" id="op-vote-why" required></textarea>
      </div>
      <input type="submit" value="Submit vote">
    </form>
    <p v-else>Thanks for submitting your vote. Hang tight for the reveal.</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      submittedVote: localStorage.getItem('submittedVote') || false,
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
        userName: name,
        currentScore: score,
        side,
        round: this.game.state.round,
        vote: { ...this.form },
        outcome: {}
      }).then(() => {
        this.submittedVote = true;
        localStorage.setItem('submittedVote', true)
        this.vote = {};
      })
    }
  },
  props: ['user', 'fire', 'game']
}
</script>