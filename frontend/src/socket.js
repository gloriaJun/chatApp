import io from 'socket.io-client';

const socket = io(process.env.VUE_APP_SOCKET_URL);

const EVENTS = {
  ERROR: 'error',
  LOGIN: 'login',
  USER_LIST_UPDATE: 'userListUpdate',

  // join to room
  JOIN: 'join',
  LEAVE: 'leave',
  MEMBER_UPDATE: 'memberUpdate',
  MESSAGE: 'message',
  IMAGE: 'image',
};

/**
 * global
 */
socket.on(EVENTS.ERROR, (err) => {
  console.log('Received Socket Error', err);
});

/**
 * define event function
 */
const socketEvents = {
  login: (userInfo, callback) => socket.emit(EVENTS.LOGIN, userInfo, callback),
  join: (roomId, callback) => socket.emit(EVENTS.JOIN, roomId, callback),
  leave: (roomId, callback) => socket.emit(EVENTS.LEAVE, roomId, callback),

  sendMessage: messageInfo => socket.emit(EVENTS.MESSAGE, messageInfo),
  sendImage: imageFile => socket.emit(EVENTS.IMAGE, imageFile),

  // register event for listening
  unregisterUserLogin: () => socket.off(EVENTS.USER_LIST_UPDATE),
  registerUserLogin: onUserLogined => socket.on(EVENTS.USER_LIST_UPDATE, onUserLogined),

  unregisterChatRoomEvent: () => {
    socket.off(EVENTS.MEMBER_UPDATE);
    socket.off(EVENTS.MESSAGE);
  },
  registerMemberUpdate: onMemberJoined => socket.on(EVENTS.MEMBER_UPDATE, onMemberJoined),
  registerMessage: onReceiveMessage => socket.on(EVENTS.MESSAGE, onReceiveMessage),
};

export default socketEvents;
