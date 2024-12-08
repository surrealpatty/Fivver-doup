<template>
  <div id="app">
    <h1>Welcome to Fivver Doup!</h1>
    <ExampleComponent /> <!-- Using the ExampleComponent -->
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ExampleComponent from './components/ExampleComponent.vue'; // Import ExampleComponent

export default defineComponent({
  name: 'App',
  components: {
    ExampleComponent, // Register ExampleComponent in the components section
  },
});
</script>

<style scoped>
#app {
  text-align: center;
  padding: 20px;
}

h1 {
  color: #42b983;
  font-family: 'Arial', sans-serif; /* Adding font for better text style */
  font-size: 2.5rem; /* Adjusting font size */
  font-weight: bold;
  margin-top: 20px;
}
</style>
