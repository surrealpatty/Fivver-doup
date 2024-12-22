<!-- src/views/UserProfile.vue -->
<template>
  <div>
    <h2>User Profile</h2>
    <p>Welcome, {{ username }}</p>
    <button @click="logout">Logout</button>
  </div>
</template>

<script lang="ts">
import { defineComponent }  from 'vue';
import { useRouter } from 'vue-router'; // Import vue-router's useRouter

export default defineComponent({
  name: 'UserProfile',
  setup() {
    const router = useRouter(); // Get router instance

    return {
      username: 'John Doe', // This should come from the backend
      logout() {
        localStorage.removeItem('token'); // Remove token on logout
        router.push('/'); // Redirect to home page using `useRouter` hook
      },
    };
  },
});
</script>
