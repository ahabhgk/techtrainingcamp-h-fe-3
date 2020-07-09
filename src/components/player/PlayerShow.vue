<template>
  <div class="list-item">
    <div class="player">
      <img class="avatar" :src="avatarDefault" />
      <div>
        <div class="name">{{name}}</div>
      </div>
    </div>
    <div class="control-wrapper">
      <div
        class="status"
        v-for="status of statusList"
        :key="status"
      >
        <img class="icon" :src="status === 'sheriff'?icon.sheriff:icon.skull"
        />
        <span>{{ statusMap[status] }}</span>
      </div>
    </div>
  </div>
</template>

<script>
// import {} from '@vue/composition-api';
import useRouter from 'utils/use-router';
// import { roleType } from 'constants';
import iconSkull from 'assets/images/icon/skull.png';
import iconSheriff from 'assets/images/icon/sheriff.png';
import avatarDefault from 'assets/images/player/default.jpg';

const icon = {
  skull: iconSkull,
  sheriff: iconSheriff,
};
// const player = {
//   [roleType.ACIENT]: {
//     avatar: avatarAcient,
//     role: '祖先',
//   },
//   [roleType.HUNTER]: {
//     avatar: avatarHunter,
//     role: '猎人',
//   },
//   [roleType.IDIOT]: {
//     avatar: avatarIdiot,
//     role: '愚人',
//   },
//   [roleType.SAVIOR]: {
//     avatar: avatarSavior,
//     role: '救助者',
//   },
//   [roleType.SEER]: {
//     avatar: avatarSeer,
//     role: '预言家',
//   },
//   [roleType.SHERIFF]: {
//     avatar: avatarSheriff,
//     role: '警长',
//   },
//   [roleType.VILLAGER]: {
//     avatar: avatarVillager,
//     role: '村民',
//   },
//   [roleType.WEREWOLF]: {
//     avatar: avatarWerewolf,
//     role: '狼人',
//   },
//   [roleType.WITCH]: {
//     avatar: avatarWitch,
//     role: '女巫',
//   },
//   [roleType.Defualt]: {
//     avatar: avatarDefault,
//     role: '祖先',
//   },
// };

const statusMap = {
  sheriff: '警长',
  killed: '被杀',
  shot: '猎枪',
  voted: '踢出',
};

// const selectStatusSet = new Set([
//   'cured',
//   'protected',
// ]);

export default {
  name: 'PlayerShow',
  props: {
    name: String,
    statusList: Array,
  },
  data() {
    return {
      avatarDefault,
    };
  },
  setup() {
    const { currentRoute } = useRouter();
    console.log(currentRoute);

    return {
      statusMap,
      icon,
    };
  },
};
</script>

<style scoped lang="scss">
@import "../../assets/styles/utils.scss";

.list-item {
  margin-top: 6px;
  margin-bottom: 6px;
  height: 40px;
  border-radius: 4px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #494c9c;
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
    .name {
      font-size: 16px;
      font-weight: bold;
      color: #fdfdfd;
    }
  }
}

.control-wrapper {
  display: flex;
  .status {
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
  .status > span {
    color: #ffffff;
    font-size: 12px;
  }
  .icon {
    width: 20px;
    height: 20px;
  }
}

</style>
