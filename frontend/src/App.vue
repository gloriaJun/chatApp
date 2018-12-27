<template>
  <v-app>
    <v-content>
      <v-container
        fluid
        fill-height
      >
        <v-layout
          align-center
          justify-center
        >
          <v-card
            width="400"
            height="600"
          >
            <v-container
              fill-height
            >
              <router-view/>
            </v-container>
          </v-card>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>

export default {
  name: 'App',
  data() {
    return {
    };
  },
};
</script>

<style lang="stylus">
</style>
