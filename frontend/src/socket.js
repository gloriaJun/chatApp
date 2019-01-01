import io from 'socket.io-client';

const socket = io(process.env.VUE_APP_SOCKET_URL);

const EVENTS = {
  ERROR: 'error',
  LOGIN: 'login',

  // join to room
  JOIN: 'join',
  LEAVE: 'leave',
  MEMBER_UPDATE: 'memberUpdate',
  MESSAGE: 'message',
  IMAGE: 'image',
  AVAILABLE_INVITE_USERS: 'availableInviteUsers',
  INVITE: 'invite',
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
  availableInviteUsers: (roomId, callback) => socket.emit(
    EVENTS.AVAILABLE_INVITE_USERS,
    roomId,
    callback,
  ),
  inviteUser: (roomId, userInfo) => socket.emit(EVENTS.INVITE, roomId, userInfo),

  // register event for listening
  unregisterInvited: () => socket.off(EVENTS.INVITE),
  registerInvite: onUserInvited => socket.on(EVENTS.INVITE, onUserInvited),

  unregisterChatRoomEvent: () => {
    socket.off(EVENTS.MEMBER_UPDATE);
    socket.off(EVENTS.MESSAGE);
  },
  registerMemberUpdate: onMemberJoined => socket.on(EVENTS.MEMBER_UPDATE, onMemberJoined),
  registerMessage: onReceiveMessage => socket.on(EVENTS.MESSAGE, onReceiveMessage),
};

export default socketEvents;
