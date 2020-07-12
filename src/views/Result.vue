<template>
  <div class="wrapper">
    <div class="title">游戏结果</div>
  </div>
</template>

<script>
export default {
  name: 'Result',
  components: {},
  data() {
    return {};
  },
  computed: {},
  watch: {},
  methods: {},
  created() {},
  mounted() {},
};
</script>
<style scoped lang="scss">
@import "../assets/styles/utils.scss";

.wrapper {
  position: relative;
  min-height: 100vh;
  background-color: #424361;
  padding: 10px 10px 90px;
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
</style>
