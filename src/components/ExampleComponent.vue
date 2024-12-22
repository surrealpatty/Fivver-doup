<template>
    <div>
      <p>This is an example component!</p>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  
  export default defineComponent({
    name: 'ExampleComponent',
  });
  </script>
  
  <style scoped>
  p {
    color: #333;
    font-size: 1rem;
  }
  </style>
  