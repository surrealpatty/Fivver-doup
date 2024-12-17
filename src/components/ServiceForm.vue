<template>
    <form @submit.prevent="createService">
      <div>
        <label for="title">Service Title</label>
        <input type="text" v-model="service.title" id="title" required />
      </div>
      <div>
        <label for="description">Service Description</label>
        <textarea v-model="service.description" id="description" required></textarea>
      </div>
      <div>
        <label for="price">Price</label>
        <input type="number" v-model="service.price" id="price" required />
      </div>
      <button type="submit">Create Service</button>
    </form>
  </template>
  
  <script lang="ts">
  import { ref } from 'vue';
  import axios from 'axios';
  
  export default {
    name: 'ServiceForm',
    setup() {
      const service = ref({
        title: '',
        description: '',
        price: 0,
      });
  
      const createService = async () => {
        try {
          const response = await axios.post('/api/services/create', service.value);
          console.log('Service created:', response.data);
        } catch (error) {
          console.error('Error creating service:', error);
        }
      };
  
      return {
        service,
        createService,
      };
    },
  };
  </script>
  