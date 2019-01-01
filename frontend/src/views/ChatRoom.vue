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
        @click="inviteUser"
      >
        <v-icon>person_add</v-icon>
      </v-btn>
    </chat-toolbar>

    <v-navigation-drawer
      v-model="drawer"
      absolute
      temporary
      right
    >
      <user-list
        :items="availableInviteUserList"
        title="초대 가능한 사용자"
        @click="onClickUser"
      ></user-list>
    </v-navigation-drawer>

    <v-layout
      row
    >
      <v-flex
        xs12
      >
        <div
          v-auto-scroll-bottom="messages"
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
import UserList from '@/components/UserList.vue';

export default {
  name: 'ChatRoom',
  components: {
    ChatToolbar,
    ChatMessages,
    ChatTextInput,
    ChatImageUpload,
    UserList,
  },
  props: {
    id: {
      type: [Number, String],
      required: true,
    },
  },
  data: () => ({
    drawer: false,
    roomName: '',
    roomMember: [],
    availableInviteUserList: [],
  }),
  computed: {
    title() {
      return `Chatting : ${this.roomName} (${this.roomMember.length})`;
    },
    username() {
      return this.$store.getters.username;
    },
    userList() {
      return this.$store.getters.userList;
    },
    messages() {
      return this.$store.getters.messages;
    },
    availableInviteUsers() {
      return this.userList.filter(obj => !this.roomMember.includes(obj));
    },
  },
  created() {
    console.log(this.$options.name, 'created');
    // 채팅방에 입장
    socketEvents.join(this.id, (result) => {
      console.log('after joined', result);
      this.roomName = result.data.name;
    });

    socketEvents.registerMemberUpdate((data) => {
      this.roomMember = data.member;
      this.pushMessage(data);
    });

    // 해당 채팅방에 대한 메시지를 응답받기 위한 이벤트 정의
    socketEvents.registerMessage((data) => {
      console.log('broad', data);
      this.pushMessage(data);
    });
  },
  beforeDestroy() {
    console.log(this.$options.name, 'beforeDestroy');
    socketEvents.unregisterChatRoomEvent();
  },
  methods: {
    search() {
      // this.$emit('search');
    },
    inviteUser() {
      socketEvents.availableInviteUsers(this.id, (result) => {
        this.availableInviteUserList = result.data;
        this.drawer = true;
      });
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
    onClickUser(item) {
      socketEvents.inviteUser(this.id, item);
    },
  },
};
</script>
