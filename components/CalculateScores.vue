<template>
  <div id='calcScores'>
    <h2>Calc Scores for Round {{game.state.round}}</h2>
    <table v-if='usersFull'>
      <tr>
        <th>Pos</th>
        <th class='l'>Vote</th>
        <th class='l'>Init Score</th>
        <th class='l'>Outcome</th>
        <th class='l'>New Score</th>
        <th class='r'>Vote</th>
        <th class='r'>Init Score</th>
        <th class='r'>Outcome</th>
        <th class='r'>New Score</th>
      </tr>
      <tr v-for='(v, i) in usersFull' :key='i'>
        <th>{{i}}</th>
        <th class='l'>{{v.left.vote.vote.playerVote}}</th>
        <th class='l'>{{v.left.vote.currentScore}}</th>
        <th class='l'>-</th>
        <th class='l'>-</th>
        <th class='r'>{{v.right.vote.vote.playerVote}}</th>
        <th class='r'>{{v.right.vote.currentScore}}</th>
        <th class='r'>-</th>
        <th class='r'>-</th>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  computed: {
    usersFull() {
      let u = []
      for(let user of this.users) {
        const vote = this.votes.filter(vote => {
          return vote.userId == user['.key'] && vote.round == this.game.state.round
        })[0]
        u.push({ ...user, vote })
      }

      let seats = []
      for(let i=0; i<this.game.seats; i++) {
        seats.push({})
      }
      for(let i=1; i<this.game.seats+1; i++) {
        for(let user of u) {
          if(user.seat == i) {
            seats[i-1] = {
              ...seats[i-1],
              [user.side]: user
            }
          }
        }
      }
      return seats;
    }
  },
  props: ['users', 'votes', 'game']
}
</script>

<style scoped>
#calcScores {
  border: 2px solid var(--light);
  padding: 1em;
  margin-top: 1em;
}
.l {
  background: var(--red);
  color: white;
}
.r {
  background:var(--blue);
  color: white;
}
</style>
