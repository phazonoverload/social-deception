<template>
  <div id='export'>
    <div class="game">
      <h3 @click='showGame = !showGame'>Toggle Game</h3>
      <pre v-if='showGame'>{{JSON.stringify(game, null, 2)}}</pre>
    </div>
    <div class="users">
      <h3 @click='showUsers = !showUsers'>Toggle Users</h3>
      <pre v-if='showUsers'>{{JSON.stringify(users, null, 2)}}</pre>
      <vue-json-to-csv :json-data="flatten(users)" :csv-title="'axelrod-users-' + this.unix()" >
        <button>Download Users as CSV</button> 
      </vue-json-to-csv>
    </div>
    <div class="votes">
      <h3 @click='showVotes = !showVotes'>Toggle Votes</h3>
      <pre v-if='showVotes'>{{JSON.stringify(votes, null, 2)}}</pre>
      <vue-json-to-csv :json-data="flatten(votes)" :csv-title="'axelrod-votes-' + this.unix()" >
        <button>Download Votes as CSV</button> 
      </vue-json-to-csv>
    </div>
  </div>
</template>

<script>
import VueJsonToCsv from 'vue-json-to-csv'

export default {
  data() {
    return {
      showGame: false,
      showUsers: false,
      showVotes: false
    }
  },
  methods: {
    unix() {
      return Math.round((new Date()).getTime() / 1000);
    },
    flatten(ob) {
      return ob.map(o => {
        return this.flattenSingle(o)
      })
    },
    flattenSingle(obj, prefix = '') {
      // https://www.w3resource.com/javascript-exercises/fundamental/javascript-fundamental-exercise-233.php
      return Object.keys(obj).reduce((acc, k) => {
        const pre = prefix.length ? prefix + '.' : '';
        if (typeof obj[k] === 'object') Object.assign(acc, this.flattenSingle(obj[k], pre + k));
        else acc[pre + k] = obj[k];
        return acc;
      }, {});
    }
  },
  props: ['game', 'users', 'votes'],
  components: {
    VueJsonToCsv
  }
}
</script>

<style scoped>
#export {
  border: 2px solid var(--dark-alt);
  padding: 1em;
  margin-top: 1em;
}
h3 {
  cursor: pointer;
  background: var(--dark-alt);
  text-align: center;
  padding: 0.5em;
  font-size: 1em;
}
pre {
  padding: 1em;
  border: 2px solid var(--dark-alt)
}
button {
  background: var(--dark-alt);
  font-size: 1em;
} 
#export > div:not(:last-child) {
  margin-bottom: 1em;
}
</style>