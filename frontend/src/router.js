import Vue from 'vue';
import Router from 'vue-router';

import routes from './routes';

import Login from './views/Login.vue';

import ChatRoomList from './views/ChatRoomList.vue';
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
      path: routes.chatRoomList,
      component: ChatRoomList,
    },
    {
      path: routes.chatRoom,
      component: ChatRoom,
    },
  ],
});
