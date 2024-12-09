<template>
  <div class="edit-service">
    <h1>Edit Service</h1>
    <form @submit.prevent="saveService">
      <label for="title">Title:</label>
      <input v-model="service.title" id="title" type="text" />
      
      <label for="description">Description:</label>
      <textarea v-model="service.description" id="description"></textarea>
      
      <label for="price">Price:</label>
      <input v-model="service.price" id="price" type="number" />
      
      <button type="submit">Save Changes</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      service: {},
    };
  },
  mounted() {
    this.fetchService();
  },
  methods: {
    async fetchService() {
      const response = await fetch(`/services/${this.$route.params.id}`);
      const data = await response.json();
      this.service = data;
    },
    async saveService() {
      const response = await fetch(`/services/${this.$route.params.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(this.service),
      });
      const data = await response.json();
      alert('Service updated');
    },
  },
};
</script>
