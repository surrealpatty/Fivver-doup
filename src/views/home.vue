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
      // Reactive data property for the welcome message
      welcomeMessage: 'This is your go-to place for the latest updates!',
    };
  },
  methods: {
    // Method to trigger a greeting message
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
  max-width: 600px;
  margin: 0 auto;
  text-align: center;
}

h1 {
  color: #333;
  font-size: 2rem;
}

p {
  font-size: 1.2rem;
  color: #666;
  margin: 10px 0;
}

button {
  padding: 10px 15px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #0056b3;
}

/* Make it responsive */
@media (max-width: 600px) {
  .home {
    padding: 15px;
  }

  h1 {
    font-size: 1.5rem;
  }

  p {
    font-size: 1rem;
  }

  button {
    width: 100%;
  }
}
</style>
