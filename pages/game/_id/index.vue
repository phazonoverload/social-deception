<template lang="">
  <div>
    <ul>
      <li>Game ID: {{game.game_id}}</li>
      <li>Game firebase ID: {{game.firebase_id}}</li>
      <li v-if="game.state">State: Round {{game.state.round}}: {{game.state.phase}}</li>
      <li>Your player ID: {{player.player_id}}</li>
      <li>Your player firebase ID: {{player.firebase_user_id}}</li>
    </ul>
    <!-- Submission form here -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      move: {},
      polling: null
    }
  },
  created: async function() {
    this.pollData();
  },
  methods: {
    // https://renatello.com/vue-js-polling-using-setinterval/
    pollData() {
      this.polling = setInterval(() => {
        this.$store.dispatch('getGame', this.$route.params.id)
      }, 5000)
    }
  },
  beforeDestroy() {
    clearInterval(this.polling);
  },
  computed: {
    game() {
      return this.$store.getters.getGame;
    },
    player() {
      return this.$store.getters.getUser;
    }
  }
}
</script>