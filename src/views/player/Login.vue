<template>
  <div class="wrapper">
    <div class="title">用户登录</div>
    <div class="container">
      <div class="input-box">玩家名字:
        <input placeholder="请输入玩家姓名" required="required" v-model="state.name">
      </div>
      <div class="input-box">房间号码:
        <input placeholder="请输入房间号码" required="required" v-model="state.number">
      </div>
      <div class="btn-wrapper">
        <button class="tip">玩法说明</button>
        <button class="login">登录</button>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, onMounted } from '@vue/composition-api';
import useRouter from 'utils/use-router';
// import * as playerApi from 'network/player';

export default {
  name: 'Login',
  components: {},
  setup() {
    const state = reactive({
      name: '',
      number: '',
      tipIsShow: false,
    });
    const { currentRoute } = useRouter();

    const updateStatus = async () => {
      // const { data } = await godApi.getStatus(currentRoute.query.room, currentRoute.query.token);
      if (currentRoute.query.room) {
        state.number = currentRoute.query.room;
      }
    };

    onMounted(() => {
      updateStatus();
    });

    const handleLogin = async () => {
      // const { data } = await playerApi.login(currentRoute.query.room, currentRoute.query.token);
    };

    // const handleShowTip = () => {
    //   state.tipIsShow = true;
    // };

    // const handleShowTipCancel = () => {
    //   state.tipIsShow = false;
    // };

    return {
      state,
      handleLogin,
    };
  },
};

</script>
<style scoped lang="scss">
@import "../../assets/styles/utils.scss";

.wrapper {
  position: relative;
  min-height: 100vh;
  background-color: #424361;
  padding: 10px 10px 90px;
  box-sizing: border-box;
  .title {
    font-size: 22px;
    font-weight: bold;
    text-align: center;
    color: #74d358;
    margin: 4px;
    margin-bottom: 16px;
  }
  .container {
     display: flex;
     flex-direction: column;
     justify-content: center;
     align-items: center;
     height: calc(100vh - 144px);
     width: 100%;
     color: white;
     .input-box {
       height: 30px;
       display: flex;
       align-items: center;
       justify-content:flex-end;
       margin-top: 20px;
            input {
       outline:0;
       border:0;
       width: 150px;
       height: 30px;
       line-height: 30px;
       border-radius: 15px;
       padding-left: 10px;
       margin-left: 6px;
     }
     }
  }

  .btn-wrapper {
    display: flex;
    margin-top: 30px;
    width: 250px;
    justify-content: space-around;
  }

  button {
    border:0;
    outline:none;
    border-radius:0;
    height: 30px;
    width: 100px;
    font-size:1rem;
    font-weight: bold;
    letter-spacing:.1em;
    background:#1ab188;
    transition:all 0.5s ease;
    color: white;
    -webkit-appearance: none;
  }

  .login {
    background: red;
  }

  .tip {
    background: lightseagreen;
  }
}
</style>
