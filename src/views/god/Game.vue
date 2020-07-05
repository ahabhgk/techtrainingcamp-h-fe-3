<template>
  <div class="wrapper">
    <div class="title">上帝操控页</div>
    <div class="list-wrapper">
      <PlayerStatus
        v-for="player in state.players"
        :key="player.name"
        :name="player.name"
        :role="player.role"
        :statusList="player.status"
      />
    </div>
    <div class="end-btn-wrapper">
      <button class="end-btn">
        <img :src="icon.end" />
        <span>强行结束</span>
      </button>
    </div>
  </div>
</template>

<script>
import { reactive } from '@vue/composition-api';
import PlayerStatus from 'components/god/PlayerStatus.vue';
import { roleType } from 'constants';
import iconEnd from 'assets/images/icon/end.png';

export default {
  name: 'Game',
  components: {
    PlayerStatus,
  },
  setup() {
    const state = reactive({
      players: [
        { name: 'bkk', role: roleType.SEER, status: ['voted', 'killed', 'cured', 'poisoned'] },
        { name: 'yiMing', role: roleType.WITCH, status: ['voted', 'killed', 'cured', 'poisoned'] },
        { name: 'xxx', role: roleType.HUNTER, status: ['voted', 'killed', 'cured', 'poisoned'] },
        { name: 'cww', role: roleType.WEREWOLF, status: ['voted', 'cured', 'poisoned'] },
        { name: 'nddd', role: roleType.WEREWOLF, status: ['voted', 'cured', 'poisoned'] },
        { name: 'bzzb', role: roleType.VILLAGER, status: ['voted', 'killed', 'cured', 'poisoned'] },
        { name: 'jackMa', role: roleType.VILLAGER, status: ['voted', 'killed', 'cured', 'poisoned'] },
        { name: 'teacherMa', role: roleType.VILLAGER, status: ['voted', 'killed', 'cured', 'poisoned'] },
      ],
    });

    return {
      state,
      icon: { end: iconEnd },
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
  .title {
    font-size: 22px;
    font-weight: bold;
    color: #74d358;
    margin: 4px;
    margin-bottom: 16px;
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
}
</style>
