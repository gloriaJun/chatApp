import Vue from 'vue';
import Router from 'vue-router';

import Login from './views/Login.vue';
import ChatRoomList from './views/ChatRoomList.vue';
// import ChatRoom from './views/ChatRoom.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login,
    },
    {
      path: '/room/list',
      name: 'ChatRoomList',
      component: ChatRoomList,
    },
    // {
    //   path: '/room/chat',
    //   name: 'ChatRoom',
    //   component: ChatRoom,
    // },
  ],
});
