<template>
  <div class="not-found">
    <h1>404 - Page Not Found</h1>
    <p>The page you are looking for does not exist.</p>
    <router-link to="/" class="go-home">Go back to Home</router-link>
  </div>
</template>

<script>
export default {
  name: 'NotFound',
};
</script>

<style scoped>
.not-found {
  text-align: center;
  margin-top: 100px;
  font-family: Arial, sans-serif;
}

h1 {
  font-size: 3rem;
  color: #ff6347; /* Tomato color for emphasis */
  margin-bottom: 20px;
}

p {
  font-size: 1.2rem;
  color: #555;
  margin-bottom: 30px;
}

.go-home {
  font-size: 1.1rem;
  text-decoration: none;
  color: #007bff;
  border: 2px solid #007bff;
  padding: 10px 20px;
  border-radius: 5px;
  transition: all 0.3s ease;
}

.go-home:hover {
  background-color: #007bff;
  color: white;
}

/* Responsive styling */
@media (max-width: 600px) {
  .not-found {
    margin-top: 50px;
  }

  h1 {
    font-size: 2.5rem;
  }

  p {
    font-size: 1rem;
  }

  .go-home {
    font-size: 1rem;
    padding: 8px 15px;
  }
}
</style>
