import Vue from 'vue';
import { createApp } from 'vue';
import App from './App.vue';
import router from './router/index.js'; // Ensure you create this file
import store from './store/index.js'; // Ensure you create this file

createApp(App).use(router).use(store).mount('#app');

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
}).$mount('#app');
