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

      <v-alert
        :value="!!errorMessage"
        type="error"
      >
        {{ errorMessage }}
      </v-alert>

      <login-form
        @connect="connect"
      ></login-form>

    </v-flex>
  </v-layout>
  </v-container>
</template>

<script>
import types from '@/stores/types';
import socketEvents from '@/socket';

import routes from '@/router/routes';
import LoginForm from '@/components/LoginForm.vue';

export default {
  components: {
    LoginForm,
  },
  data: () => ({
    errorMessage: '',
  }),
  methods: {
    connect(username) {
      const data = { username };

      this.errorMessage = '';

      socketEvents.login(data, (result) => {
        if (!result.isSuccess) {
          console.log(result);
          this.errorMessage = result.message;
        } else {
          this.$store.dispatch(types.LOGIN, {
            ...data,
            rooms: Array.from(result.data),
          });

          // after connected, go chatting room list page
          this.$router.replace(routes.chatHome);
        }
      });
    },
  },
};
</script>
