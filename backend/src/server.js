const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');

/**
 * set env configuration
 */
require('dotenv').config();
const PORT = process.env.SOCKET_PORT || 4000;

/**
 * socket events
 */
require('./socketEvents')(io);


/**
 * middleware
 * --> Is important define order??
 */
// for security
app.use(helmet());
app.use(cors());
// for logging
app.use(morgan('tiny'));

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
