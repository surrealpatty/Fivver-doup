<template>
  <div>
    <h1>{{ title }}</h1>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'MyComponent',
  props: {
    title: {
      type: String,
      default: 'Default Title',
    },
  },
});
</script>

<style scoped>
h1 {
  font-size: 2rem;
  color: #333;
}
</style>
