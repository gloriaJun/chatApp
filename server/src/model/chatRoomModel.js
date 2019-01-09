export default {
  data: [
    {
      id: 1,
      name: 'lily',
      member: [],
    },
    {
      id: 2,
      name: 'sky',
      member: [],
    },
    {
      id: 3,
      name: 'japan',
      member: [],
    },
    {
      id: 4,
      name: 'one',
      member: [],
    },
    {
      id: 30,
      name: 'vuejs',
      member: [],
    },
  ],

  getChatRooms() {
    return Promise.resolve(this.data);
  },

  addChatRoomMember(id, userInfo) {
    this.data = this.data.map(obj => {
      if (obj.id === Number(id)) {
        obj.member.push(userInfo);
      }
      return obj;
    });
  },

  delChatRoomMember(id, userInfo) {
    this.data = this.data.map(obj => {
      if (obj.id === Number(id)) {
        obj.member = obj.member.filter(obj => obj.id !== userInfo.id);
      }
      return obj;
    });
  },

  getChatRoom(id) {
    return this.data.find(obj => obj.id === Number(id));
  }
}
