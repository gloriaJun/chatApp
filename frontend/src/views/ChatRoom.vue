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
          <chat-messages></chat-messages>
        </div>

        <chat-text-input></chat-text-input>
      </v-flex>
    </v-layout>

  </div>
</template>

<script>
import routes from '@/routes';
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
    message: '',
  }),
  methods: {
    search() {
      // this.$emit('search');
    },
    add() {
      // this.$emit('add');
    },
    onClickGoRoomList() {
      this.$router.push(routes.chatHome);
    },
  },
};
</script>
