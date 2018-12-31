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
import routes from '@/router/routes';
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
  props: {
    id: {
      type: [Number, String],
      required: true,
    },
  },
  data: () => ({
    title: 'Chatting',
    roomName: '',
  }),
  computed: {
    username() {
      return this.$store.getters.username;
    },
    messages() {
      return this.$store.getters.messages;
    },
  },
  created() {
    // 채팅방에 입장하였음을 전송
    this.$socket.emit(socketEventName.joinRoom, {
      roomId: this.id,
      username: this.username,
    });

    // 채팅방 접속 유저에 대한 알림
    this.$socket.on(socketEventName.joinRoom, (data) => {
      console.log('join', data);
      this.pushMessage(data);
    });

    // 해당 채팅방에 대한 메시지를 응답받기 위한 이벤트 정의
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
        username: this.username,
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
