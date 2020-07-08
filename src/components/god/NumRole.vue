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
const table = [
  {
    // num=7
    acient: 1,
    wolf: 2,
    seer: 1,
    witch: 0,
    hunter: 0,
    savior: 0,
    idiot: 0,
    villager: 3,
  },
  {
    // num=8
    acient: 1,
    wolf: 3,
    seer: 1,
    witch: 1,
    hunter: 0,
    savior: 0,
    idiot: 0,
    villager: 2,
  },
  {
    // num=9
    acient: 1,
    wolf: 3,
    seer: 1,
    witch: 1,
    hunter: 0,
    savior: 0,
    idiot: 0,
    villager: 3,
  },
  {
    // num=10
    acient: 1,
    wolf: 3,
    seer: 1,
    witch: 1,
    hunter: 1,
    savior: 0,
    idiot: 0,
    villager: 3,
  },
  {
    // num=11
    acient: 1,
    wolf: 4,
    seer: 1,
    witch: 1,
    hunter: 1,
    savior: 1,
    idiot: 0,
    villager: 2,
  },
  {
    // num=12
    acient: 1,
    wolf: 4,
    seer: 1,
    witch: 1,
    hunter: 1,
    savior: 1,
    idiot: 0,
    villager: 3,
  },
  {
    // num=13
    acient: 1,
    wolf: 4,
    seer: 1,
    witch: 1,
    hunter: 1,
    savior: 1,
    idiot: 0,
    villager: 4,
  },
  {
    // num=14
    acient: 1,
    wolf: 5,
    seer: 1,
    witch: 1,
    hunter: 1,
    savior: 1,
    idiot: 1,
    villager: 3,
  },
  {
    // num=15
    acient: 1,
    wolf: 5,
    seer: 1,
    witch: 1,
    hunter: 1,
    savior: 1,
    idiot: 1,
    villager: 4,
  },
];

export default {
  name: 'numRole',
  props: {
    numPlayer: Number,
  },
  setup(props) {
    const list = table[props.numPlayer - 7];
    return {
      list,
    };
  },
  computed: {
    list(props) {
      return table[props.numPlayer - 7];
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
    color: #b8001c;
    font-weight: 1000;
  }
  .td {
    width: 10px;
    height: 2px;
    border-radius: 50%;
    padding: 2px;
    background-color: #e6e6e6;
  }
</style>
