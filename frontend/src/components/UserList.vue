<template>
  <v-list>
    <v-subheader
      v-if="title"
    >
      {{ title }}
    </v-subheader>

    <v-list-tile
      v-for="item in items"
      :key="item.id"
      avatar
      subheader
      @click='onClickList(item)'
    >
      <v-list-tile-avatar
        color="indigo"
      >
          <span
            class="white--text headline"
          >
            {{ item.username.charAt(0).toUpperCase() }}
          </span>
      </v-list-tile-avatar>

      <v-list-tile-content>
        <v-list-tile-title v-html="item.username"></v-list-tile-title>
      </v-list-tile-content>
    </v-list-tile>
  </v-list>
</template>

<script>
export default {
  name: 'UserList',
  props: {
    title: {
      type: String,
      default: '',
    },
    items: {
      type: [Object, Array],
      default: () => [],
    },
  },
  methods: {
    onClickList(item) {
      this.$emit('click', item);
    },
  },
};
</script>
