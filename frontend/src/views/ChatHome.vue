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
