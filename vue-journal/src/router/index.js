import { createWebHashHistory, createRouter } from 'vue-router';
import Home from '../views/Home.vue';
import dayBookRouter from '../modules/daybook/router';

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/daybook',
    ...dayBookRouter,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
