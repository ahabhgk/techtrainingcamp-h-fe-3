<template>
  <div class="wrapper">
    <div class="title">{{state.data.winner === "werewolf"?"狼人":"平民"}}胜利</div>
    <div class='result-lists'>
      <ul>
        <li>
          <a v-for="(item,i) in titles" :key="i" class='list-header'>{{item}}</a>
        </li>
      </ul>
      <ul>
        <li v-for="(item,i) in state.data.players" :key="i">
          <a>{{item.name}}</a>
          <a>{{ roleName[item.role]}}</a>
          <a :style="{'color':item.status === 'alive'?'lightgreen':'grey'}">
            {{item.status === "alive" ? "存活":"死亡"}}
            </a>
          <a>{{item.killedAt}}</a>
          <a>{{item.killedBy === "__nobody" ? "-":
            (item.killedBy === "__vote"?"票死":item.killedBy)}}</a>
          <a>{{item.points}}</a>
        </li>
      </ul>
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
import { roleName } from 'constants';

const titles = ['姓名', '角色', '状态', '天数', '死因', '胜场数'];

export default {
  name: 'Result',
  components: {},
  setup() {
    const state = reactive({
      data: '',
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
      roleName,
      titles,
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

.btns-wrapper {
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 30px;
  margin-top: 40px;
  .btn {
    width: 100px;
    line-height: 30px;
    text-align: center;
    border-radius: 15px;
    color: white;
    font-weight: bold;
    border: 2px solid #e3e3e3;
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

.result-lists{
    margin: 5px;
    margin-top:0;
    border-radius:25px;
    .list-header{
      display: flex;
      color: #5b697b;
      background: #081521;
      height: 6vh;
      justify-content: space-around;
      align-items: center;
    }
  ul{
    counter-reset: section;
    list-style: none;
    margin: 0;
    padding: 0;
  }
  li {
    display: flex;
    justify-content: space-around;
    width: 100%;
    line-height: 46px;
    height: 46px;
    overflow: hidden;
    font-size: 14px;
    text-align:center;
    a{
      color: #e1e2e3;
      width: 25%;
      max-width: 25%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
  li:nth-of-type(odd){
    background: #112335;
  }
  li:nth-of-type(even){
    background: #091b2c;
  }
}
</style>
