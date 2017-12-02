const express           = require('express');
const http              = require('http');
const path              = require('path');
const initializeSockets = require('./socket');
const Database          = require('./db/db');

const root = '';
const port = process.env.PORT || '3000';

// init express app
const app = express();

// define apis

// define static path
app.use(express.static(path.join(__dirname, root)));

// route apis

// redirect to index for other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// get and set port
app.set('port', port);

// init html server
let server = http.createServer(app);
//let db = new Database();

// init socket
initializeSockets(server);

//db.users.get(user).subscribe((id) => ioInit(io, id, db));
//let io = require('socket.io')(http); io.on('connection', (socket) => { console.log('user connected'); socket.on('disconnect', function(){ console.log('user disconnected'); }); socket.on('add-message', (message) => { io.emit('message', {type:'new-message', text: message}); }); });
server.listen(port, () => console.log(`mndlsrv running:${port}`));
