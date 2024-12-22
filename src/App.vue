<template>
  <div id="app">
    <h1>Welcome to Fivver Doup!</h1>
    <ExampleComponent /> <!-- Using the ExampleComponent -->
  </div>
</template>

<script lang="ts">

import ExampleComponent from './components/ExampleComponent.vue'; // Correctly import ExampleComponent


</script>

<style scoped>
#app {
  text-align: center;
  padding: 20px;
}

h1 {
  color: #42b983;
  font-family: 'Arial', sans-serif;
  font-size: 2.5rem;
  font-weight: bold;
  margin-top: 20px;
}
</style>
