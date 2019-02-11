<template>
  <div id='tracker'>
    <h2>Movement Tracker</h2>
    <div class="list">
      <table>
      <tbody>
        <tr>
          <td>Name</td>
          <td>Current Position</td>
          <td>Latest Round Accounted</td>
          <td>Score</td>
        </tr>
        <tr v-for='user in users' :key="user['.key']">
          <td>{{user.name}}</td>
          <td>{{user.side}}: {{user.current}}</td>
          <td>{{Object.keys(user.scores).length - 1}}</td>
          <td>{{user.score}}</td>
        </tr>
      </tbody>
    </table>
    </div>
  </div>
</template>

<script>
import { db } from '~/plugins/firebase.js'

export default {
  data() {
    return {
      users: {},
    }
  },
  firestore() {
    return {
      users: db.collection('users').where('game', '==', this.$route.params.id).orderBy('side', 'desc').orderBy('score', 'desc'),
    }
  }
}
</script>

<style scoped>
#tracker {
  border: 2px solid slategrey;
  padding: 1em;
}
h2 {
  margin-bottom: 1.5rem;
}
.lists {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 2em;
}
table {
  width: 100%;
  border-collapse: collapse;
}
tr:first-child {
  font-weight: bold
}
table td {
  border-collapse: collapse;
  border: 1px solid lightgrey;
  padding: 0.5em;
  text-transform: uppercase;
}
</style>