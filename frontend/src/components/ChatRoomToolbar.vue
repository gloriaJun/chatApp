<template>
  <v-toolbar
    color="amber darken-3"
    dark
  >
    <v-toolbar-title
      class="text-xs-center"
    >
      {{ title }}
    </v-toolbar-title>

    <v-spacer></v-spacer>

    <v-btn
      icon
      @click="search"
    >
      <v-icon>search</v-icon>
    </v-btn>

    <v-btn
      icon
      @click="add"
    >
      <v-icon>{{ addIcon }}</v-icon>
    </v-btn>
  </v-toolbar>
</template>

<script>
export default {
  name: 'ChatRoomToolbar',
  props: {
    title: {
      type: String,
      default: '',
    },
    addIcon: {
      type: String,
      default: 'group_add',
    },
  },
  data: () => ({
  }),
  methods: {
    search() {
      this.$emit('search');
    },
    add() {
      this.$emit('add');
    },
  },
};
</script>
