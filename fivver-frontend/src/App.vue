<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p>Welcome to your Vue.js application!</p>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld', // Add semicolon here
  props: {
    msg: String,
  }, // Add semicolon here
}; // Add semicolon here
</script>

<style scoped>
h1 {
  color: #42b983;
}
</style>
