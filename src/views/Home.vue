<template>
  <div class="home">
    <div>{{ state.value }}</div>
    <button @click="dec"> - </button>
    <button @click="inc"> + </button>
  </div>
</template>

<script>
import { reactive, watchEffect } from '@vue/composition-api';

export default {
  name: 'Home',
  components: {},
  setup() {
    const state = reactive({ value: 0 });

    const inc = () => {
      state.value += 1;
    };

    const dec = () => {
      state.value -= 1;
    };

    watchEffect(() => {
      console.log(state.value);
    });

    return {
      state,
      inc,
      dec,
    };
  },
};
</script>
<style scoped>
</style>
