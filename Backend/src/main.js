import Vue from 'vue';
import App from './App.vue';
import { createApp } from 'vue';

createApp(App).mount('#app');

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
}).$mount('#app');
