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
  </div>
  <div class="button">
  <button class="enterRoom" @click="godGame">进入房间</button>
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
  position: relative;
  box-sizing: border-box;
  background-color: #1e272e;
  min-height: 100vh;
  .description {
    display: flex;
    align-items: center;
    justify-content: center;
    padding-top: 20vh;
    height: 10vh;
    margin-left: -150px;
    background-color: transparent;
    color:#e6e6e6;
    align-content: left;
    font-size: 20px;
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
    font-size: 40px;
    font-weight: 500;
    color: rgb(0, 195, 255);
    text-shadow: 0.5px 0.5px 1px red, 0 0 0.5em rgb(53, 53, 241), 0 0 0.1em rgb(212, 38, 175);
    text-align: center;
    width: 40px;
    height: 40px;
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
  .button {
    text-align: center;
    padding: 50px;
  }
  .enterRoom {
    // background-color: transparent;
    // border: solid rgb(0, 255, 0);
    // border-width: 0 3px 3px 0;
    // display: inline-block;
    // padding: 10px;
    // -webkit-transform: rotate(-45deg);
    // outline:none;
    background-color: rgb(18, 224, 18);
    border: none;
    color: rgb(0, 0, 0);
    font-weight: 500;
    padding: 10px 20px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    border-radius: 3px;
    font-size: 20px;
    outline:none;
  }
  .enterRoom:hover {
    // border: solid rgb(154, 252, 154);
    // border-width: 0 3px 3px 0;
    // display: inline-block;
    // padding: 5px;
    // -webkit-transform: rotate(-45deg);
    // outline:none;
    background-color:rgb(154, 252, 154);
    border: none;
    color: rgb(0, 0, 0);
    font-weight: 500;
    padding: 10px 20px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    border-radius: 3px;
    font-size: 20px;
    outline:none;
  }
}
</style>
