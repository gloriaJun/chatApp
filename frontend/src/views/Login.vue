<template>
  <v-container
    class="login-page"
    fluid
    fill-height
  >

  <v-layout
    align-center
    justify-center
  >
    <v-flex
      xs12
      sm6
      md4
    >
      <login-form
        @connect="connect"
      ></login-form>
    </v-flex>
  </v-layout>
  </v-container>
</template>

<script>
import types from '@/stores/types';

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
      this.$store.dispatch(types.LOGIN, { username });

      // after connected, go chatting room list page
      this.$router.replace(routes.chatHome);
    },
  },
};
</script>
