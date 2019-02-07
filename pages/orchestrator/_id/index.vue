<template>
  <div>
    Admin game {{game.id}}: {{firebaseId}}
    <div class="w">
      <h2>Players</h2>
      <p>Will turn this into a table showing moves</p>
      <ul>
        <li v-for='player in players' :key='player.firebase_id'>
          {{ player.player_id }}
        </li>
      </ul>
    </div>
    <GameStateForm />
  </div>
</template>

<script>
import GameStateForm from '@/components/admin/GameStateForm';

export default {
  data() {
    return {
      game: {
        id: this.$route.params.id
      }
    }
  },
  created() {
    this.$store.dispatch('adminGetGame', this.game.id);
  },
  computed: {
    players() {
      return this.$store.getters.adminGetPlayers;
    },
    firebaseId() {
      return this.$store.getters.adminGetGameId;
    }
  },
  components: {
    GameStateForm
  }
}
</script>

<style scoped>
.w {
  border: 1px solid lightgrey;
  margin-bottom: 1em;
  margin-top: 1em;
  padding: 1em;
}
</style>