<template>
  <v-card
    class="chat-room--wrapper"
  >
    <chat-room-toolbar
      :title="title"
    ></chat-room-toolbar>

    <v-list>
      <v-list-tile
        v-for="item in items"
        :key="item.title"
        avatar
      >
        <v-list-tile-avatar>
          <img :src="item.avatar">
        </v-list-tile-avatar>

        <v-list-tile-content>
          <v-list-tile-title v-html="item.title"></v-list-tile-title>
        </v-list-tile-content>

        <v-list-tile-action>
          <v-icon :color="item.active ? 'teal' : 'grey'">chat_bubble</v-icon>
        </v-list-tile-action>
      </v-list-tile>
    </v-list>
  </v-card>
</template>

<script>
import ChatRoomToolbar from '@/components/ChatRoomToolbar.vue';

export default {
  components: {
    ChatRoomToolbar,
  },
  data: () => ({
    title: 'Chatting List',
    items: [
      {
        id: 1,
        name: 'room1',
        members: 10,
      },
      {
        id: 2,
        name: 'room2',
        members: 0,
      },
      {
        id: 3,
        name: 'room3',
        members: 2,
      },
    ],
  }),
  methods: {
  },
};
</script>
