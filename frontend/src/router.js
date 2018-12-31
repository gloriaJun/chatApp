import Vue from 'vue';
import Router from 'vue-router';

import routes from './constants/routes';

import Login from './views/Login.vue';

import ChatHome from './views/ChatHome.vue';
import ChatRoom from './views/ChatRoom.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: routes.login,
      component: Login,
    },
    {
      path: routes.chatHome,
      component: ChatHome,
    },
    {
      path: routes.chatRoom(),
      component: ChatRoom,
      props: true,
    },
  ],
});
