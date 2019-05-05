<template>
  <div id='facts'>
    <h2>Toggle facts</h2>
    <table v-if='users.length>0'>
      <tr>
        <th>Name</th>
        <th>Current</th>
        <th>Toggle Facts</th>
        <th>Type of Fact</th>
      </tr>
      <tr v-for='user in users' :key='user[".key"]'>
        <td>{{user.name}}</td>
        <td>
          <span v-if='user.facts'>Facts shown</span>
          <span v-else>Facts hidden</span>, 
          <span v-if='user.factType'>{{user.factType}}</span>
          <span v-else>No fact type</span>
        </td>
        <td class='toggle-facts'>
          <button @click="facts(user['.key'], true)">Show</button>
          <button @click="facts(user['.key'], false)">Hide</button>
        </td>
        <td>
          <select @change="factType($event, user['.key'])">
            <option>Please choose a fact type</option>
            <option v-for='fact in factTypes' :key='fact.value' :value="fact.value">{{fact.label}}</option>
          </select>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import { db } from '~/plugins/firebase.js'
export default {
  data() {
    return {
      factTypes: [
        { label: 'Voting Record of Opponent', value: 'opponent-voting-record' },
        { label: 'Percentage Breakdown of Opponent', value: 'opponent-percentage-breakdown' },
        { label: 'Opponent Score', value: 'opponent-score' },
        { label: 'Score of One Seat Down', value: 'one-seat-down-score' },
        { label: 'Last 3 Turns of Opponent', value: 'opponent-last-three' },
        { label: 'Opponent Seat History', value: 'opponent-seat-history' },
      ]
    }
  },
  methods: {
    facts(user, bool) {
      db.collection('users').doc(user).update({
        facts: bool
      }).then(() => {
        this.$toast.success('Updated successfully')
      })
    },
    factType(event, user) {
      db.collection('users').doc(user).update({
        factType: event.target.value
      }).then(() => {
        this.$toast.success('Updated successfully')
      })
    }
  },
  props: ['users', 'usersCollection', 'fire']
}
</script>

<style scoped>
#facts {
  border: 2px solid var(--dark-alt);
  padding: 1em;
  margin-top: 1em;
}
.toggle-facts {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 0.5em;
}
select {
  font-size: 1em;
  color: black;
  padding: 1em;
}
</style>