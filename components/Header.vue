<template>
  <header>
    <n-link to='/' class='brand'>Axelrod</n-link>
  </header>
</template>

<style scoped>
header {
  background: var(--dark-alt);
  color: white;
  padding: 0.5em;
}
header * {
  color: white;
}
.brand {
  text-transform: uppercase;
  font-weight: bold;
  text-decoration: none;
}
</style>
