export default {
  data: [
    {
      id: 1,
      name: 'lily',
    },
    {
      id: 2,
      name: 'sky',
    },
    {
      id: 3,
      name: 'japan',
    },
    {
      id: 4,
      name: 'one',
    },
    {
      id: 30,
      name: 'vuejs',
    },
  ],

  getChatRooms() {
    return Promise.resolve(this.data);
  },
}
