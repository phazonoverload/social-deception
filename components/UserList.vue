<template>
  <div id='players'>
    <h2>Game Players</h2>
    <table v-if='usersFull.length>0'>
      <tr>
        <th>Name</th>
        <th>Score</th>
        <th>Side</th>
        <th>Seat</th>
        <th>Voting Record</th>
      </tr>
      <tr v-for='user in usersFull' :key='user[".key"]'>
        <td>{{user.name}}</td>
        <td>{{user.score}}</td>
        <td>{{user.side}}</td>
        <td>{{user.seat}}</td>
        <td>{{user.votes}}</td>
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
        const userVotes = this.votes.filter(vote => {
          return vote.userId == user['.key']
        })
        .sort((a, b) => (a.round > b.round) ? 1 : -1)
        .map(e => `[${e.round}: ${e.vote.playerVote}]`).join(', ').toUpperCase();
        u.push({
          ...user,
          votes: userVotes
        })
      }
      return u;
    }
  },
  props: ['users', 'votes']
}
</script>

<style scoped>
#players {
  border: 2px solid var(--dark-alt);
  padding: 1em;
  margin-top: 1em;
}
</style>
