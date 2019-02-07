<template lang="">
  <div>
    GAME PAGE for game {{game_id}}
    <!-- Submission form here -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      game_id: this.$route.params.id,
      move: {}
    }
  },
  created() {
    // GET CURRENT GAME STATE
  },
  methods: {
    // Submit method
  }
}
</script>