<template>
  <div
    class="chat-list-page"
  >

    <chat-toolbar
      :title="title"
      @search="search"
    >
      <v-btn
        slot="append"
        icon
        @click="add"
      >
        <v-icon>group_add</v-icon>
      </v-btn>
    </chat-toolbar>

    <v-layout
      row
    >
      <v-flex
        xs12
      >
        <room-list
          :items="rooms"
          @click-room="onClickRoom"
        ></room-list>
      </v-flex>
    </v-layout>

  </div>
</template>

<script>
import routes from '@/router/routes';
import types from '@/stores/types';
import socketEvents from '@/socket';

import ChatToolbar from '@/components/ChatToolbar.vue';
import RoomList from '@/components/RoomList.vue';

export default {
  name: 'ChatHome',
  components: {
    ChatToolbar,
    RoomList,
  },
  data: () => ({
    title: 'Chatting List',
  }),
  computed: {
    rooms() {
      return this.$store.getters.rooms;
    },
  },
  created() {
    console.log(this.$options.name, 'created');
    // 새로운 사용자가 채팅 어플리케이션에 입장
    socketEvents.registerUserLogin((data) => {
      console.log('new user login to app', data);
      this.$store.commit(types.SET_USER_LIST, data);
    });
  },
  beforeDestroy() {
    console.log(this.$options.name, 'beforeDestroy');
    socketEvents.unregisterUserLogin();
  },
  methods: {
    onClickRoom(id) {
      this.$router.push(routes.chatRoom(id));
    },
    search() {
      // this.$emit('search');
    },
    add() {
      // this.$emit('add');
    },
  },
};
</script>
