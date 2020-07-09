<template>
  <div class="player-index">
    <div class="title">
      <img src="../../assets/images/icon/sun1.png" alt="" width="35px">
      <span>第一天，白天</span>
    </div>
    <div class="list-wrapper">
      <PlayerShow
        v-for="player in state.players"
        :key="player.name"
        :name="player.name"
        :statusList="player.status"
      />
    </div>
    <div class="selfInfo">
      <div>
        <img src="../../assets/images/player/acient.jpg" alt="" width="70">
        <p>{{state.name}}</p>
      </div>
      <div>
        <ul>
          <li>身份：预言家</li>
          <li>状态：被杀</li>
          <li>是否为警长：否</li>
        </ul>
      </div>
    </div>
    <div class="btn-wrapper">
      <button class="end-btn" @click="getInfo">
        <img :src="icon.refresh" width="20px" height="20px"/>
        <span>刷新状态</span>
      </button>
      <button class="end-btn" @click="getResult">
        <img :src="icon.check" width="20px" height="20px"/>
        <span>查看结果</span>
      </button>
    </div>
  </div>
</template>

<script>
import { reactive } from '@vue/composition-api';
import { getStatus } from 'network/player';
import PlayerShow from 'components/player/PlayerShow.vue';
// import { roleType } from 'constants';
import iconCheck from 'assets/images/icon/check1.png';
import iconRefresh from 'assets/images/icon/refresh.png';

export default {
  name: 'Game',
  components: {
    PlayerShow,
  },
  data() {
    return {
    };
  },
  setup() {
    const state = reactive({
      players: [
        { name: 'bkk', status: ['voted', 'killed', 'sheriff'] },
        { name: 'yiMing', status: ['voted', 'killed', 'sheriff'] },
        { name: 'xxx', status: ['voted', 'killed', 'sheriff'] },
        { name: 'cww', status: ['voted', 'killed', 'sheriff'] },
        { name: 'nddd', status: ['voted', 'killed', 'sheriff'] },
        { name: 'bzzb', status: ['voted', 'killed', 'sheriff'] },
        { name: 'jackMa', status: ['voted', 'killed', 'sheriff'] },
        { name: 'teacherMa', status: ['voted', 'killed', 'sheriff'] },
      ],
      name: 'xxx',
      slefstatus: ['voted', 'killed', 'sheriff'],
      param: { room_id: 121899, token: 'e53b2hp0unk' },
    });

    function getResult() {
      this.$router.push('/result');
    }
    function getInfo() {
      getStatus(state.param).then((res) => console.log(res)).catch((err) => console.log(err));
      console.log(state.name);
    }
    return {
      state,
      icon: { check: iconCheck, refresh: iconRefresh },
      getStatus,
      getResult,
      getInfo,
    };
  },
};
</script>

<style scoped lang="scss">
@import "../../assets/styles/utils.scss";

.player-index {
  font-family: 'Arial','Microsoft YaHei','黑体','宋体',sans-serif;
  position: relative;
  min-height: 100vh;
  background: url('../../assets/images/background/5.jpg');
  background-position: center;
  background-size: cover;
  padding: 10px 10px 90px;
  box-sizing: border-box;
  .title {
    // -webkit-transform: perspective(0.5em) rotateX(5deg);
    display: flex;
    justify-content: center;
    align-items: center;
    vertical-align: middle;
    font-size: 14px;
    font-weight: bold;
    color: rgb(241,203,100);
    margin: 4px auto;
    margin-bottom: 0px;
    width: 160px;
    background-color: rgb(76,52,26);
    border-top-left-radius: 25px;
    border-top-right-radius: 25px;
    padding: 0 30px;
  }
  .list-wrapper {
    margin-bottom: 20px;
  }
  .selfInfo {
    display: flex;
    color: #fdfdfd;
    justify-content: space-around;
    margin-top: 30px;
    p {
      margin: 0;
      text-align: center;
    }
    ul {
      margin: 0;
      li {
        margin-bottom: 10px;
      }
    }
  }
  .btn-wrapper {
    display: flex;
    justify-content: space-around;
    margin-top: 50px;
    .end-btn {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 80px;
      height: 60px;
      background-color: transparent;
      border: none;
      outline: none;
      @include btn-ripple;
      & > span {
        color: #fdfdfd;
        font-size: 14px;
      }
      & > img {
        width: 40px;
        height: 40px;
      }
    }
  }
}
</style>
