<template>
    <div>
      <h2>Services</h2>
      <div v-for="service in services" :key="service.id">
        <h3>{{ service.title }}</h3>
        <p>{{ service.description }}</p>
        <p>${{ service.price }}</p>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { ref, onMounted } from 'vue';  // Correctly import `ref` and `onMounted`
  import axios from 'axios';
  
  export default {
    name: 'ServiceList',
    setup() {
      const services = ref<any[]>([]);  // Type the services array
  
      const fetchServices = async () => {
        try {
          const response = await axios.get('/api/services');
          services.value = response.data;
        } catch (error) {
          console.error('Error fetching services:', error);
        }
      };
  
      onMounted(() => {
        fetchServices();
      });
  
      return {
        services,
      };
    },
  };
  </script>
  