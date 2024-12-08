<!-- src/views/UserProfile.vue -->
<template>
    <div>
      <h2>User Profile</h2>
      <p>Welcome, {{ username }}</p>
      <button @click="logout">Logout</button>
    </div>
  </template>
  
  <script lang="ts">
  export default {
    name: 'UserProfile',
    data() {
      return {
        username: 'John Doe', // This should come from the backend
      };
    },
    methods: {
      logout() {
        localStorage.removeItem('token'); // Remove token on logout
        this.$router.push('/'); // Redirect to home page
      },
    },
  };
  </script>
  