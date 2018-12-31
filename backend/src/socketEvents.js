import chatRoomModel from './model/chatRoomModel';

// sockets event name of constants
const socketEventName = require('./socket-event-name').default;

const EVENTS = {
  ERROR: 'error',
  LOGIN: 'login',
};

module.exports = function(io) {

  let onLineUserList = [];
  let roomList = [];

  const getRoomName = (id) => `room${id}`;
  const setResultData = (isSuccess, data) => {
    return !isSuccess
        ? {
          isSuccess,
          message: data,
        }
        : {
          isSuccess,
          ...data,
        };

  }

  io.on('connection', (socket) => {
    console.log('socket connected', socket.id);

    socket.on(EVENTS.LOGIN, async (userInfo, cb) => {
      const { username } = userInfo;

      if (onLineUserList.includes(username)) {
        return cb(setResultData(false, 'Already used username.'));
      }

      socket.username = username;
      onLineUserList.push(username);

      console.log(onLineUserList);

      return cb(setResultData(true, {
        data: await chatRoomModel.getChatRooms()
      }));
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

    // client.on('join', handleJoin)
    //
    // client.on('leave', handleLeave)
    //
    // client.on('message', handleMessage)
    //
    // client.on('chatrooms', handleGetChatrooms)
    //
    // client.on('availableUsers', handleGetAvailableUsers)
    // client.on('disconnect', function () {
    //   console.log('client disconnect...', client.id)
    //   handleDisconnect()
    // })
    //
    // client.on('error', function (err) {
    //   console.log('received error from client:', client.id)
    //   console.log(err)
    // })
  });
};
