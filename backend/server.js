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
io.on('connection', (socket) => {
  console.log('socket connected');

  socket.on(socketEventName.chat, (data) => {
    console.log('data : ', data);

    // socket.broadcast.emit는 나를 제외한 모두에게 전달
    socket.broadcast.emit(socketEventName.chat, data);
    // 걍 모두에게 전달
    // io.emit(socketEventName.chat, data);
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
