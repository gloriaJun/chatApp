<template>
  <v-list>
    <v-list-tile
      v-for="item in items"
      :key="item.id"
      avatar
      @click='onClickList(item)'
    >
      <v-list-tile-avatar
        color="indigo"
      >
          <span
            class="white--text headline"
          >
            {{ item.name.charAt(0).toUpperCase() }}
          </span>
      </v-list-tile-avatar>

      <v-list-tile-content>
        <v-list-tile-title v-html="item.name"></v-list-tile-title>
      </v-list-tile-content>
    </v-list-tile>
  </v-list>
</template>

<script>
export default {
  name: 'RoomList',
  props: {
    items: {
      type: [Object, Array],
      default: () => [],
    },
  },
  data: () => ({
  }),
  methods: {
    onClickList(item) {
      this.$emit('click-room', item.id);
    },
  },
};
</script>
