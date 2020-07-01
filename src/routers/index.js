import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const someRoute = () => import('views/someRoute/someRoute');

const routes = [
  {
    path: '',
    redirect: '/home',
  },
  {
    path: '/home',
    component: someRoute,
  },
];

const router = new VueRouter({
  routes,
  mode: 'history',
});

export default router;
