<template>
  <v-toolbar
    class="chat-toolbar"
    color="amber darken-3"
    height="50px"
    dark
  >

    <slot name="prepend"></slot>

    <v-toolbar-title
      class="text-xs-center"
    >
      {{ toolBarTitle }}
    </v-toolbar-title>

    <v-spacer></v-spacer>

    <v-btn
      icon
      @click="search"
    >
      <v-icon>search</v-icon>
    </v-btn>

    <slot name="append"></slot>

  </v-toolbar>
</template>

<script>
export default {
  name: 'ChatToolbar',
  props: {
    title: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      toolBarTitle: this.title,
    };
  },
  watch: {
    title(val) {
      this.toolBarTitle = val;
    },
  },
  methods: {
    search() {
      this.$emit('search');
    },
  },
};
</script>
