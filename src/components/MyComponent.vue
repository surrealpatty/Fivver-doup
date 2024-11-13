<template>
  <div>
    <h1>{{ title }}</h1>
  </div>
</template>

<script>
export default {
  name: 'MyComponent', // Defines the name of the component
  props: {
    title: {
      type: String,
      default: 'Default Title', // Default title if no prop is passed
    },
  },
};
</script>

<style scoped>
/* Scoped styles specific to MyComponent */
h1 {
  font-size: 2rem;
  color: #333;
}
</style>
