<template>
  <v-app id="chat-app">
    <router-view/>
  </v-app>
</template>

<script>
import io from 'socket.io-client';
io('http://localhost:3000');

export default {
  name: 'App',
  mounted() {
  },
};
</script>
