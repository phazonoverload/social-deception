<template>
  <div>
    Admin game {{game.id}}
    <div class="w">
      <h2>Players</h2>
      <PlayerListing :players='players' />
    </div>
    <GameStateForm />
  </div>
</template>

<script>
import GameStateForm from '@/components/admin/GameStateForm';
import PlayerListing from '@/components/admin/PlayerListing';

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
    this.$store.dispatch('adminGetGame', this.game.id);
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
    }
  },
  components: {
    GameStateForm,
    PlayerListing
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