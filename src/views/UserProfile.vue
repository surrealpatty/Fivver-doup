<template>
  <div>
    <h2>User Profile</h2>
    <p>Welcome, {{ username }}</p>
    <button @click="logout">Logout</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'; // Import defineComponent from Vue
import { useRouter } from 'vue-router'; // Import useRouter from vue-router

export default defineComponent({
  name: 'UserProfile',
  setup() {
    const router = useRouter(); // Get the router instance

    const username = 'John Doe'; // Placeholder, should come from backend

    const logout = () => {
      localStorage.removeItem('token'); // Remove token on logout
      router.push('/'); // Redirect to home page using router.push
    };

    return { username, logout };
  },
});
</script>
