<template>
  <v-app id="chat">
    <v-layout
      row
      align-center
      justify-center
    >
      <v-flex
        xs12
        sm6
      >
        <v-card
          class="chat-wrapper"
        >
          <router-view/>
        </v-card>
      </v-flex>
    </v-layout>
  </v-app>
</template>

<script>

export default {
  name: 'App',
};
</script>
