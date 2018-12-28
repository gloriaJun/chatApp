<template>
  <v-layout
    class="login-page"
    align-center
    justify-center
    fill-height
  >
    <v-flex
      xs8
    >
      <login-form
        @connect="connect"
      ></login-form>
    </v-flex>
  </v-layout>
</template>

<script>
import routes from '@/routes';
import LoginForm from '@/components/LoginForm.vue';

export default {
  components: {
    LoginForm,
  },
  methods: {
    connect(username) {
      console.log(username);
      // need to check username is duplicate or not

      // after connected, go chatting room list page
      this.$router.replace(routes.chatRoomList);
    },
  },
};
</script>

<style>
</style>
