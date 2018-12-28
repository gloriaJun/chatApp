<template>
  <div class="about">
    <h1>Chatting Room List</h1>
  </div>
</template>

<script>
export default {
  components: {
  },
  data: () => ({
    list: [
      {
        id: 1,
        name: 'room1',
        members: 10,
      },
      {
        id: 2,
        name: 'room2',
        members: 0,
      },
      {
        id: 3,
        name: 'room3',
        members: 2,
      },
    ],
  }),
  methods: {
  },
};
</script>
