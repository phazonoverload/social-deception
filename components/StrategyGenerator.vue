<template>
  <!-- NOTE -->
  <!-- NOTE -->
  <!-- THIS COMPONENT IS UNFINISHED AND UNUSED -->
  <!-- NOTE -->
  <!-- NOTE -->
  <div id='strategy'>
    <div class="top">
      <h2 @click='show = !show'>Toggle strategies at round {{round}}</h2>
      <input type="range" min="1" max="20" step="1" v-model="round"> 
    </div>
    <table v-if='usersFull.length > 0 && show'>
      <tr>
        <th>Name</th>
        <th>Round's vote</th>
        <th>Strategies</th>
      </tr>
      <tr v-for='user in usersFull' :key='user[".key"]'>
        <td v-if='round > 0 && user.votes[round-1]'>{{user.name}}</td>
        <td :class='{vote: true, d: user.votes[round-1].vote.playerVote == "d"}' v-if='round > 0 && user.votes[round-1]'>
          <span>{{user.votes[round-1].vote.playerVote.toUpperCase()}}</span>
        </td>
        <td v-if='round > 0 && user.votes[round-1]'><span>{{user.strategies}}</span></td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: false,
      round: 1
    }
  },
  computed: {
    usersFull() {
      let u = []
      for(let user of this.users) {
        const userVotes = this.votes.filter(vote => {
          return vote.userId == user['.key']
        }).sort((a, b) => (a.round > b.round) ? 1 : -1)

        u.push({
          ...user,
          votes: userVotes
        })
      }

      for(let i in u) {
        let user = u[i];
        let strategies = [];

        let votes = user.votes.slice(0, this.round);

        const cooperations = votes.filter(vote => vote.vote.playerVote == 'c').length;
        const defections = votes.filter(vote => vote.vote.playerVote == 'd').length;

        // const opponentLastRound = this.votes.filter(v => {
        //   return v.round == this.round - 1 && 
        //          v.currentSeat == user.seat && 
        //          v.side != user.side
        // })[0]
        // console.log('opponentLastRound for ' + user.name + ' is ' + opponentLastRound);

        // ALLC or ALLD
        if(cooperations == votes.length) strategies.push('ALLC');
        if(defections == votes.length) strategies.push('ALLD');

        // PRIMARYC OR PRIMARYD (at least 80% of the time)
        if(cooperations >= (this.game.state.round / 5) * 4 && !strategies.includes('ALLC')) strategies.push('PRIMARYC');
        if(defections >= (this.game.state.round / 5) * 4 && !strategies.includes('ALLD')) strategies.push('PRIMARYD');
        
        // HALF of each
        if(cooperations == (votes.length/2)) strategies.push('HALF');

        // TFT
        // if(opponentLastRound) {
          // strategies.push(opponentLastRound.vote.playerVote.toUpperCase()) 
          // if()
        // } 
        // console.log(opponentVoteLastRound);
        // strategies.push(JSON.stringify(opponentVoteLastRound))
        // TTFT
        // TFTT
        // PAVLOV
        // PROTECT


        u[i] = { ...user, strategies: strategies.join(', ') }
      }

      return u;
    }
  },
  props: ['game', 'users', 'votes']
}
</script>

<style scoped>
#strategy {
  border: 2px solid var(--dark-alt);
  padding: 1em;
  margin-top: 1em;
}
h2 {
  cursor: pointer;
}
.top {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 0.5em;
}
input {
  background: var(--dark-alt);
  width: 500px;
}
td.vote {
  background: var(--green);
}
td.d {
  background: var(--red)
}
</style>
