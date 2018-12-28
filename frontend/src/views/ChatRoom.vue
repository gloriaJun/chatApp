<template>
  <v-card
    class="chat-room--wrapper chat-room"
  >
    <v-toolbar
      class="chat-room--toolbar"
      dark
    >
      <v-btn icon>
        <v-icon>arrow_back</v-icon>
      </v-btn>

      <v-toolbar-title
        class="text-xs-center"
      >
        {{ title }} : {{ roomName }}
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
        <v-icon>person_add</v-icon>
      </v-btn>
    </v-toolbar>

    <div class="chat-room--messages">
    </div>

    <v-card-actions
      class="chat-room--input"
    >
      <v-text-field
        v-model="message"
        solo
      ></v-text-field>
    </v-card-actions>
  </v-card>
</template>

<script>
// import routes from '@/routes';
// import ChatRoomToolbar from '@/components/ChatRoomToolbar.vue';

export default {
  components: {
    // ChatRoomToolbar,
  },
  data: () => ({
    title: 'Chatting',
    roomName: '',
    message: '',
  }),
  methods: {
    search() {
      // this.$emit('search');
    },
    add() {
      // this.$emit('add');
    },
  },
};
</script>
