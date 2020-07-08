<template>
  <div class="table">
  <table>
    <tr>
        <th>上帝</th>
        <th>狼人</th>
        <th>村民</th>
        <th>预言家</th>
        <th>女巫</th>
        <th>猎人</th>
        <th>守卫</th>
        <th>白痴</th>
    </tr>
    <tr>
        <td><span class="td">{{ list.acient }}</span></td>
        <td><span class="td">{{ list.wolf }}</span></td>
        <td><span class="td">{{ list.villager }}</span></td>
        <td><span class="td">{{ list.seer }}</span></td>
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
  height: 0vh;
  background-color: transparent;
}
  table {
  align-items: center;
  font-size: 5px;
  }
  table, th, td {
    border-collapse: collapse;
  }
  th, td {
    padding: 2px;
    text-align: center;
    width: 25px;
  }
  th {
    color:#e6e6e6;
  }
  td {
    color: #e00022;
    font-weight: 800;
    font-size: 8px;
    text-shadow: 0.1px 0.1px 0.5px #f87777, 0 0 0.5em #acacff, 0 0 0.1em #ff90e7;
  }
  .td {
    display:inline-block;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    padding: 2px;
    background-color: #e6e6e6;
  }
</style>
