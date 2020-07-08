import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const Home = () => import('views/Home');
const GodGame = () => import('views/god/Game');
const GodAdmin = () => import('views/god/Admin');
const GodRoom = () => import('views/god/Room');
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
    path: '/god/admin',
    component: GodAdmin,
  },
  {
    path: '/god/room',
    component: GodRoom,
  },
];

const router = new VueRouter({
  routes,
  mode: 'hash',
});

export default router;
