// src/router/index.ts
import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../views/HomePage.vue';  // Make sure this path is correct
import UserProfile from '../views/UserProfile.vue';  // Make sure this path is correct
import EditService from '../components/EditService.vue';  // Make sure this path is correct
import { Request } from 'express';
const routes = [
  // Home page route
  { path: '/', component: HomePage },

  // User profile route
  { path: '/profile', component: UserProfile },

  // Edit service route, expects a service id as a parameter
  {
    path: '/services/:id/edit',
    name: 'EditService',
    component: EditService,
    props: true,  // This will pass the `id` parameter as a prop to EditService component
  },
];


// Create the router instance with history mode and routes
const router = createRouter({
  history: createWebHistory(),  // This uses HTML5 history mode
  routes,
});

export default router;
