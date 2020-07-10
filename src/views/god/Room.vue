<template>
<div class="room">
 <div class="description">你创建的房间号为：</div>
  <div class="table">
    <table>
      <tr>
          <td id="td1">{{ room[0] }}</td>
          <td id="td2">{{ room[1] }}</td>
          <td id="td3">{{ room[2] }}</td>
          <td id="td4">{{ room[3] }}</td>
          <td id="td5">{{ room[4] }}</td>
          <td id="td6">{{ room[5] }}</td>
      </tr>
    </table>
    <button class="enterRoom" @click="godGame"></button>
  </div>
</div>
</template>

<script>
import useRouter from '../../utils/use-router';

export default {
  name: 'room',
  components: {},
  setup() {
    const router = useRouter();
    const { query } = router.currentRoute;
    const pushPath = (url, query) => {
      router.push({ path: url, query });
    };
    const godGame = () => {
      pushPath('/god/game', query);
    };
    return {
      pushPath,
      godGame,
      room: query.room.toString(),
    };
  },
};
</script>

<style scoped lang="scss">
@import "../../assets/styles/utils.scss";

.room {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  background-color: #1e272e;
  min-height: 100vh;
}
.description {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50vh;
  margin-left: -200px;
  background-color: transparent;
  color:#e6e6e6;
  align-content: left;
  font-size: 10px;
}
.table {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 10vh;
  background-color: transparent;
}
table {
  border-collapse:separate;
  border-spacing:10px;
  background-color: transparent;
}
table tr td {
  font-size: 20px;
  font-weight: 500;
  color: rgb(0, 195, 255);
  text-shadow: 0.5px 0.5px 1px red, 0 0 0.5em rgb(53, 53, 241), 0 0 0.1em rgb(212, 38, 175);
  text-align: center;
  width: 20px;
  height: 20px;
  border-radius: 20%;
  border: 1.2px solid rgb(202, 255, 177);
  padding: 2px;
  background-color: rgba(10, 2, 2, 0.541);
}
#td1:hover {
  background-color: rgba(44, 44, 26, 0.541);
}
#td2:hover {
  background-color: rgba(44, 44, 26, 0.541);
}
#td3:hover {
  background-color: rgba(44, 44, 26, 0.541);
}
#td4:hover {
  background-color: rgba(44, 44, 26, 0.541);
}
#td5:hover {
  background-color: rgba(44, 44, 26, 0.541);
}
#td6:hover {
  background-color: rgba(44, 44, 26, 0.541);
}
.enterRoom {
  background-color: transparent;
  border: solid rgb(0, 255, 0);
  border-width: 0 3px 3px 0;
  display: inline-block;
  padding: 5px;
  transform: rotate(-45deg);
  -webkit-transform: rotate(-45deg);
  outline:none;
}
.enterRoom:hover {
  border: solid rgb(154, 252, 154);
  border-width: 0 3px 3px 0;
  display: inline-block;
  padding: 5px;
  transform: rotate(-45deg);
  -webkit-transform: rotate(-45deg);
  outline:none;
}
</style>
