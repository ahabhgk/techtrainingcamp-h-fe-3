<template>
  <div id="app">
    <router-view></router-view>
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

<style>
</style>
