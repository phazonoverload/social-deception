<template>
  <div>
    <h1>Game Single</h1>
    {{game}}
  </div>
</template>

<script>
import { db } from '~/plugins/firebase.js'

export default {
  data() {
    return {
      game: {}
    }
  },
  firestore() {
    return {
      game: db.collection('games').doc(this.$route.params.game)
    }
  },
}
</script>

<style scoped>
</style>
