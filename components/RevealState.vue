<template>
  <div id='reveal'>
    <h2>Your opponent chose to {{opponentVote}}</h2>
    <p v-if='playerVote'>You chose to {{playerVote}}</p>
    <p>As a result, you have {{scoreDelta}} point/s</p>
  </div>
</template>

<script>
export default {
  computed: {
    playerVote() {
      const v = this.votes.filter(vote => {
        return vote.userId == this.user['.key'] && vote.round == this.game.state.round
      })[0];
      if(v) { return v.vote.playerVote == 'c' || v.vote.playerVote == 'C' ? 'Cooperate' : 'Defect' }
      return false;
    },
    opponentVote() {
      const v = this.votes.filter(vote => {
        return vote.userId == this.user['.key'] && vote.round == this.game.state.round
      })[0];
      if(v) { return v.outcome.opponentVote == 'c' || v.outcome.opponentVote == 'C' ? 'Cooperate' : 'Defect' }
      return false;
    },
    scoreDelta() {
      const v = this.votes.filter(vote => {
        return vote.userId == this.user['.key'] && vote.round == this.game.state.round
      })[0];
      if(v) { return v.outcome.scoreDelta }
      return false;
    }
  },
  props: ['user', 'votes', 'game']
}
</script>

<style scoped>
p {
  margin-bottom: 1em;
  margin-top: 1em;
}

</style>
