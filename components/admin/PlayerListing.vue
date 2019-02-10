<template>
  <table>
    <tbody>
      <tr v-for='player in players' :key='player.firebase_id'>
        <td>{{player.player_id}}</td>
        <td v-for='move in player.moves' :key='move.pos + move.voteWhy'>
          <span class='pos'>{{move.pos}}</span>
          <span class='vote'>{{move.vote}}</span>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  props: ['players']
}
</script>

<style scoped>
table {
  border: solid 1px lightgrey;
  border-collapse: collapse;
  border-spacing: 0;
  font: normal 13px Arial, sans-serif;
  margin-top: 1em;
  font-family: monospace;
}
table tbody td {
  border: solid 1px lightgrey;
  padding: 0.75em;
}
.pos {
  color: grey;
}
.vote {
  background: black;
  color: white;
  padding: 0.25em 0.5em;
}
</style>
