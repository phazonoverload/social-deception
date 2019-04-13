<template>
  <div id='play'>
    <p>Talk to your partner. At the end of this round, you'll have to make a decision to either cooperate with them or betray them.</p>
    <FactGenerator :game='game' :users='users' :user='user' :votes='votes' v-if='game.facts' />
    <div class="rules">
      <h2>Resolving votes</h2>
      <ul>
        <li>Both cooperate: +1 point each.</li>
        <li>Both defect: -1 point each.</li>
        <li>Different votes:
          <ul>
            <li>Defector gets +2</li>
            <li>Cooperator gets -2</li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import FactGenerator from '@/components/FactGenerator'

export default {
  props: ['game', 'users', 'user', 'votes'],
  components: {
    FactGenerator
  }
}
</script>

<style scoped>
p {
  margin-bottom: 1em;
}
.rules {
  background: var(--light);
  padding: 1em;
}
.rules li {
  margin-top: 0.5em;
  margin-left: 1.25em;
}
</style>
