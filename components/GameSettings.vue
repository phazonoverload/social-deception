<template>
  <div id='settings'>
    <h2>Game Settings</h2>
    <form @submit.prevent='submitForm'>
      <div class="input-group">
        <label for="game-name">Name</label>
        <input type="text" v-model="form.name" id="game-name">
      </div>
      <div class="input-group">
        <label for="game-seats">Seats per side</label>
        <input type="text" v-model="form.seats" id="game-seats">
      </div>
      <div class="input-group">
        <label for="game-round">Current round</label>
        <input type="text" v-model="form.state.round" id="game-round">
      </div>
      <div class="input-group">
        <label for="game-phase">Game phase</label>
        <div class="radio">
          <input type="radio" value="play" id="play" v-model="form.state.phase">
          <label for="play">Play</label>
        </div>
        <div class="radio">
          <input type="radio" value="vote" id="vote" v-model="form.state.phase">
          <label for="vote">Vote</label>
        </div>
        <div class="radio">
          <input type="radio" value="calculate" id="calculate" v-model="form.state.phase">
          <label for="calculate">Calculate</label>
        </div>
        <div class="radio">
          <input type="radio" value="reveal" id="reveal" v-model="form.state.phase">
          <label for="reveal">Reveal</label>
        </div>
      </div>
      <!-- <div class="input-group">
        <label for="show-facts">Show Facts</label>
        <div class="radio">
          <input type="radio" value="true" id="true" v-model="form.facts">
          <label for="true">Yes</label>
        </div>
        <div class="radio">
          <input type="radio" value="false" id="false" v-model="form.facts">
          <label for="false">No</label>
        </div>
      </div> -->
      <input type="submit" value='Update Game'>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: this.game
    }
  },
  methods: {
    submitForm() {
      this.fire.game.update({ 
        name: this.form.name,
        seats: parseInt(this.form.seats),
        // facts: JSON.parse(this.form.facts),
        state: {
          round: parseInt(this.form.state.round),
          phase: this.form.state.phase
        }  
      }).then(() => {
        this.$toast.success('Updated successfully')
      });
    }
  },
  props: ['game', 'fire']
}
</script>

<style scoped>
.split {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 2em;
}
</style>
