import { createWebHashHistory, createRouter, RouteRecordRaw } from 'vue-router';
import dayBookRouter from '../modules/daybook/router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/Home.vue'),
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
