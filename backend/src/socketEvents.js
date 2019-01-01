import chatRoomModel from './model/chatRoomModel';

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

module.exports = function(io) {

  let onLineUserList = [];

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

    function isUserExist(username) {
      return onLineUserList.find(obj => obj.username === username);
    }

    function updateOnlineUserList() {
      socket.broadcast.emit(EVENTS.USER_LIST_UPDATE, onLineUserList);
    }

    function broadcastMessage(data) {
      const {
        username,
        roomName,
      } = socket;

      if (roomName) {
        socket.broadcast.to(roomName).emit(EVENTS.MESSAGE, {
          username: username,
          ...data,
        });
      }
    }

    socket.on('error', function (err) {
      console.log('received error from client:', socket.id);
      console.log(err);
    })

    socket.on(EVENTS.LOGIN, async (userInfo, cb) => {
      const { username } = userInfo;

      if (isUserExist(username)) {
        return cb(setResultData(false, 'Already used username.'));
      }

      socket.username = username;
      onLineUserList.push({
        id: socket.id,
        username,
      });

      updateOnlineUserList();

      return cb(setResultData(true, {
        users: onLineUserList,
        rooms: await chatRoomModel.getChatRooms(),
      }));
    });

    socket.on(EVENTS.JOIN, async (roomId, cb) => {
      const roomName = getRoomName(roomId);

      socket.join(roomName);
      socket.roomName = roomName;

      chatRoomModel.addChatRoomMember(roomId, {
        id: socket.id,
        username: socket.username,
      });

      const roomInfo = chatRoomModel.getChatRoom(roomId);

      // broadcast join message to member
      io.to(roomName).emit(EVENTS.MEMBER_UPDATE, {
        type: 'system',
        message: `${socket.username} joined this chatroom`,
        member: roomInfo.member,
      });

      return cb(setResultData(true, {
        data: roomInfo,
      }));
    });

    socket.on(EVENTS.LEAVE, async (roomId, cb) => {
      const roomName = getRoomName(roomId);

      socket.leave(roomName);
      socket.roomName = null;

      chatRoomModel.delChatRoomMember(roomId, {
        id: socket.id,
        username: socket.username,
      });

      // broadcast join message to member
      io.to(roomName).emit(EVENTS.MEMBER_UPDATE, {
        type: 'system',
        message: `${socket.username} left this chatroom`,
        member: chatRoomModel.getChatRoom(roomId).member,
      });

      return cb(setResultData(true, {
        data: await chatRoomModel.getChatRooms(),
      }));
    });

    socket.on(EVENTS.MESSAGE, data => broadcastMessage(data));
    socket.on(EVENTS.IMAGE, data => broadcastMessage(data));

    socket.on('disconnect', () => {
      const { username } = socket;
      console.log('socket disconnected : ', username);

      if (isUserExist(username)) {
        onLineUserList = onLineUserList.filter(item => item.username !== username);
      }

      updateOnlineUserList();
    });
  });
};
