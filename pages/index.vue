<template>
  <div>
    <h1 class="title">Welcome.</h1>
    <div class="instruction">
      Let's get you in the game!
    </div>
    <form @submit.prevent="enterLobby">
      <label for="game">Game ID</label>
      <input type="text" id="game" v-model="game.game_id" required>
      <label for="player">Player ID</label>
      <input type="text" id="player" v-model="game.player_id" required>
      <input type="submit" value="Submit">
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      game: {
        game_id: null,
        player_id: null
      }
    }
  },
  created() {
  },
  methods: {
    enterLobby() {
      // this.game.game_id = this.game.game_id.replace(/\s+/g, '').toUpperCase();
      // this.$store.dispatch('addUserToGame', this.game).then(() => {
      //   this.$router.push(`/game/${this.game.game_id}`);
      // })
    }
  },
  computed: {
    // isInGame() {
    //   return this.$store.getters.isInGame
    // }
  }
}
</script>