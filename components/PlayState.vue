<template>
  <div id='play'>
    <p>Talk to your partner. At the end of this round, you'll have to make a decision to wither cooperate with them or betray them.</p>
    <div class="fact">
      <p>Fact here</p>
    </div>
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
export default {

}
</script>

<style scoped>
p {
  margin-bottom: 1em;
}
.fact {
  background: var(--dark);
  color: white;
  padding: 1em 2em;
  text-align: center;
  margin-bottom: 1em;
}
.fact p {
  margin-bottom: 0;
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
