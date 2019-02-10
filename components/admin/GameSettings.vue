<template>
  <div id="settings">
    <h2>Game Settings</h2>
    <form @submit.prevent="submitForm">
      <label for="game-name">Game name</label>
      <input type="text" v-model="formData.name" id="game-name">
      <label for="game-seats">Seats per side</label>
      <input type="number" v-model="formData.seats" id="game-seats">
      <label for="game-round">Game round</label>
      <input type="number" v-model="formData.state.round" id="game-round">
      <label for="game-phase">Game phase</label>
      <div class="radio">
        <input type="radio" value="play" id="play" v-model="formData.state.phase">
        <label for="play">Play</label>
      </div>
      <div class="radio">
        <input type="radio" value="vote" id="vote" v-model="formData.state.phase">
        <label for="vote">Vote</label>
      </div>
      <div class="radio">
        <input type="radio" value="calculate" id="calculate" v-model="formData.state.phase">
        <label for="calculate">Calculate</label>
      </div>
      <div class="radio">
        <input type="radio" value="reveal" id="reveal" v-model="formData.state.phase">
        <label for="reveal">Reveal</label>
      </div>
      <input type="submit">
    </form>
  </div>
</template>

<script>
import { db } from '~/plugins/firebase.js'

export default {
  data() {
    return {
      formData: {
        state: {}
      },
      game: {}
    }
  },
  firestore() {
    return { 
      game: {
        ref: db.collection('games').doc(this.$route.params.id),
        resolve: data => { this.formData = data }
      },
    }
  },
  methods: {
    submitForm() {
      this.$firestore.game.update({ 
        name: this.formData.name,
        seats: parseInt(this.formData.seats),
        state: {
          round: parseInt(this.formData.state.round),
          phase: this.formData.state.phase
        }  
      }).then(() => {
        this.$toast.success('Game updated')
      });
    }
  }
}
</script>

<style scoped>
#settings {
  border: 2px solid slategrey;
  padding: 1em;
}
h2 {
  margin-bottom: 1.5rem;
}
input[type="submit"] {
  margin-top: 1.5em;
  margin-bottom: 0;
}
</style>
