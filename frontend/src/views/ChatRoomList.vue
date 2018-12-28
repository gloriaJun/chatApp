<template>
  <v-card
    class="chat-room--wrapper"
  >
    <v-toolbar
      class="chat-room--toolbar"
      dark
    >
      <v-toolbar-title
        class="text-xs-center"
      >
        {{ title }}
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn
        icon
        @click="search"
      >
        <v-icon>search</v-icon>
      </v-btn>

      <v-btn
        icon
        @click="add"
      >
        <v-icon>group_add</v-icon>
      </v-btn>
    </v-toolbar>

    <v-list>
      <v-list-tile
        v-for="item in items"
        :key="item.id"
        avatar
        @click='onClickList'
      >
        <v-list-tile-avatar
          color="indigo"
        >
          <span
            class="white--text headline"
          >
            {{ item.name.charAt(0).toUpperCase() }}
          </span>
        </v-list-tile-avatar>

        <v-list-tile-content>
          <v-list-tile-title v-html="item.name"></v-list-tile-title>
        </v-list-tile-content>

        <v-list-tile-action>
          <v-icon :color="item.active ? 'teal' : 'grey'">chat_bubble</v-icon>
        </v-list-tile-action>
      </v-list-tile>
    </v-list>
  </v-card>
</template>

<script>
import routes from '@/routes';
// import ChatRoomToolbar from '@/components/ChatRoomToolbar.vue';

export default {
  components: {
    // ChatRoomToolbar,
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
    onClickList(id) {
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
