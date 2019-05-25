<template>
  <div class='fact'>
    <pre v-html='fact'></pre>
  </div>
</template>

<script>
export default {
  created() {
    let fact;
    
    // Set fact based on this user's fact type
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
      // Get the user ID of the opponent
      const userOppositeId = this.getUserIdOtherSideSameSeat();
      // Get their full voting record and make the data from each turn nice
      const usersVotingRecord = this.getUsersVotingRecord(userOppositeId).map(e => {
        const playerVote = e.vote.playerVote == 'c' ? 'Cooperate' : 'Defect';
        const expectedOpponentVote = e.vote.expectedOpponentVote == 'c' ? 'Cooperate' : 'Defect';
        const actualOpponentVote = e.outcome.opponentVote == 'C' ? 'Cooperate' : 'Defect';
        return `Round ${e.round}\nExpected opponent to ${expectedOpponentVote} because '${e.vote.expectedOpponentVoteReason}' (they actually chose to ${actualOpponentVote})\nPlayer's vote was ${playerVote} because '${e.vote.playerVoteReason}'`
      })
      // Only return the last 3 items in the array and join them with linebreaks
      return 'In the last three rounds, your opponent did the following:\n\n' + usersVotingRecord.slice(-3).join('\n\n');
    },
    opponentSeatHistory() {
      // Get the user ID of the opponent
      const userOppositeId = this.getUserIdOtherSideSameSeat();
      // Get their full seat history and return it
      const usersSeatRecord = this.getUsersVotingRecord(userOppositeId).map(e => {
        const v = e.vote.playerVote == 'c' ? 'Cooperate' : 'Defect';
        return `Round ${e.round}: ${e.currentSeat}`
      }).join('\n');
      return 'Your opponent\'s seat position record is \n\n' + usersSeatRecord;
    },
    scoreSameSideOneSeatDelta() {
      // If user is not in the top seat, show the score of the player one seat up
      // If user is in the top seat, show the score of the player one seat down
      if(this.user.seat != this.game.seats) {
        const userUp = this.getUserSameSideOneSeatUp();
        return 'The player one seat up from you has the score: ' + userUp.score;
      } else {
        const userDown = this.getUserSameSideOneSeatDown();
        return 'The player one seat down from you has the score: ' + userDown.score;
      }
    },
    votingRecordOfOpponent() {
      // Get the user ID of the opponent
      const userOppositeId = this.getUserIdOtherSideSameSeat();
      // Get opponent's full voting record and return it
      const usersVotingRecord = this.getUsersVotingRecord(userOppositeId).map(e => {
        const v = e.vote.playerVote == 'c' ? 'Cooperate' : 'Defect';
        return `Round ${e.round}: ${v}`
      }).join('\n');
      return 'Your opponent\'s voting record is \n\n' + usersVotingRecord;
    },
    percentageBreakdownOfOpponentVotes() {
      // Get the user ID of the opponent
      const userOppositeId = this.getUserIdOtherSideSameSeat();
      // Get opponent's full voting record
      const usersVotingRecord = this.getUsersVotingRecord(userOppositeId);
      // Get number of votes they have made
      const numberOfVotes = usersVotingRecord.length;
      // Get number of cooperations they've made
      const numberOfCooperations = usersVotingRecord.filter(vote => vote.vote.playerVote == 'c').length;
      // Get percentage of cooperations they've made
      const percentageCooperations = (100/numberOfVotes) * numberOfCooperations;
      // If percentage is >= 50, show the percentage of cooperations
      // If not, show the percentage of defections
      if(percentageCooperations >= 50) {
        return `Your opponent has cooperated in ${parseInt(percentageCooperations)}% of rounds so far.`
        } else {
        return `Your opponent has defected in ${100 - parseInt(percentageCooperations)}% of rounds so far.`
      }
    },
    scoreOfOpponent() {
      // Get score of opponent
      const userOpposite = this.getUserOtherSideSameSeat();
      return 'Your opponent has the score: ' + userOpposite.score;
    },
    getUserSameSideOneSeatDown() {
      // Get the user on the same side as the player, but one seat position down
      return this.users.filter(user => {
        return user.seat == this.user.seat-1 && user.side == this.user.side;
      })[0];
    },
    getUserSameSideOneSeatUp() {
      // Get the user on the same side as the player, but one seat position up
      return this.users.filter(user => {
        return user.seat == this.user.seat+1 && user.side == this.user.side;
      })[0];a
    },
    getUserOtherSideSameSeat() {
      // Get opponent record
      return this.users.filter(user => {
        return user.seat == this.user.seat && user.side != this.user.side;
      })[0]
    },
    getUserIdOtherSideSameSeat() {
      // Get the ID of opponent
      return this.users.filter(user => {
        return user.seat == this.user.seat && user.side != this.user.side;
      })[0]['.key'];
    },
    getUsersVotingRecord(userId) {
      // Get a sorted voting record for a user, given their ID
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
  overflow-x: auto;
  white-space: pre-wrap;
}
</style>
