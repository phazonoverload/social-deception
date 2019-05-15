<template>
  <div id='setup'>
    <p>You're in the game. The game master will start the game once everyone has entered the lobby</p>
    <h2>Currently in lobby</h2>
    <ul>
      <!-- Just show live updating list of users -->
      <li v-for='user in users' :key='user[".key"]'>
        {{user.name}}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: ['users']
}
</script>

<style scoped>
h2 {
  margin: 1em 0 0.5em;
}
li {
  margin-top: 0.5em;
  margin-left: 1.25em;
}
</style>
