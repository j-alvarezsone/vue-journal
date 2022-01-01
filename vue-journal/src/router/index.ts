import { createWebHashHistory, createRouter, RouteRecordRaw } from "vue-router";
import dayBookRouter from "../modules/daybook/router";
import authRouter from "../modules/auth/router";
import { isAuthenticatedGuard } from "../modules/auth/router/auth-guard";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "home",
    component: () => import("../views/Home.vue"),
  },
  {
    path: "/auth",
    ...authRouter,
  },
  {
    path: "/daybook",
    beforeEnter: [isAuthenticatedGuard],
    ...dayBookRouter,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
