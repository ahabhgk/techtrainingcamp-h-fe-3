<template>
  <div id="app">
    <transition name="fade" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import { provideRouter } from 'utils/use-router';

export default {
  name: 'App',
  components: {
  },
  setup(props, context) {
    provideRouter(context.root.$router);
  },
};
</script>

<style lang="scss">
#app {
  background-color: #192033;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .2s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
