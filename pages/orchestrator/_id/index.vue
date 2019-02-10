<template>
  <div id="g">
    <h1 class="title">Game Orchestrator</h1>
    <GameSettings id="settings" />
    <PlayerListing id="players" />
    <Calculator id='calculator' />
    <CurrentRound id='current-round' />
  </div>
</template>

<script>
import GameSettings from '@/components/admin/GameSettings';
import PlayerListing from '@/components/admin/PlayerListing';
import Calculator from '@/components/admin/Calculator';
import CurrentRound from '@/components/admin/CurrentRound';

export default {
  data() {
    return {
      polling: null,
      game: {
        id: this.$route.params.id
      }
    }
  },
  components: {
    GameSettings,
    PlayerListing,
    Calculator,
    CurrentRound
  }
}
</script>

<style scoped>
#g {
  display: grid;
  grid-gap: 1em;
  grid-template-columns: 2fr 1fr;
  grid-template-areas:
    'header header' 
    'settings players'
    'calculator calculator'
    'current-round current-round';
}

#settings {
  grid-area: settings;
}

#players {
  grid-area: players;
}

#calculator {
  grid-area: calculator
}

#current-round {
  grid-area: current-round;
}
</style>