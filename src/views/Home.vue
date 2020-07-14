<template>
  <div class="home">
    <div class='title'><img :src="img.title" /></div>
    <div class='logo'><img :src="img.logo" /></div>
    <div class='home-button' v-for="(item,i) in tags" :key='i'>
      <div><img :class="`${item.class}Icon`" :src="item.icon"/></div>
      <button :class="`${item.class}`" @click="pushPath(`${item.url}`)">{{item.name}}</button>
    </div>
  </div>
</template>

<script>
import Logo from 'assets/images/logo/logo.png';
import Title from 'assets/images/HomePage/title.png';
import Join from 'assets/images/HomePage/join.png';
import Room from 'assets/images/HomePage/room.png';
import Score from 'assets/images/HomePage/score.png';
import useRouter from '../utils/use-router';

const tags = [
  {
    icon: Join, name: '加入游戏', class: 'join', url: '/player/login',
  }, // 暂时
  {
    icon: Room, name: '创建房间', class: 'room', url: '/god/admin',
  },
  {
    icon: Score, name: '积分榜', class: 'score', url: '/topPlayers',
  },
];
export default {
  name: 'Home',
  components: {},
  setup() {
    const router = useRouter();
    const pushPath = (url) => {
      router.push({ path: url });
    };
    return {
      tags,
      pushPath,
      img: { logo: Logo, title: Title },
    };
  },
};
</script>
<style scoped lang="scss">
@import "../assets/styles/utils.scss";

.home{
  position: relative;
  min-height: 100vh;
  background-image: linear-gradient(#192033, #0f1225);
  box-sizing: border-box;
  .title{
    img{
    width: 100%;
    }
  }
  .logo{
     text-align: center;
  }
  .home-button{
    text-align: center;
    margin: 30px auto;
    display: flex;
    align-items: center;
    justify-content: center;
    img{
      width: 20px;
      height: 20px;
      line-height: 20px;
    }
    button{
      justify-items: center;
      width: 100px;
      border: none;
      outline: none;
      margin-left: 10px;
      padding: 12px 12px;
      color: rgb(56, 48, 48);
      border: 0 none;
      border-radius: 36px;
      font-size: 15px;
      font-weight: 500;
      line-height: 1.3;
      justify-content: center;
      align-items: center;
      @include btn-ripple;
    }
    .join{
      background:#3dd28d;
    }
    .room{
      background: #ea554e;
    }
    .score{
      background: #feee7d;
    }
  }
}
</style>
