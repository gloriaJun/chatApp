import io from 'socket.io-client';

const socket = io(process.env.VUE_APP_SOCKET_URL);

const EVENTS = {
  ERROR: 'error',
  LOGIN: 'login',
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
};

export default socketEvents;
