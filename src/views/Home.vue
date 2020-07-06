<template>
  <div class="home">
    <div class='title'><img :src="img.title" /></div>
    <div class='logo'><img :src="img.logo" /></div>
    <div>{{ state.value }}</div>
    <div class='home-button' v-for="(item,i) in state.tags" :key='i'>
      <img :class="`${item.class}Icon`" :src="item.icon"/>
      <button :class="`${item.class}`" @click="joinGo(`${item.url}`)">{{item.name}}</button>
    </div>
  </div>
</template>

<script>
import { reactive, watchEffect } from '@vue/composition-api';
import Logo from 'assets/images/logo/logo.png';
import Title from 'assets/images/HomePage/title.png';
import Join from 'assets/images/HomePage/join.png';
import Room from 'assets/images/HomePage/room.png';
import Score from 'assets/images/HomePage/score.png';

const tags = [
  {
    icon: Join, name: '加入游戏', class: 'join', url: '/god/game',
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
    const self = this;
    const state = reactive({
      value: 0,
      tags,
      joinGo(url) {
        self.$router.push({ path: url });
      },
    });
    watchEffect(() => {
      console.log(state.value);
    });
    return {
      state,
      img: { logo: Logo, title: Title },
    };
  },
  methods: {
    joinGo(url) {
      this.$router.push({ path: url });
    },
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
    img{
      width: 20px;
      height: 20px;
      line-height: 20px;
    }
    button{
      width: 100px;
      border: none;
      outline: none;
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
