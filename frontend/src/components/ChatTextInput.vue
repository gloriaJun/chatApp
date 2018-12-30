<template>
  <div
    class="chat-text-input"
  >
    <input
      v-model="message"
      :placeholder="placeholder"
      @keyup.enter="send"
    >
    <v-icon
      class="icon-send"
      @click="send"
    >send</v-icon>
  </div>
</template>

<script>
export default {
  name: 'ChatTextInput',
  props: {
    placeholder: {
      type: String,
      default: '',
    },
  },
  data: () => ({
    message: '',
  }),
  methods: {
    send() {
      if (this.message === '') {
        return;
      }
      this.$emit('send', this.message);
      this.message = '';
    },
  },
};
</script>

<style lang="stylus">
.chat-text-input
  position relative;

  input
    width 100%;
    height 100%;
    border 2px solid rgba(0,0,0,0.54);
    border-radius 5px;
    padding .8rem .5rem;
    padding-right calc(.8rem * 3);

    &:focus
      outline none;

  .icon-send
    position absolute;
    right 0;
    padding .8rem .5rem;
    color rgba(0,0,0,0.54);
</style>
