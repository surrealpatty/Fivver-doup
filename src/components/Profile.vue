<template>
    <div class="profile">
      <h1>User Profile</h1>
      <form @submit.prevent="updateProfile">
        <label for="username">Username:</label>
        <input v-model="user.username" id="username" type="text" />
        
        <label for="email">Email:</label>
        <input v-model="user.email" id="email" type="email" />
        
        <button type="submit">Update Profile</button>
      </form>
  
      <h2>Your Services</h2>
      <div v-for="service in services" :key="service.id">
        <p>{{ service.title }}</p>
        <button @click="editService(service.id)">Edit</button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        user: {},
        services: [],
      };
    },
    mounted() {
      this.fetchProfile();
    },
    methods: {
      async fetchProfile() {
        const response = await fetch('/profile', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`, // Add JWT token for authentication
          },
        });
        const data = await response.json();
        this.user = data.user;
        this.services = data.services;
      },
      async updateProfile() {
        const response = await fetch('/profile', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
          body: JSON.stringify(this.user),
        });
        const data = await response.json();
        alert('Profile updated');
      },
      editService(serviceId) {
        this.$router.push(`/services/edit/${serviceId}`);
      },
    },
  };
  </script>
  
  <style scoped>
  /* Add styling as needed */
  </style>
  