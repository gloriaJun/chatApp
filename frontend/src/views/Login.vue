<template>
  <v-layout
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
import LoginForm from '@/components/LoginForm.vue';

export default {
  components: {
    LoginForm,
  },
  methods: {
    connect(username) {
      console.log(username);
      // need to check username is duplicate or not

      // after login, go chatting room list page
    },
  },
};
</script>

<style>
</style>
