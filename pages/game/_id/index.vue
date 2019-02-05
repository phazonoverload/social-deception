<template lang="">
  <div>
    GAME PAGE for game {{game_id}}
  </div>
</template>

<script>
export default {
  data() {
    return {
      game_id: this.$route.params.id
    }
  }
}
</script>