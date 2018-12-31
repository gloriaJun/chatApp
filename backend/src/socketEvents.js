// sockets event name of constants
const socketEventName = require('./socket-event-name').default;

const EVENTS = {
  ERROR: 'error',
  LOGIN: 'login',
};

module.exports = function(io) {

  const getRoomName = (id) => `room${id}`;
  let onLineUserList = [];

  io.on('connection', (socket) => {
    console.log('socket connected', socket.id);

    socket.on(EVENTS.LOGIN, (userInfo, cb) => {
      const { username } = userInfo;

      console.log('is dup ? : ', onLineUserList.includes(username));
      if (onLineUserList.includes(username)) {
        return cb({
          resultCode: -1,
          message: 'Already used username.',
        });
      }

      socket.username = username;
      onLineUserList.push(username);

      return cb(null);
    });

    // socket.on(socketEventName.login, (data) => {
    //   const { username } = data;
    //
    //   socket.username = username;
    //   onLineUserList.push(username);
    //
    //   console.log(data, onLineUserList.length, onLineUserList);
    // });
    //
    // socket.on(socketEventName.joinRoom, (data) => {
    //   const roomName = getRoomName(data.roomId);
    //
    //   socket.join(roomName);
    //   socket.roomName = roomName;
    //
    //   // console.log(socket.adapter.rooms);
    //   // console.log(io.sockets.clients());
    //   // broadcast join message to member
    //   io.to(roomName).emit(socketEventName.joinRoom, {
    //     type: 'system',
    //     message: `${data.username} joined this chatroom`,
    //   });
    // });
    //
    // socket.on(socketEventName.chat, (data) => {
    //   console.log('data : ', data);
    //   const room = socket.roomName;
    //   if (room) {
    //     socket.broadcast.to(room).emit(socketEventName.chat, data);
    //   }
    // });
    //
    // socket.on('disconnect', () => {
    //   const { username } = socket;
    //   console.log('socket disconnected : ', username);
    //
    //   if (onLineUserList.includes(username)) {
    //     onLineUserList = onLineUserList.filter(item => item !== username);
    //   }
    // });
  });
};
