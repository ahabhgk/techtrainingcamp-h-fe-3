<template>
  <div class="wrapper">
    <div class="title">用户登录</div>
    <div class="container">
      <div class="input-box">玩家名字：
        <input placeholder="请输入玩家姓名" required="required" v-model="state.name">
      </div>
      <div class="input-box">房间号码：
        <input placeholder="请输入房间号码" required="required" v-model="state.number">
      </div>
      <div class="btn-wrapper">
        <button class="rule" @click="handleShowRule()">玩法说明</button>
        <button class="login" @click="handleLogin()">登录</button>
      </div>
      <div class="alert"  v-if="state.alertIsShow">信息填写不完成，请完善后尝试</div>
    </div>
    <div class="rule-box" v-if="state.ruleIsShow">
      <div class="title">游戏玩法</div>
      <div class="rule-container">
        <p>狼人杀，是一款多人参与的、以语言描述推动的、较量口才和分析判断能力的策略类桌面游戏，通常的版本需要4-18人参与。
          狼人杀游戏的机制与杀人游戏相类似，杀人游戏更倾向于竞技，狼人杀游戏则更加欢乐，角色更丰富。游戏分为两大阵营:狼人阵营和村民阵营。
          全部狼人出局，村民阵营胜利;全部神职或全部平民出局，狼人阵营胜利。
        </p>
        <p>两个阵营：狼人 vs 好人（好人=平民+神）<br/>两个游戏环节：黑天 and 白天 （黑天狼人杀人，白天所有人投票让心目中狼人出局）<br/>
          好人胜利条件：让所有狼人出局 （投票出局、神发动技能）<br/>狼人胜利条件：让所有平民出局 or 让所有神出局（杀死、投票投死）。
        </p>
      </div>
      <div class="rule-cancel" @click="handleShowRuleCancel">关闭</div>
    </div>

    <div class="tip-box" v-if="state.tipIsShow">
      <div class="tip-content">你的身份是：{{state.role || '未知错误'}}</div>
      <div class="tip-start" @click="handleGameStart">开始游戏</div>
    </div>
  </div>
</template>

<script>
import { reactive, onMounted } from '@vue/composition-api';
import useRouter from 'utils/use-router';
import * as playerApi from 'network/player';

export default {
  name: 'Login',
  components: {},
  setup() {
    const state = reactive({
      name: '',
      number: '',
      role: '',
      token: '',
      tipIsShow: false,
      ruleIsShow: false,
      alertIsShow: false,
    });
    const router = useRouter();
    const { currentRoute } = router;
    const pushPath = (url, data) => {
      router.push({ path: url, query: data });
    };

    const getRoomId = () => {
      if (currentRoute.query.room) {
        state.number = currentRoute.query.room;
      }
    };

    onMounted(() => {
      getRoomId();
    });

    const handleLogin = async () => {
      if (state.number !== '' && state.name !== '') {
        const { status, data } = await playerApi.login(state.number, state.name);
        console.log(data);
        if (status === 200) {
          state.token = data.token;
          state.role = data.role;
          state.tipIsShow = true;
        }
      } else {
        state.alertIsShow = true;
        setTimeout(() => {
          state.alertIsShow = false;
        }, 1500);
      }
    };

    const handleShowRule = () => {
      state.ruleIsShow = true;
    };

    const handleShowRuleCancel = () => {
      state.ruleIsShow = false;
    };

    const handleGameStart = () => {
      pushPath('/player', { token: state.token, room: state.number });
      state.tipIsShow = false;
    };

    return {
      state,
      handleLogin,
      handleShowRule,
      handleShowRuleCancel,
      handleGameStart,
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
       margin-top: 30px;
       font-size: 1.2rem;
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
    justify-content: space-between;
  }

  button {
    border:0;
    outline:none;
    border-radius:15px;
    height: 30px;
    width: 120px;
    font-size:1rem;
    font-weight: bold;
    background:#1ab188;
    color: white;
    letter-spacing:.2em;
  }

  .login {
    background: red;
  }

  .rule {
    background: lightseagreen;
  }
  .alert {
    color: red;
    margin-top: 15px;
    font-weight: bold;
    letter-spacing:.2em;
  }

  .rule-box {
    position:absolute;
    background: ghostwhite;
    border: 6px solid black;
    border-radius: 15px;
    box-shadow: 4rpx 4rpx 22rpx rgba(0, 0, 0, 0.3);
    height: 70vh;
    width: 80vw;
    top: 50%;
    left: 50%;
    padding-bottom: 50px;
    transform: translate(-50%,-50%);
    .title {
      color: black;
    }
    .rule-container {
      padding: 0 6px;
      font-size: 1.2rem;
      overflow: scroll;
      height: calc(70vh - 50px);
    }
    .rule-cancel {
      position: absolute;
      bottom: 0;
      height: 50px;
      width: 80vw;
      line-height: 50px;
      text-align: center;
      font-size:1.3rem;
      font-weight: bold;
      background:red;
      color: white;
    }
  }

  .tip-box{
    position:absolute;
    background: ghostwhite;
    border: 6px solid black;
    border-radius: 15px;
    box-shadow: 4rpx 4rpx 22rpx rgba(0, 0, 0, 0.3);
    height: 10vh;
    width: 80vw;
    top: 50%;
    left: 50%;
    text-align: center;
    padding-top: 10px;
    padding-bottom: 50px;
    transform: translate(-50%,-50%);
    .tip-content {
      padding: 10px 6px;
      font-size: 1.2rem;
      overflow: scroll;
      height: calc(20vh - 50px);
    }

    .tip-start {
      position: absolute;
      bottom: 0;
      height: 50px;
      width: 80vw;
      line-height: 50px;
      text-align: center;
      font-size:1.3rem;
      font-weight: bold;
      background:lightcoral;
      color: white;
    }
  }
}
</style>
