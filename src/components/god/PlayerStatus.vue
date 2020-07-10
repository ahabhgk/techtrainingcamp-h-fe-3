<template>
  <div class="list-item">
    <div class="player">
      <img class="avatar" :src="isAlive ? player[role].avatar : icon.dead" />
      <div>
        <div class="role">{{ player[role].role }}</div>
        <div class="name">{{ name }}</div>
      </div>
    </div>
    <div class="control-wrapper">
      <button
        v-for="action of player[role].actions"
        :key="action"
        class="control"
        @click="$emit('changeStatus', action)"
      >
        <img class="icon" :src="rebornStatusSet.has(action) ? icon.potions : icon.skull"
        />
        <span>{{ statusMap[action] }}</span>
      </button>
    </div>
  </div>
</template>

<script>
import { computed } from '@vue/composition-api';
// import useRouter from 'utils/use-router';
import { roleType, roleActions } from 'constants';
import iconSkull from 'assets/images/icon/skull.png';
import iconPotions from 'assets/images/icon/potions.png';
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

const icon = {
  skull: iconSkull,
  potions: iconPotions,
  dead: iconDead,
};

const statusMap = {
  cured: '灵药',
  sheriff: '警长',
  poisoned: '毒药',
  protected: '保护',
  killed: '被刀',
  shot: '猎枪',
  voted: '踢出',
};

const player = {
  [roleType.HUNTER]: {
    avatar: avatarHunter,
    role: '猎人',
    actions: roleActions,
  },
  [roleType.SEER]: {
    avatar: avatarSeer,
    role: '预言家',
    actions: roleActions,
  },
  [roleType.VILLAGER]: {
    avatar: avatarVillager,
    role: '村民',
    actions: roleActions,
  },
  [roleType.WEREWOLF]: {
    avatar: avatarWerewolf,
    role: '狼人',
    actions: roleActions,
  },
  [roleType.WITCH]: {
    avatar: avatarWitch,
    role: '女巫',
    actions: roleActions,
  },
  // [roleType.SHERIFF]: {
  //   avatar: avatarSheriff,
  //   role: '警长',
  // },
  // [roleType.ACIENT]: {
  //   avatar: avatarAcient,
  //   role: '祖先',
  // },
  // [roleType.IDIOT]: {
  //   avatar: avatarIdiot,
  //   role: '愚人',
  // },
  // [roleType.SAVIOR]: {
  //   avatar: avatarSavior,
  //   role: '救助者',
  // },
};

const rebornStatusSet = new Set([
  'cured',
  'protected',
]);

export default {
  name: 'PlayerStatus',
  props: {
    name: String,
    role: String,
    status: String,
  },
  setup(props) {
    // const { currentRoute } = useRouter();
    // const handleSetPlayerStatus = (status) => {
    //   console.log(`https://afbx35.fn.thelarkcloud.com/god/setStatus?name=${props.name}&status=${status}&room=${currentRoute.query.room}&token=${currentRoute.query.token}`);
    // };
    const isAlive = computed(() => props.status === 'alive');

    return {
      isAlive,
      // handleSetPlayerStatus,
      rebornStatusSet,
      statusMap,
      icon,
      player,
    };
  },
};
</script>

<style scoped lang="scss">
@import "../../assets/styles/utils.scss";

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

</style>
