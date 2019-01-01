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
          @click-room="joinToChatRoom"
        ></room-list>
      </v-flex>
    </v-layout>

    <v-dialog
      v-model="dialog"
      persistent
      max-width="50%">
      <v-card
        v-if="invitedRoomInfo"
      >
        <v-card-text>
          {{ invitedRoomInfo.name }}에 초대되었습니다. 입장하시겠습니까?
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="green darken-1"
            flat
            @click="closeDialog(false)"
          >
            Disagree
          </v-btn>
          <v-btn
            color="green darken-1"
            flat
            @click="closeDialog(true)"
          >
            Agree
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

  </div>
</template>

<script>
import routes from '@/router/routes';
import socketEvents from '@/socket';

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
    dialog: false,
    invitedRoomInfo: null,
  }),
  computed: {
    rooms() {
      return this.$store.getters.rooms;
    },
  },
  created() {
    console.log(this.$options.name, 'created');
    // 채팅룸 초대에 대한 이벤트 등록
    socketEvents.registerInvite((data) => {
      const { roomId } = data;
      this.invitedRoomInfo = this.rooms.find(obj => obj.id === Number(roomId));
      this.dialog = true;
    });
  },
  beforeDestroy() {
    console.log(this.$options.name, 'beforeDestroy');
    socketEvents.unregisterInvited();
  },
  methods: {
    joinToChatRoom(id) {
      this.$router.push(routes.chatRoom(id));
    },
    closeDialog(isOk) {
      if (isOk) {
        this.joinToChatRoom(this.invitedRoomInfo.id);
      }
      this.dialog = false;
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
