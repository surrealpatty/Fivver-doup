import { createApp } from 'vue';
import App from './App.vue';
import router from './router/index.js'; // Ensure this file exists
import store from './store/index.js'; // Ensure this file exists

// Create the Vue application
const app = createApp(App);

// Use the router and store
app.use(router);
app.use(store);

// Mount the app to the DOM
app.mount('#app');
