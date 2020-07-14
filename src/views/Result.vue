<template>
  <div class="wrapper">
    <div class="title">游戏结果</div>
    <div class="list-wrapper">
      <div class="list-item" v-for="(item,index) in state.players" v-bind:key="index">
        <div class="player">
          <!-- <img class="avatar"
          :src="item.status === 'alive' ? player[item.role].avatar : iconDead" /> -->
          <div>
            <!-- <div class="role">{{ player[item.role].role }}</div> -->
            <div class="name">{{ item.name }}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="btns-wrapper" @click="handleButtonClick">
      <div class="btn" data-index="0">积分榜</div>
      <div class="btn" data-index="1">返回主页</div>
      <div class="btn" data-index="2">再来一局</div>
    </div>
  </div>
</template>

<script>
import { reactive, onMounted } from '@vue/composition-api';
import useRouter from 'utils/use-router';
import * as playerApi from 'network/player';
import { roleType } from 'constants';
import iconDead from 'assets/images/icon/dead.png';
import avatarHunter from 'assets/images/player/hunter.jpg';
import avatarSeer from 'assets/images/player/seer.jpg';
import avatarVillager from 'assets/images/player/villager.jpg';
import avatarWerewolf from 'assets/images/player/werewolf.jpg';
import avatarWitch from 'assets/images/player/witch.jpg';
// import avatarAcient from 'assets/images/player/acient.jpg';
// import avatarIdiot from 'assets/images/player/idiot.jpg';
// import avatarSavior from 'assets/images/player/savior.jpg';
// import avatarSheriff from 'assets/images/player/sheriff.jpg';

// const statusMap = {
//   cured: '灵药',
//   sheriff: '警长',
//   poisoned: '毒药',
//   protected: '保护',
//   killed: '被刀',
//   shot: '猎枪',
//   voted: '踢出',
// };

const player = {
  [roleType.HUNTER]: {
    avatar: avatarHunter,
    role: '猎人',
  },
  [roleType.SEER]: {
    avatar: avatarSeer,
    role: '预言家',
  },
  [roleType.VILLAGER]: {
    avatar: avatarVillager,
    role: '村民',
  },
  [roleType.WEREWOLF]: {
    avatar: avatarWerewolf,
    role: '狼人',
  },
  [roleType.WITCH]: {
    avatar: avatarWitch,
    role: '女巫',
  },
};

// const rebornStatusSet = new Set([
//   'cured',
//   'protected',
// ]);

export default {
  name: 'Result',
  components: {},
  setup() {
    const state = reactive({
      data: '',
      players: [
        {
          name: '玩家1',
          status: 'dead',
          role: 'witch',
          points: 6,
          killedBy: 'witch',
          killedAt: 1,
        },
        {
          name: '玩家2',
          status: 'alive',
          role: 'seer',
          points: 6,
          killedBy: 'werewolf',
          killedAt: 1,
        },
        {
          name: '玩家3',
          status: 'alive',
          role: 'seer',
          points: 6,
          killedBy: 'werewolf',
          killedAt: 1,
        },
        {
          name: '玩家4',
          status: 'alive',
          role: 'seer',
          points: 6,
          killedBy: 'werewolf|vote|hunter|witch',
          killedAt: 1,
        },
        {
          name: '玩家5',
          status: 'alive',
          role: 'seer',
          points: 6,
          killedBy: 'werewolf|vote|hunter|witch',
          killedAt: 1,
        },
        {
          name: '玩家6',
          status: 'alive',
          role: 'seer',
          points: 6,
          killedBy: 'werewolf|vote|hunter|witch',
          killedAt: 1,
        },
        {
          name: '玩家名7',
          status: 'alive',
          role: 'seer',
          points: 6,
          killedBy: 'werewolf|vote|hunter|witch',
          killedAt: 1,
        },
        {
          name: '玩家名字8',
          status: 'alive',
          role: 'seer',
          points: 6,
          killedBy: 'werewolf|vote|hunter|witch',
          killedAt: 1,
        },
      ],
    });
    const router = useRouter();
    const { currentRoute } = router;
    const pushPath = (url, data) => {
      router.push({ path: url, query: data });
    };

    const getData = async () => {
      const { data } = await playerApi.getResult(currentRoute.query.room);
      state.data = data;
    };

    onMounted(() => {
      getData();
      console.log(iconDead);
      console.log(player.HUNTER);
    });

    const handleButtonClick = (e) => {
      const { index } = e.target.dataset;
      if (+index === 0) {
        pushPath('/topPlayers');
      } else if (+index === 1) {
        pushPath('/home');
      } else {
        pushPath('/player/login');
      }
    };

    return {
      state,
      handleButtonClick,
    };
  },
};
</script>
<style scoped lang="scss">
@import "../assets/styles/utils.scss";

.wrapper {
  position: relative;
  min-height: 100vh;
  background-color: #424361;
  padding: 10px;
  box-sizing: border-box;
  .title {
    font-size: 22px;
    text-align: center;
    font-weight: bold;
    color: #74d358;
    margin: 4px;
    margin-bottom: 16px;
  }
}

.list-item {
  margin: 4px;
  height: 60px;
  border-radius: 4px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #494a68;
  &:first-child {
    border-top: none;
  }
  .player {
    margin-left: 10px;
    width: 170px;
    display: flex;
    align-items: center;
    .avatar {
      margin-right: 10px;
      width: 40px;
      height: 40px;
      border: #000 solid 2px;
    }
    .role {
      font-size: 18px;
      font-weight: bold;
      color: #fdfdfd;
    }
    .name {
      font-size: 16px;
      font-weight: bold;
      color: #fdfdfd;
    }
  }
}

.control-wrapper {
  display: flex;
  .control {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    height: 40px;
    width: 40px;
    background-color: transparent;
    border: none;
    outline: none;
    @include btn-ripple;
  }
  .control > span {
    color: #ffffff;
    font-size: 12px;
  }
  .icon {
    width: 20px;
    height: 20px;
  }
}

.btns-wrapper {
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 30px;
  margin-top: 20px;

  .btn {
    width: 100px;
    line-height: 30px;
    text-align: center;
    border-radius: 15px;
    color: white;
    &:nth-child(1) {
      background: red;
    }
    &:nth-child(2) {
      background: blue;
    }
    &:nth-child(3) {
      background: green;
    }
  }
}
</style>
