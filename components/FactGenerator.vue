<template>
  <div class='fact'>
    <pre v-html='fact'></pre>
  </div>
</template>

<script>
export default {
  created() {
    let fact;
    
    switch(this.factType) {
      case('opponent-voting-record'):
        fact = this.votingRecordOfOpponent()
        break;
      case('opponent-percentage-breakdown'):
        fact = this.percentageBreakdownOfOpponentVotes();
        break;
      case('opponent-score'):
        fact = this.scoreOfOpponent();
        break;
      case('one-seat-down-score'):
        fact = this.scoreSameSideOneSeatDelta()
        break;
      case('opponent-last-three'):
        fact  = this.opponentLastThreeRounds();
        break;
      case('opponent-seat-history'):
        fact = this.opponentSeatHistory();
        break;
    }

    this.$store.dispatch('setFact', fact);
    this.fact = fact;
  },
  methods: {
    opponentLastThreeRounds() {
      const userOppositeId = this.getUserIdOtherSideSameSeat();
      const usersVotingRecord = this.getUsersVotingRecord(userOppositeId).map(e => {
        const playerVote = e.vote.playerVote == 'c' ? 'Cooperate' : 'Defect';
        const expectedOpponentVote = e.vote.expectedOpponentVote == 'c' ? 'Cooperate' : 'Defect';
        const actualOpponentVote = e.outcome.opponentVote == 'C' ? 'Cooperate' : 'Defect';
        return `Round ${e.round}\nExpected opponent to ${expectedOpponentVote} because '${e.vote.expectedOpponentVoteReason}' (they actually chose to ${actualOpponentVote})\nPlayer's vote was ${playerVote} because '${e.vote.playerVoteReason}'`
      })
      return 'In the last three rounds, your opponent did the following:\n\n' + usersVotingRecord.slice(-3).join('\n\n');
    },
    opponentSeatHistory() {
      const userOppositeId = this.getUserIdOtherSideSameSeat();
      const usersSeatRecord = this.getUsersVotingRecord(userOppositeId).map(e => {
        const v = e.vote.playerVote == 'c' ? 'Cooperate' : 'Defect';
        return `Round ${e.round}: ${e.currentSeat}`
      }).join('\n');
      return 'Your opponent\'s seat position record is \n\n' + usersSeatRecord;
      return true;
    },
    scoreSameSideOneSeatDelta() {
      if(this.user.seat == 1) {
        const userUp = this.getUserSameSideOneSeatUp();
        return 'The player one seat up from you has the score: ' + userUp.score;
      } else {
        const userDown = this.getUserSameSideOneSeatDown();
        return 'The player one seat down from you has the score: ' + userDown.score;
      }
    },
    votingRecordOfOpponent() {
      const userOppositeId = this.getUserIdOtherSideSameSeat();
      const usersVotingRecord = this.getUsersVotingRecord(userOppositeId).map(e => {
        const v = e.vote.playerVote == 'c' ? 'Cooperate' : 'Defect';
        return `Round ${e.round}: ${v}`
      }).join('\n');
      return 'Your opponent\'s voting record is \n\n' + usersVotingRecord;
    },
    percentageBreakdownOfOpponentVotes() {
      const userOppositeId = this.getUserIdOtherSideSameSeat();
      const usersVotingRecord = this.getUsersVotingRecord(userOppositeId);
      const numberOfVotes = usersVotingRecord.length;
      const numberOfCooperations = usersVotingRecord.filter(vote => vote.vote.playerVote == 'c').length;
      const percentageCooperations = (100/numberOfVotes) * numberOfCooperations;
      if(percentageCooperations >= 50) {
        return `Your opponent has cooperated in ${parseInt(percentageCooperations)}% of rounds so far.`
        } else {
        return `Your opponent has defected in ${100 - parseInt(percentageCooperations)}% of rounds so far.`
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
    getUserSameSideOneSeatUp() {
      return this.users.filter(user => {
        return user.seat == this.user.seat+1 && user.side == this.user.side;
      })[0];
    },
    getUserOtherSideSameSeat() {
      return this.users.filter(user => {
        return user.seat == this.user.seat && user.side != this.user.side;
      })[0]
    },
    getUserIdOtherSideSameSeat() {
      return this.users.filter(user => {
        return user.seat == this.user.seat && user.side != this.user.side;
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
  computed: {
    factType() {
      return this.user.factType
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
.fact pre {
  margin-bottom: 0;
  font-size: 1em;
}
</style>
