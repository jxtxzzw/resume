import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/Study',
    name: 'Study',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../views/Study.vue'),
  },
  {
    path: '/Reserved',
    name: 'Reserved',
    component: () => import('../views/Reserved.vue'),
  },
  {
    path: '/Career',
    name: 'Career',
    component: () => import('../views/Career.vue'),
  },
  {
    path: '/Project',
    name: 'Project',
    component: () => import('../views/Project.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
