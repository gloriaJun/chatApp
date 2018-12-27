<template>
  <v-layout
    align-center
    justify-center
  >
    <v-flex
      xs12
    >
      <login-form
        @submit-login="login"
      ></login-form>
    </v-flex>
  </v-layout>
</template>

<script>
import LoginForm from '@/components/LoginForm.vue';

export default {
  components: {
    LoginForm,
  },
  methods: {
    login(username) {
      console.log(username);
    },
  },
};
</script>
