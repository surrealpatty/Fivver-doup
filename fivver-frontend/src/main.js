// Import Vue and the root App component
import { createApp } from 'vue'; // Import createApp from Vue 3
import App from './App.vue';

// Create a new Vue application instance
const app = createApp(App);

// Mount the application to the DOM element with the ID "app"
app.mount('#app');
