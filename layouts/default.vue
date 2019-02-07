<template>
  <div>
    <TheHeader />
    <div class="container">
      <nuxt />
    </div>
  </div>
</template>

<script>
import TheHeader from '@/components/navigation/TheHeader';

export default {
  components: {
    TheHeader
  }  
}
</script>

<style>
:root {
  --dark: #100e17;
}

html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}

.container {
  max-width: 960px;
  margin: 0 auto;
  padding: 0 1em;
  line-height: 1.5;
}

.instruction {
  font-size: 1.25em;
  color: slategray;
  margin-top: 1em;
  margin-bottom: 1em;
  padding-bottom: 2em;
  border-bottom: 1px solid #ccc;
}

input,
select,
button {
  width: 100%;
  display: block;
  border: 1px solid slategrey;
  font-size: 1em;
  padding: 0.5em;
  margin-bottom: 1em;
  border-radius: 0;
  -webkit-appearance: none;
}
input[type="submit"],
button {
  background: slategray;
  color: white;
}

label {
  text-transform: uppercase;
  font-weight: bold;
  font-size: 0.8em;
  text-align: left;
  display: block;
}
</style>
