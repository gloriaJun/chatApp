<template>
  <v-list
    class="chat-messages"
    two-line>
    <template v-for="(item, index) in items">
      <v-list-tile
        :key="index"
        avatar
        ripple
      >
        <v-list-tile-content>
          <v-list-tile-title>{{ item.username }}, {{ index }}</v-list-tile-title>
          <v-list-tile-sub-title>{{ item.message }}</v-list-tile-sub-title>
        </v-list-tile-content>

        <v-list-tile-action>
          <v-list-tile-action-text>{{ item.action }}</v-list-tile-action-text>
        </v-list-tile-action>

      </v-list-tile>
      <v-divider
        v-if="index + 1 < items.length"
        :key="index"
      ></v-divider>
    </template>
  </v-list>
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
  data: () => ({
  }),
  computed: {
  },
  methods: {
  },
};
</script>

<style lang="stylus">
</style>
