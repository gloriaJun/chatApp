<template>
  <v-layout
    class="chat-messages"
    row
    wrap
  >
    <v-flex
      v-for="(item, index) in items"
      :key="index"
      xs12
    >
      <v-card
        v-if="item.type === 'system'"
        color="grey lighten-2"
        flat
      >
        <v-card-text
          class="grey--text"
        >
          {{ item.message }}
        </v-card-text>
      </v-card>

      <v-card
        v-else
        class="chat-message-box"
        :class="item.isOwn ? 'chat-right' : 'chat-left'"
        flat
      >
        <v-card-title
          class="chat-username"
        >
          <div
            class="grey--text"
          >{{ !item.isOwn ? item.username : '' }}</div>
        </v-card-title>

        <v-img
          v-if="item.type === 'image'"
          :src="item.imageUrl"
          class="chat-image"
          max-width="400px"
          contain
        ></v-img>

        <v-card-text
          class="chat-message"
        >
          {{ item.message }}
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  name: 'ChatMessages',
  props: {
    items: {
      type: [Object, Array],
      default: () => [],
    },
  },
};
</script>

<style lang="stylus" scoped>
.chat-messages
  .chat-username
    padding-bottom 0;

  .chat-message
    padding-top 0;
    word-wrap: break-word;

  .chat-image
    margin: 0 16px;

  .chat-message-box
    border-color #e0e0e0 !important;
    border-radius: 1rem;
    min-width 40%
    max-width 60%
    margin: 5px;

    &.chat-right
      background-color #81D4FA !important;
      float right;

    &.chat-left
      background-color #C5E1A5 !important;
      float left;
</style>
