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
          :items="items"
          @click-room="onClickRoom"
        ></room-list>
      </v-flex>
    </v-layout>

  </div>
</template>

<script>
import routes from '@/constants/routes';
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
    items: [
      {
        id: 1,
        name: 'lily',
        members: 10,
      },
      {
        id: 2,
        name: 'sky',
        members: 0,
      },
      {
        id: 3,
        name: 'japan',
        members: 2,
      },
    ],
  }),
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
