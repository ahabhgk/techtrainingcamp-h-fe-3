import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const Home = () => import('views/Home');
const GodGame = () => import('views/god/Game');

const routes = [
  {
    path: '',
    redirect: '/home',
  },
  {
    path: '/home',
    component: Home,
  },
  {
    path: '/god/game',
    component: GodGame,
  },
];

const router = new VueRouter({
  routes,
  mode: 'hash',
});

export default router;
