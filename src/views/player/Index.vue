<template>
  <div class="player-index">
    <div class="title">
      <img v-if="timeSelection()" src="@/assets/images/icon/moon.png" width="35px">
      <img v-else src="@/assets/images/icon/sun.png" width="35px">
      <span>第{{state.allStatus.data.day}}天，
        {{state.timeInfo[state.allStatus.data.time]}}
      </span>
    </div>
    <div class="list-wrapper">
      <PlayerShow
        v-for="player in state.allStatus.data.players"
        :key="player.name"
        :name="player.name"
        :status="player.status"
        :isSheriff="player.isSheriff"
      />
    </div>
    <div class="selfInfo">
      <div>
        <img :src="imgList[state.allStatus.data.self.role]" alt="" width="70">
        <p>{{state.allStatus.data.self.name}}</p>
      </div>
      <div>
        <ul>
          <li>身份：{{roleName[state.allStatus.data.self.role]}}</li>
          <li>状态：{{stateName[state.allStatus.data.self.status]}}</li>
          <li>是否为警长：
            <span v-if="state.allStatus.data.self.isSheriff">是</span>
            <span v-else>否</span>
          </li>
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
import { reactive, onMounted } from '@vue/composition-api';
import { getStatus } from 'network/player';
import { roleName } from 'constants/index.js';
import useRouter from 'utils/use-router';
import PlayerShow from 'components/player/PlayerShow.vue';
import iconCheck from 'assets/images/icon/check1.png';
import iconRefresh from 'assets/images/icon/refresh.png';
import imgHunter from 'assets/images/player/hunter.jpg';
import imgVillager from 'assets/images/player/villager.jpg';
import imgIdiot from 'assets/images/player/idiot.jpg';
import imgSavior from 'assets/images/player/savior.jpg';
import imgSeer from 'assets/images/player/seer.jpg';
import imgWerewolf from 'assets/images/player/werewolf.jpg';
import imgWitch from 'assets/images/player/witch.jpg';

const imgList = {
  hunter: imgHunter,
  villager: imgVillager,
  idiot: imgIdiot,
  savior: imgSavior,
  seer: imgSeer,
  werewolf: imgWerewolf,
  witch: imgWitch,
};
const stateName = {
  voted: '踢出',
  killed: '死亡',
  alive: '存活',
};

export default {
  name: '',
  components: {
    PlayerShow,
  },
  data() {
    return {
    };
  },
  setup() {
    // initial state
    const router = useRouter();
    const state = reactive({
      allStatus: {
        state: 200,
        data: {
          players: [
            { name: 'aaa', status: 'alive', isSheriff: true },
            { name: 'bbb', status: 'voted', isSheriff: false },
            { name: 'ccc', status: 'alive', isSheriff: false },
            { name: 'ddd', status: 'killed', isSheriff: false },
            { name: 'eee', status: 'alive', isSheriff: false },
            { name: 'fff', status: 'alive', isSheriff: false },
            { name: 'ggg', status: 'alive', isSheriff: false },
          ],
          self: {
            name: 'ccc', status: 'alive', isSheriff: false, role: 'witch',
          },
          time: 'daylight',
          day: 1,
        },
      },
      param: {},
      timeInfo: { night: '夜晚', daylight: '白天' },
    });

    function getInfo() {
      getStatus(state.param)
        .then((res) => { state.allStatus = res; })
        .catch((err) => console.log(err));
      // console.log(router.currentRoute);
    }

    onMounted(() => {
      // getInfo();
      const { query } = router.currentRoute;
      state.param = query;
      getInfo();
    });

    function getResult() {
      this.$router.push('/result');
    }

    function timeSelection() {
      return state.allStatus.data.time === 'night';
    }

    return {
      state,
      icon: { check: iconCheck, refresh: iconRefresh },
      getStatus,
      getResult,
      getInfo,
      timeSelection,
      roleName,
      imgList,
      stateName,
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
        margin-bottom: 5px;
        margin-top: 7px;
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
