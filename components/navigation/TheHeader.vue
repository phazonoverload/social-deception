<template>
  <header>
    <div class="container">
      <n-link to="/">Deceptr</n-link>
      <!-- <span @click="leaveGame" v-if='isInGame'>Leave game</span> -->
    </div>
  </header>
</template>

<script>
export default {
  methods: {
    // leaveGame() {
    //   this.$store.dispatch('clearGame').then(() => {
    //     this.$router.push('/')
    //   })
    // }
  },
  computed: {
    // isInGame() {
    //   return this.$store.getters.isInGame;
    // }
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
