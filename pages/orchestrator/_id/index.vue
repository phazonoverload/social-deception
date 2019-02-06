<template>
  <div>
    Admin game {{game_id}}
    <h2>Players</h2>
    <ul>
      <li v-for='player in players' :key='player.firebase_id'>
        {{ player.player_id }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      game_id: this.$route.params.id
    }
  },
  created() {
    this.$store.dispatch('adminGetGame', this.game_id);
  },
  computed: {
    players() {
      return this.$store.getters.adminGetPlayers;
    }
  }
}
</script>