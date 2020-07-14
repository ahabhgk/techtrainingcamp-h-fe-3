<template>
  <div class="admin">
    <div class="title">
    <span class="select">游戏人数</span>
    </div>
    <div class="slider">
      <span class="number">{{ number }}</span>
      <input type="range" v-model="number" id="sinput" min="7" max="9" value="7" step="1"/>
    </div>
    <numRole class="info" :numPlayer="number"></numRole>
    <div class="button">
        <button class="createRoom" @click="createRoom">创建房间</button>
    </div>
    <p>{{ info }}</p>
  </div>
</template>

<script>
import { ref } from '@vue/composition-api';
import numRole from 'components/god/NumRole.vue';
import axios from 'axios';
import useRouter from '../../utils/use-router';

export default {
  name: 'admin',
  components: {
    numRole,
  },
  props: {
    num: Number,
  },
  setup() {
    const router = useRouter();
    const pushPath = (url, data) => {
      console.log(router);
      router.push({ path: url, query: data });
    };
    const number = ref(7);
    const createRoom = () => {
      axios
        .get('https://afbx35.fn.thelarkcloud.com/god_start', {
          params: {
            playerNum: number.value,
          },
          headers: {},
        })
        .then((res) => {
          const { data } = res.data;
          pushPath('/god/room', data);
        })
        .catch((err) => console.error(err));
    };
    return {
      createRoom,
      number,
    };
  },
};
</script>
<style scoped lang="scss">
@import "../../assets/styles/utils.scss";

.admin {
  position: relative;
  min-height: 100vh;
  background-image: linear-gradient(#192033, #0f1225);
  box-sizing: border-box;
}
.title {
  padding-top: 15vh;
  padding-bottom: 5vh;
  text-align: center;
}
.select {
  color: white;
  background-color: #3c40c6;
  padding: 10px 20px;
  border-radius: 2px;
  font-size: 20px;
  font-weight: 500;
}
.slider {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 15vh;
  background-color: transparent;
}
#sinput {
  -webkit-appearance: none;
  background: linear-gradient(75deg, #3c40c6, #575fcf);
  border-radius: 4px;
  width: 40%;
  height: 5px;
  outline: none;
  box-shadow: 0 0 6px rgb(28, 32, 148);
}
#sinput::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 15px;
  height: 15px;
  background: #f53b57;
  border-radius: 50%;
  transition: 0.3s;
}
#sinput:active::-webkit-slider-thumb {
  background: #ef5777;
  box-shadow: 0 0 0 6px rgba(155, 73, 146, 0.4);
}
.number {
  margin-right: 20px;
  background-color: #f53b57;
  width: 30px;
  line-height: 30px;
  text-align: center;
  border-radius: 3px;
  color: white;
  position: relative;
  font-size: 20px;
}
.number::after {
  content: "";
  display: block;
  border-top: 5px solid transparent;
  border-bottom: 5px solid transparent;
  border-left: 5px solid #f53b57;
  position: absolute;
  top: calc(50% - 5px);
  right: -4px;
}
.button {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40vh;
  background-color: transparent;
}
.createRoom {
  background-color: #f53b57; /* Green */
  border: none;
  color: white;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  border-radius: 3px;
  font-size: 20px;
  outline:none;
}
.createRoom:hover {
  background-color: #f76e82;
}
</style>
