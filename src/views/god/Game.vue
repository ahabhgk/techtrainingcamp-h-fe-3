<template>
  <div class="wrapper">
    <header class="header">
      <div class="title">上帝操控页</div>
      <div class="time-wrapper">
        <div class="day">第 {{ state.day }} 天</div>
        <img class="time" :src="isDay ? icon.day : icon.night" />
      </div>
    </header>
    <div class="list-wrapper">
      <PlayerStatus
        v-for="player in state.players"
        :key="player.name"
        :name="player.name"
        :role="player.role"
        :isSheriff="player.isSheriff"
        :status="player.status"
        :killedBy="player.killedBy"
        :killedAt="player.killedAt"
        @changeStatus="handleChangeStatus(player, $event)"
      />
    </div>
    <div class="end-btn-wrapper">
      <button class="end-btn" @click="handleEndGame()">
        <img :src="icon.end" />
        <span>强行结束</span>
      </button>
    </div>
    <Dialog
      :isShow="state.isDialogShow"
      @cancel="handleEndGameCancel()"
      @ok="handleEndGameOk()"
    >
      <div class="winner-wrapper">
        <div class="winner-header">设置赢家</div>
        <div class="set-winner">
          <div class="winner-role">
            <input type="radio" value="werewolf" v-model="state.winner">
            <span class="role">狼人</span>
          </div>
          <div class="winner-role">
            <input type="radio" value="villager" v-model="state.winner">
            <span class="role">村民</span>
          </div>
          <div class="winner-role">
            <input type="radio" value="nobody" v-model="state.winner">
            <span class="role">Nobody Wins...</span>
          </div>
        </div>
      </div>
    </Dialog>
  </div>
</template>

<script>
import { reactive, computed, onMounted } from '@vue/composition-api';
import useRouter from 'utils/use-router';
import * as godApi from 'network/god';
import PlayerStatus from 'components/god/PlayerStatus.vue';
import Dialog from 'components/common/dialog.vue';
import iconEnd from 'assets/images/icon/end.png';
import iconDay from 'assets/images/icon/day.png';
import iconNight from 'assets/images/icon/night.png';

export default {
  name: 'Game',
  components: {
    PlayerStatus,
    Dialog,
  },
  setup() {
    const state = reactive({
      players: [],
      time: 'night',
      day: 0,
      isDialogShow: false,
      winner: '',
    });
    const isDay = computed(() => state.time === 'day');
    const { currentRoute } = useRouter();

    const updateStatus = async () => {
      const { data } = await godApi.getStatus(currentRoute.query.room, currentRoute.query.token);
      state.players = data.players;
      state.time = data.time;
      state.day = data.day;
    };

    const handleEndGame = () => {
      console.log(state.isDialogShow);
      state.isDialogShow = true;
    };
    const handleEndGameCancel = () => {
      state.isDialogShow = false;
    };
    const handleEndGameOk = async () => {
      if (state.winner) {
        await godApi.endGame(currentRoute.query.room, currentRoute.query.token, state.winner);
        handleEndGameCancel();
      }
    };

    onMounted(() => {
      updateStatus();
    });

    const handleChangeStatus = async (player, action) => {
      const { room, token } = currentRoute.query;
      await godApi.setStatus(player.name, action, room, token);
      await updateStatus();
    };

    return {
      state,
      isDay,
      handleChangeStatus,
      handleEndGame,
      handleEndGameCancel,
      handleEndGameOk,
      icon: { end: iconEnd, day: iconDay, night: iconNight },
    };
  },
};
</script>

<style scoped lang="scss">
@import "../../assets/styles/utils.scss";

.wrapper {
  position: relative;
  min-height: 100vh;
  background-color: #424361;
  padding: 10px 10px 90px;
  box-sizing: border-box;
  .header {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    margin: 4px;
    margin-bottom: 16px;
    .title {
      font-size: 22px;
      font-weight: bold;
      color: #74d358;
    }
    .time-wrapper {
      display: flex;
      width: 90px;
      justify-content: space-between;
      align-items: center;
      .time {
        width: 23px;
        height: 23px;
      }
      .day {
        font-size: 18px;
        font-weight: bold;
        color: #fdfdfd;
      }
    }
  }
  .end-btn-wrapper {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 20px;
    width: 80px;
    margin: 20px auto 0;
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
  .winner-wrapper {
    background-color: #424361;
    padding: 20px;
    .winner-header {
      color: #74d358;
      font-size: 18px;
      font-weight: bold;
      margin-bottom: 20px;
    }
    .set-winner {
      .winner-role {
        display: flex;
        align-items: center;
        input {
          width: 18px;
          height: 18px;
          margin: 10px;
        }
        .role {
          color: #fdfdfd;
          font-size: 16px;
          font-weight: bold;
        }
      }
    }
  }
}
</style>
