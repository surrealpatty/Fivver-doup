<template>
  <div>
    <h1>{{ title }}</h1>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

export default defineComponent({
  name: 'MyComponent', // Defines the name of the component
  props: {
    title: {
      type: String as PropType<string>, // Type the prop with PropType for type safety
      default: 'Default Title', // Default title if no prop is passed
    },
  },
});
</script>

<style scoped>
/* Scoped styles specific to MyComponent */
h1 {
  font-size: 2rem;
  color: #333;
}
</style>
