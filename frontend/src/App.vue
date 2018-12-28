<template>
  <v-app id="chat-app">
    <v-layout
      align-center
      justify-center
    >
      <v-flex
        xs12
        sm6
        class="chat-wrapper"
      >
        <router-view/>
      </v-flex>
    </v-layout>
  </v-app>
</template>

<script>

export default {
  name: 'App',
};
</script>
