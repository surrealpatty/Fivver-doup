<template>
  <div>
    <h1>{{ message }}</h1>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import axios from 'axios';

export default defineComponent({
  name: 'ExampleComponent',
  setup() {
    const message = ref('');

    // Fetch data from the backend on component mount
    onMounted(async () => {
      try {
        // Adjusted URL to ensure it's accessible from the frontend
        const response = await axios.get('http://localhost:3000/api/users');
        
        // Assuming the backend returns an object with a 'message' property
        message.value = response.data.message || 'No message received';
      } catch (error) {
        console.error('Error fetching data:', error);
        message.value = 'Failed to fetch data';  // Display an error message
      }
    });

    return { message };
  },
});
</script>

<style scoped>
/* Optional CSS styling for your component */
</style>
