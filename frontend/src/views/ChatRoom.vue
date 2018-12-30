<template>
  <div
    class="chat-room-page"
  >

    <chat-toolbar
      :title="`${title} : ${roomName}`"
      @search="search"
    >
      <v-btn
        slot="prepend"
        icon
        @click="onClickGoRoomList"
      >
        <v-icon>arrow_back</v-icon>
      </v-btn>

      <v-btn
        slot="append"
        icon
        @click="add"
      >
        <v-icon>person_add</v-icon>
      </v-btn>
    </chat-toolbar>

    <v-layout
      row
    >
      <v-flex
        xs12
      >
        <div
          class="chat-messages-container"
        >
          <chat-messages
            :items="messages"
          ></chat-messages>
        </div>

        <v-layout
          class="chat-message-input"
        >
          <v-flex xs1>
            <v-btn
              icon
            >
              <v-icon>add_photo_alternate</v-icon>
            </v-btn>
          </v-flex>
          <v-flex xs11>
            <chat-text-input
              placeholder="Input Message"
              @send="messageSend"
            ></chat-text-input>
          </v-flex>
        </v-layout>

      </v-flex>
    </v-layout>

  </div>
</template>

<script>
import routes from '@/constants/routes';
import socketEventName from '@/constants/socket-event-name';
import types from '@/stores/types';

import ChatToolbar from '@/components/ChatToolbar.vue';
import ChatMessages from '@/components/ChatMessages.vue';
import ChatTextInput from '@/components/ChatTextInput.vue';

export default {
  components: {
    ChatToolbar,
    ChatMessages,
    ChatTextInput,
  },
  data: () => ({
    title: 'Chatting',
    roomName: '',
  }),
  computed: {
    messages() {
      return this.$store.getters.messages;
    },
  },
  created() {
    this.$socket.on(socketEventName.chat, (data) => {
      console.log('broad', data);
      this.pushMessage(data);
    });
  },
  methods: {
    search() {
      // this.$emit('search');
    },
    add() {
      // this.$emit('add');
    },
    messageSend(message) {
      const data = {
        username: this.$store.getters.username,
        message,
      };

      this.pushMessage(data);
      this.$socket.emit(socketEventName.chat, data);
    },
    onClickGoRoomList() {
      this.$router.push(routes.chatHome);
    },
    pushMessage(data) {
      this.$store.commit(types.SET_MESSAGES, data);
    },
  },
};
</script>
