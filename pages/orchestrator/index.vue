<template>
  <div id="orchestrator">
    <form @submit.prevent="enterGameLobby">
      <label for="game_id">Enter game</label>
      <input type="text" v-model="game_id" id="game_id">
      <input type="submit" value="Submit">
    </form>
    <button @click="seedData">Seed data structure</button>
  </div>
</template>

<script>
export default { 
  data() {
    return {
      game_id: '',
    }
  },
  methods: {
    enterGameLobby() {
      this.$router.push('/orchestrator/' + this.game_id);
    },
    seedData() {
      this.$axios.$post(this.$store.state.baseUrl + '/users.json', {
        game_id: 1,
        player_id: 1
      }).then(() => {
        this.$axios.$post(this.$store.state.baseUrl + '/games.json', {
          game_id: 1
        })
      }).catch(e => console.log(e))
    }
  }
}
</script>
