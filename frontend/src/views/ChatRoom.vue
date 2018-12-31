<template>
  <div
    class="chat-room-page"
  >

    <chat-toolbar
      :title="title"
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
import socketEvents from '@/socket';
// import socketEventName from '@/constants/socket-event-name';
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
    roomName: '',
    roomMember: 0,
  }),
  computed: {
    title() {
      return `Chatting : ${this.roomName} (${this.roomMember})`;
    },
    username() {
      return this.$store.getters.username;
    },
    messages() {
      return this.$store.getters.messages;
    },
  },
  created() {
    console.log('created');
    // 채팅방에 입장
    socketEvents.join(this.id, (result) => {
      console.log('after join', result);
      this.roomName = result.data.name;
    });

    socketEvents.registerMemberUpdate((data) => {
      this.roomMember = data.member.length;
      this.pushMessage(data);
    });

    // 해당 채팅방에 대한 메시지를 응답받기 위한 이벤트 정의
    socketEvents.registerMessage((data) => {
      console.log('broad', data);
      this.pushMessage(data);
    });
  },
  beforeDestroy() {
    console.log('destory');
    socketEvents.unregisterEvent();
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
        roomId: this.id,
        message,
      };

      this.pushMessage(data);
      socketEvents.sendMessage(data);
    },
    onClickGoRoomList() {
      socketEvents.leave(this.id, (result) => {
        console.log('after left', result);
        this.$store.dispatch(types.LEAVE_ROOM, result.data);
      });
      this.$router.push(routes.chatHome);
    },
    pushMessage(data) {
      this.$store.commit(types.PUSH_MESSAGE, data);
    },
  },
};
</script>
