<template>
  <div class="table">
  <table>
    <tr>
        <th class="th0">上帝</th>
        <th class="th">狼人</th>
        <th class="th">村民</th>
        <th class="th">预言家</th>
    </tr>
    <tr>
        <td><span class="td0">{{ list.god }}</span></td>
        <td><span class="td">{{ list.wolf }}</span></td>
        <td><span class="td">{{ list.villager }}</span></td>
        <td><span class="td">{{ list.seer }}</span></td>
    </tr>
    <tr>
        <th class="th">女巫</th>
        <th class="th">猎人</th>
        <th class="th">守卫</th>
        <th class="th">白痴</th>
    </tr>
    <tr>
        <td><span class="td">{{ list.witch }}</span></td>
        <td><span class="td">{{ list.hunter }}</span></td>
        <td><span class="td">{{ list.savior }}</span></td>
        <td><span class="td">{{ list.idiot }}</span></td>
    </tr>
  </table>
  </div>
</template>

<script>
import { roleSet } from 'constants';

export default {
  name: 'numRole',
  props: {
    numPlayer: Number,
  },
  setup(props) {
    const list = roleSet[props.numPlayer - 7];
    return {
      list,
    };
  },
  computed: {
    list(props) {
      return roleSet[props.numPlayer - 7];
    },
  },
};
</script>

<style>
  .table {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 10vh;
  background-color: transparent;
}
  table {
  align-items: center;
  font-size: 15px;
  }
  table, th, td {
    border-collapse: collapse;
  }
  th, td {
    padding: 5px;
    text-align: center;
    width: 60px;
  }
  .th0 {
    color:rgb(255, 255, 152);
  }
  .th {
    color: rgb(170, 242, 255);
  }
  td {
    color: #e00022;
    font-weight: 800;
    font-size: 20px;
    text-shadow: 0.1px 0.1px 0.5px #f87777, 0 0 0.5em #acacff, 0 0 0.1em #ff90e7;
  }
  .td,.td0{
    display:inline-block;
    width: 25px;
    height: 25px;
    border-radius: 50%;
    padding: 2px;
  }
  .td0 {
    color: #0011ff;
    background-color: rgb(255, 255, 152);
    font-weight: 800;
    font-size: 20px;
    text-shadow: 0.1px 0.1px 0.5px #77f0f8, 0 0 0.5em #acacff, 0 0 0.1em #ff90e7;
  }
  .td {
    color: #e00022;
    background-color: rgb(170, 242, 255);
    font-weight: 800;
    font-size: 20px;
    text-shadow: 0.1px 0.1px 0.5px #f87777, 0 0 0.5em #acacff, 0 0 0.1em #ff90e7;
  }
</style>
