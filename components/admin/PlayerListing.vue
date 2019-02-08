<template>
  <table>
    <tbody>
      <tr v-for='player in players' :key='player.firebase_id'>
        <td>{{player.player_id}}</td>
        <td v-for='move in player.moves' :key='move.pos'>{{move.vote}}</td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  props: ['players'],
  computed: {
    playerList() {
      // let list = Object.entries(this.players).map(player => { 
      //   // let moves = Object.entries(player[1].moves).map(item => { return { firebase_id: item[0], ...item[1] } })
      //   return { 
      //     id: player[1].player_id, 
      //     moves: {
      //       ...player[1].moves
      //     }
      //   } 
      // });
      // return list;

      // let players = Object.entries(data).map(item => { return { firebase_id: item[0], ...item[1] } });
      // players = players.filter(item => { return item.game_id == gameId })
    }
  }
}
</script>

<style scoped>
table {
    border: solid 1px lightgrey;
    border-collapse: collapse;
    border-spacing: 0;
    font: normal 13px Arial, sans-serif;
    margin-top: 1em;
}
table tbody td {
    border: solid 1px lightgrey;
    padding: 0.75em;
}
</style>
