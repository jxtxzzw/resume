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
  {
    path: '/OJ',
    name: 'OJ',
    component: () => import('../views/OJ.vue'),
  },
  {
    path: '/Certification',
    name: 'Certification',
    component: () => import('../views/Certification.vue'),
  },
  {
    path: '/Fiction',
    name: 'Fiction',
    component: () => import('../views/Fiction.vue'),
  },
  {
    path: '/Game',
    name: 'Game',
    component: () => import('../views/Game.vue'),
  },
  {
    path: '/Movie',
    name: 'Movie',
    component: () => import('../views/Movie.vue'),
  },
  {
    path: '/OnlineCourse',
    name: 'OnlineCourse',
    component: () => import('../views/OnlineCourse.vue'),
  },
  {
    path: '/ProfessionalBook',
    name: 'ProfessionalBook',
    component: () => import('../views/ProfessionalBook.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
