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
      polling: null,
      game: {
        id: this.$route.params.id
      }
    }
  },
  created: async function() {
    this.pollData();
  },
  methods: {
    // https://renatello.com/vue-js-polling-using-setinterval/
    pollData() {
      this.polling = setInterval(() => {
        this.$store.dispatch('adminGetPlayers', this.game.id);
      }, 5000)
    }
  },
  beforeDestroy() {
    clearInterval(this.polling);
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