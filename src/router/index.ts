import { createRouter, createWebHistory } from 'vue-router';
import staticRoutes from './sync';

const router = createRouter({
  routes: [...staticRoutes],
  history: createWebHistory(import.meta.env.VITE_APP_BASE),
});

export default router;
