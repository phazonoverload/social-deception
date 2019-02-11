<template>
  <div id="g">
    <h1 class="title">Game Orchestrator</h1>
    <GameSettings id="settings" />
    <Calculator id='calculator' />
    <CurrentRound id='current-round' />
    <MovementTracker id='tracker' />
  </div>
</template>

<script>
import GameSettings from '@/components/admin/GameSettings';
import Calculator from '@/components/admin/Calculator';
import CurrentRound from '@/components/admin/CurrentRound';
import MovementTracker from '@/components/admin/MovementTracker';

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
    Calculator,
    CurrentRound,
    MovementTracker
  }
}
</script>

<style scoped>
#settings {
  grid-area: settings;
  margin-bottom: 2em;
}

#players {
  grid-area: players;
  margin-bottom: 2em;
}

#calculator {
  grid-area: calculator;
  margin-bottom: 2em;
}

#current-round {
  grid-area: current-round;
  margin-bottom: 2em;
}

#tracker {
  grid-area: tracker;
  margin-bottom: 2em;
}
</style>