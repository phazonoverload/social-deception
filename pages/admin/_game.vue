<template>
  <div>
    <h1>Admin Game Single</h1>
    <GameSettings :game='game' />
    <!-- <UserList :users='users' /> -->
  </div>
</template>

<script>
import { db } from '~/plugins/firebase.js'
import UserList from '~/components/UserList'
import GameSettings from '~/components/GameSettings'

export default {
  data() {
    return {
      game: {},
      users: []
    }
  },
  firestore() {
    return {
      game: db.collection('games').doc(this.$route.params.game),
      users: db.collection('users').where('game', '==', this.$route.params.game).orderBy('side', 'desc').orderBy('score', 'desc'),
    }
  },
  components: {
    UserList,
    GameSettings
  }
}
</script>

<style scoped>
</style>
