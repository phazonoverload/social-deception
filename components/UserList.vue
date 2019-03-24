<template>
  <div>
    <h2>Game Players</h2>
    <table>
      <tr>
        <th>Name</th>
        <th>Score</th>
        <th>Side</th>
        <th>Voting Record</th>
      </tr>
      <tr v-for='user in this.users' :key='user[".key"]'>
        <td>{{user.name}}</td>
        <td>{{user.score}}</td>
        <td>{{user.side}}</td>
        <td>-</td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  props: ['users']
}
</script>