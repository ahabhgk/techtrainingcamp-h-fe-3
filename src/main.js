import Vue from 'vue';
import VueCompositionAPI from '@vue/composition-api';
import App from './App.vue';
import router from './routers';
import 'normalize.css/normalize.css';

Vue.use(VueCompositionAPI);

Vue.config.productionTip = true;

new Vue({
  render: (h) => h(App),
  router,
}).$mount('#app');
