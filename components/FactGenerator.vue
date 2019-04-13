<template>
  <div class='fact'>
    <p>{{generateFact}}</p>
  </div>
</template>

<script>
export default {
  computed: {
    generateFact() {
      let fact;

      if(this.user.seat == this.game.seats) {
        // IN TOP SEAT
        // RESULT: Show score of user one seat down
        const userOneDown = this.users.filter(user => {
          return user.seat == this.user.seat-1 && user.side == this.user.side;
        })[0];
        fact = 'The user one seat down from you has the score:' + userOneDown.score;
      }

      if(this.user.seat == 1) {
        // IN BOTTOM SEAT
        // RESULT: Show record of user opposite
        const userOppositeId = this.users.filter(user => {
          return user.seat == 1 && user.side != this.user.side;
        })[0]['.key'];
        const usersVotingRecord = this.votes.filter(vote => {
          return vote.userId == userOppositeId
        })
          .sort((a, b) => (a.round > b.round) ? 1 : -1)
          .map(e => {
            const v = e.vote.playerVote == 'c' ? 'Cooperate' : 'Defect';
            return `Round ${e.round}: ${v}`
          }).join(', ');
        fact = 'Your opponent\'s voting record is ' + usersVotingRecord;
      }

      if(this.user.seat != this.game.seats && this.user.seat != 1) {
        // NOT IN BOTTOM OR TOP SEAT

      }

      return fact;
    }
  },
  props: ['game', 'users', 'user', 'votes']
}
</script>

<style scoped>
.fact {
  background: var(--dark);
  color: white;
  padding: 1em 2em;
  text-align: center;
  margin-bottom: 1em;
}
.fact p {
  margin-bottom: 0;
}
</style>
