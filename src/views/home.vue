<template>
  <div class="home">
    <h1>Welcome to the Home Page</h1>
    <p>{{ welcomeMessage }}</p>
    <button @click="greet">Click Me</button>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      // Reactive data property
      welcomeMessage: 'This is your go-to place for the latest updates!',
    };
  },
  methods: {
    // Method to display a greeting
    greet() {
      alert('Hello! Welcome to the home page!');
    },
  },
};
</script>

<style scoped>
.home {
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

h1 {
  color: #333;
}

button {
  padding: 10px 15px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}
</style>
