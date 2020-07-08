<template>
  <div class="admin">
    <!-- <numPlayer class="slider"></numPlayer> -->
    <div class="slider">
      <span class="select">游戏人数</span>
      <span class="number">{{ number.num }}</span>
      <input type="range" v-model="number.num" id="sinput" min="7" max="15" value="7" step="1"/>
    </div>
    <numRole class="info" :numPlayer="number.num"></numRole>
    <div class="button">
        <button class="createRoom" @click="createRoom">创建房间</button>
    </div>
  </div>
</template>

<script>
import { ref } from '@vue/composition-api';
import numRole from 'components/god/NumRole.vue';
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
    const pushPath = (url) => {
      router.push({ path: url });
    };
    const number = ref({ num: 10 });
    const createRoom = () => {
      pushPath('/god/room');
    };
    return {
      pushPath,
      createRoom,
      number,
    };
  },
};
</script>
<style scoped lang="scss">
@import "../../assets/styles/utils.scss";

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  background-color: #1e272e;
}
.slider {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50vh;
  background-color: transparent;
}
.select {
  color: white;
  background-color: #3c40c6;
  padding: 5px 10px;
  border-radius: 2px;
  font-size: 5px;
  font-weight: 500;
  margin-right: 10px;
}
#sinput {
  -webkit-appearance: none;
  background: linear-gradient(75deg, #3c40c6, #575fcf);
  border-radius: 4px;
  width: 20%;
  height: 3px;
  outline: none;
  box-shadow: 0 0 6px rgb(28, 32, 148);
}
#sinput::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 5px;
  height: 5px;
  background: #f53b57;
  border-radius: 50%;
  transition: 0.3s;
}
#sinput:active::-webkit-slider-thumb {
  background: #ef5777;
  box-shadow: 0 0 0 6px rgba(155, 73, 146, 0.4);
}
.number {
  margin-right: 10px;
  background-color: #f53b57;
  width: 15px;
  line-height: 10px;
  text-align: center;
  border-radius: 2px;
  color: white;
  position: relative;
}
.number::after {
  content: "";
  display: block;
  border-top: 2px solid transparent;
  border-bottom: 2px solid transparent;
  border-left: 2px solid #f53b57;
  position: absolute;
  top: calc(50% - 2px);
  right: -2px;
}
.button {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50vh;
  background-color: transparent;
}
.createRoom {
  background-color: #f53b57; /* Green */
  border: none;
  color: white;
  padding: 5px 10px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  border-radius: 2px;
  font-size: 5px;
  outline:none
}
.createRoom:hover {
  background-color: #f76e82;
}
</style>
