<template>
  <div class='fact'>
    <p>{{fact}}</p>
  </div>
</template>

<script>
export default {
  created() {
    let fact;

    if(this.user.seat == this.game.seats) {
      fact = this.scoreSameSideOneSeatDown()
    }

    if(this.user.seat == 1) {
      fact = this.votingRecordOfOpponent()
    }

    if(this.user.seat != this.game.seats && this.user.seat != 1) {
      const rand = Math.floor(Math.random() * Math.floor(6));
      if(rand == 0) fact = this.percentageBreakdownOfOpponentVotes();
      if(rand == 1) fact = this.votingRecordOfOpponent();
      if(rand == 2) fact = this.scoreOfOpponent();
      if(rand > 2) fact = 'You will not receive a fact this round.'
    }

    this.$store.dispatch('setFact', fact);
    this.fact = fact;
  },
  methods: {
    scoreSameSideOneSeatDown() {
      const userOneDown = this.getUserSameSideOneSeatDown();
      return 'The player one seat down from you has the score: ' + userOneDown.score;
    },
    votingRecordOfOpponent() {
      const userOppositeId = this.getUserIdOtherSideSameSeat();
      const usersVotingRecord = this.getUsersVotingRecord(userOppositeId).map(e => {
        const v = e.vote.playerVote == 'c' ? 'Cooperate' : 'Defect';
        return `Round ${e.round}: ${v}`
      }).join(', ');
      return 'Your opponent\'s voting record is ' + usersVotingRecord;
    },
    percentageBreakdownOfOpponentVotes() {
      const userOppositeId = this.getUserIdOtherSideSameSeat();
      const usersVotingRecord = this.getUsersVotingRecord(userOppositeId);
      const numberOfVotes = usersVotingRecord.length;
      const numberOfCooperations = usersVotingRecord.filter(vote => vote.vote.playerVote == 'c').length;
      const percentageCooperations = (100/numberOfVotes) * numberOfCooperations;
      if(percentageCooperations >= 50) {
        return `Your opponent has cooperated in ${percentageCooperations}% of rounds so far.`
      } else {
        return `Your opponent has defected in ${100 - percentageCooperations}% of rounds so far.`
      }
    },
    scoreOfOpponent() {
      const userOpposite = this.getUserOtherSideSameSeat();
      return 'Your opponent has the score: ' + userOpposite.score;
    },
    getUserSameSideOneSeatDown() {
      return this.users.filter(user => {
        return user.seat == this.user.seat-1 && user.side == this.user.side;
      })[0];
    },
    getUserOtherSideSameSeat() {
      return this.users.filter(user => {
        return user.seat == 1 && user.side != this.user.side;
      })[0]
    },
    getUserIdOtherSideSameSeat() {
      return this.users.filter(user => {
        return user.seat == 1 && user.side != this.user.side;
      })[0]['.key'];
    },
    getUsersVotingRecord(userId) {
      return this.votes.filter(vote => {
        return vote.userId == userId
      }).sort((a, b) => (a.round > b.round) ? 1 : -1)
    }
  },
  data() {
    return {
      fact: ''
    }
  },
  props: ['game', 'users', 'user', 'votes']
}
</script>

<style scoped>
.fact {
  background: white;
  color: var(--dark);
  padding: 1em 2em;
  text-align: center;
  margin-bottom: 1em;
}
.fact p {
  margin-bottom: 0;
}
</style>
