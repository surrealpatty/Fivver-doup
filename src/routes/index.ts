import { createRouter, createWebHistory } from 'vue-router';
import EditService from '../components/EditService.vue'; // Make sure this points to the correct component

const routes = [
  // Other routes...
  {
    path: '/services/:id/edit',
    name: 'EditService',
    component: EditService,
    props: true,  // This allows you to pass the `id` parameter to the component
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
