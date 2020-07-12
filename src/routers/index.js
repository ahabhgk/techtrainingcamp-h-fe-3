import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const Home = () => import('views/Home');
const GodGame = () => import('views/god/Game');
const Login = () => import('views/player/Login');
const Result = () => import('views/Result');

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
    path: '/player/login',
    component: Login,
  }, {
    path: '/result',
    component: Result,
  },
];

const router = new VueRouter({
  routes,
  mode: 'hash',
});

export default router;
