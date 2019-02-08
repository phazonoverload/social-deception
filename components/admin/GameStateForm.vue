<template>
  <div class="w">
    <h2>Change game state</h2>
    <div class="split-rounds">
      <form @submit.prevent="changeGameState">
        <label for="game-round">Game Round</label>
        <input type="number" id="game-round" v-model="newGameState.round" required>
        <label for="game-phase">Game Phase</label>
        <select id="game-phase" v-model="newGameState.phase" required>
          <option>play</option>
          <option>vote</option>
        </select>
        <input type="submit" value="Update">
      </form>
      <div class="current">
        <div v-if="gameState">
          <p>Current round: {{gameState.round}}</p>
          <p>Current phase: {{gameState.phase}}</p>
        </div>
        <div v-else>
          Game hasn't begun yet
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newGameState: {}
    }
  },
  methods: {
    changeGameState() {
      this.$store.dispatch('adminSetGameState', this.newGameState)
    }
  },
  computed: {
    gameState() {
      return this.$store.getters.adminGameState;
    }
  }
}
</script>

<style scoped>
.split-rounds {
  display: grid;
  grid-template-columns: 3fr 1fr;
  grid-gap: 2em;
  margin-top: 1em;
}
.split-rounds .current {
  margin-top: 1em;
}
</style>
