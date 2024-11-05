// src/router/index.js

import { createRouter, createWebHistory } from 'vue-router';

// Use dynamic imports for better performance
const Home = () => import('../views/Home.vue');
const About = () => import('../views/About.vue');

// Define routes
const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/about', name: 'About', component: About },
  // Catch-all route for 404 error handling
  {
    path: '/:catchAll(.*)',
    name: 'NotFound',
    component: () => import('../views/NotFound.vue'), // Ensure you have a NotFound.vue component
  },
];

// Create router instance
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

// Export the router
export default router;
