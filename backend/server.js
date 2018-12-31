const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');

/**
 * sockets event name of constants
 */
const socketEventName = require('./socket-event-name').default;

/**
 * set env configuration
 */
require('dotenv').config();
const PORT = process.env.SOCKET_PORT || 4000;


/**
 * middleware
 * --> Is important define order??
 */
// for security
app.use(helmet());
app.use(cors());
// for logging
app.use(morgan('tiny'));

/**
 * socket.io
 */
const getRoomName = (id) => `room${id}`;

io.on('connection', (socket) => {
  console.log('socket connected');

  socket.on(socketEventName.joinRoom, (data) => {
    const roomName = getRoomName(data.roomId);

    socket.join(roomName);
    socket.roomName = roomName;

    // console.log(socket.adapter.rooms);
    // console.log(io.sockets.clients());
    // broadcast join message to member
    io.to(roomName).emit(socketEventName.joinRoom, {
      type: 'system',
      message: `${data.username} joined this chatroom`,
    });
  });

  socket.on(socketEventName.chat, (data) => {
    console.log('data : ', data);
    const room = socket.roomName;
    if (room) {
      socket.broadcast.to(room).emit(socketEventName.chat, data);
    }
  });

  // socket.on('disconnect', () => {
  //   console.log('socket disconnected');
  // });
});

// app.get('/', (req, res) => {
//   console.log('hi');
//   res.send('Hellow Chating App Server');
// });

/**
 * open server port
 */
server.listen(PORT, () => {
  console.log(`💡Listening on http://localhost:${PORT}`);
});
