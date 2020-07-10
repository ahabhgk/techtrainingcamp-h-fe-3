<template>
  <div class="list-item">
    <div class="player">
      <img class="avatar" :src="avatarDefault" />
      <div>
        <div class="name">{{name}}</div>
      </div>
    </div>
    <div class="wrapper">
      <div
        class="status"
        v-for="(statusName,key) of statusMap"
        :key="statusName"
      >
        <img class="icon" :src="icon[key]"
        />
        <span
          :class="{curSheriff:isSheriff && key === 'isSheriff',
          curStatus:status === key}">
          {{ statusName }}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
// import {} from '@vue/composition-api';
import useRouter from 'utils/use-router';
import iconSkull from 'assets/images/icon/skull.png';
import iconSheriff from 'assets/images/icon/sheriff.png';
import iconAlive from 'assets/images/icon/alive.png';
import iconVoted from 'assets/images/icon/voted.png';
import avatarDefault from 'assets/images/player/default.jpg';
// import { computed } from '@vue/composition-api';

const icon = {
  alive: iconAlive,
  killed: iconSkull,
  voted: iconVoted,
  isSheriff: iconSheriff,
};

const statusMap = {
  isSheriff: '警长',
  killed: '被杀',
  alive: '存活',
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
    status: String,
    isSheriff: Boolean,
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
  background-color: #202153;
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

.wrapper {
  display: flex;
  .curStatus {
    color: red;
  }
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
  .icon {
    width: 20px;
    height: 20px;
    margin-top: 4px;
  }
}

span {
  color: #ffffff;
  font-size: 12px;
}
span .curStatus {
  color: red;
}
.curSheriff {
  color: red;
}
</style>
