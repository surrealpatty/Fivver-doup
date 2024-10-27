// Import Vue and the root App component
import Vue from 'vue';
import App from './App.vue';

// Disable production tips for Vue
Vue.config.productionTip = false;

// Create a new Vue instance
new Vue({
  // Render the App component
  render: h => h(App),
}).$mount('#app'); // Mount the instance to the DOM element with id "app"
