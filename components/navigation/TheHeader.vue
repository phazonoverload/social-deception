<template>
  <header>
    <div class="container">
      <n-link to="/">Deceptr</n-link>
      <span @click="leaveGame" v-if='hasGame'>Leave game</span>
    </div>
  </header>
</template>

<script>
export default {
  methods: {
    async leaveGame() {
      await this.$store.dispatch('clearGame');
      await this.$store.dispatch('clearUser');
      localStorage.removeItem('game');
      localStorage.removeItem('user');
      this.$router.push('/')
    }
  },
  computed: {
    hasGame() {
      return this.$store.getters.hasGame;
    }
  }
}
</script>

<style scoped>
  header {
    background: var(--dark);
    color: white;
    padding: 0.75em 0;
    text-transform: uppercase;
    font-weight: bold;
    margin-bottom: 1.5em;
  }
  .container {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
  a {
    color: white;
    text-decoration: none;
  }
  span {
    cursor: pointer;
  }
</style>
