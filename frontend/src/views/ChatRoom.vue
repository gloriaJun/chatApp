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
        <div class="chat-messages-container">
          <chat-messages
            :items="messages"
          ></chat-messages>
        </div>
        <!--
        <chat-messages
          :items="messages"
          class="chat-messages-container"
        ></chat-messages>
        -->

        <v-layout
          class="chat-message-input"
        >
          <v-flex xs1>
            <chat-image-upload
              @upload="sendImage"
            >
            </chat-image-upload>
          </v-flex>
          <v-flex xs11>
            <chat-text-input
              placeholder="Input Message"
              @send="sendMessage"
            ></chat-text-input>
          </v-flex>
        </v-layout>

      </v-flex>
    </v-layout>

  </div>
</template>

<script>
import routes from '@/router/routes';
import types from '@/stores/types';
import socketEvents from '@/socket';

import ChatToolbar from '@/components/ChatToolbar.vue';
import ChatMessages from '@/components/ChatMessages.vue';
import ChatTextInput from '@/components/ChatTextInput.vue';
import ChatImageUpload from '@/components/ChatImageUpload.vue';

export default {
  components: {
    ChatToolbar,
    ChatMessages,
    ChatTextInput,
    ChatImageUpload,
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
    sendMessage(message) {
      const data = {
        roomId: this.id,
        type: 'message',
        message,
      };

      this.pushMessage(data, true);
      socketEvents.sendMessage(data);
    },
    sendImage(imageSrc) {
      const data = {
        roomId: this.id,
        type: 'image',
        imageUrl: imageSrc,
      };

      this.pushMessage(data, true);
      socketEvents.sendImage(data);
    },
    onClickGoRoomList() {
      socketEvents.leave(this.id, (result) => {
        console.log('after left', result);
        this.$store.dispatch(types.LEAVE_ROOM, result.data);
      });
      this.$router.push(routes.chatHome);
    },
    pushMessage(data, isOwn = false) {
      this.$store.commit(types.PUSH_MESSAGE, {
        ...data,
        isOwn,
      });
    },
  },
};
</script>
