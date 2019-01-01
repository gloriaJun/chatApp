import Vue from 'vue';
import './plugins/vuetify';
import './socket';

import App from './App.vue';
import router from './router';
import store from './stores';

import './styles/app.styl';

import './directives/auto-scroll';

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
