import Vue from 'vue';
import VueRouter from 'vue-router';

const Home = () => import('views/Home');
const GodGame = () => import('views/god/Game');
const GodAdmin = () => import('views/god/Admin');
const GodRoom = () => import('views/god/Room');
const Topplayers = () => import('views/TopPlayers');
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
    path: '/god/admin',
    component: GodAdmin,
  },
  {
    name: 'room',
    path: '/god/room/',
    component: GodRoom,
  },
  {
    path: '/topPlayers',
    component: Topplayers,
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
