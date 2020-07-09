import Vue from 'vue';
import VueRouter from 'vue-router';

const Home = () => import('views/Home');
const GodGame = () => import('views/god/Game');
const Index = () => import('views/player/Index');

Vue.use(VueRouter);

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
  {
    path: '/player/index',
    component: Index,
  },
];

const router = new VueRouter({
  routes,
  mode: 'hash',
});

export default router;
