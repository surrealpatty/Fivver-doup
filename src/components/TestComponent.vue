<!-- src/components/TestComponent.vue -->
<template>
    <div>Hello, Vue 3!</div>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue'; // Importing defineComponent from Vue
  
  export default defineComponent({
    name: 'TestComponent',
    setup() {
      return {};
    },
  });
  </script>
  