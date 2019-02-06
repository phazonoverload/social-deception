<template>
  <div id="orchestrator">
    <form @submit.prevent="enterGameLobby">
      <label for="game_id">Game ID</label>
      <input type="text" v-model="game_id" id="game_id">
      <input type="submit" value="Submit">
    </form>
  </div>
</template>

<script>
export default { 
  data() {
    return {
      game_id: ''
    }
  },
  methods: {
    enterGameLobby() {
      this.$store.dispatch('adminGetGame', this.game_id).then(() => {
        this.$router.push('/orchestrator/' + this.game_id);
      })
    }
  }
}
</script>
