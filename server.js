const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

const port = process.env.PORT || 8080;  // this is the port we'll listen on

app.get('/api', (req, res) => {  // whenever a get request is received at this route, send index.html
  res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' });
});

io.on('connection', (socket) => { // when a socket connects
  console.log('a user connected');
  socket.on('disconnect', () => { // when a socket disconnects
    console.log('user disconnected');
  });
  socket.on('hello', (msg) => {  // when a chat message event occurs
    console.log(msg);
    io.emit('hello', msg);
  });
});

server.listen(port, () => {
  console.log(`listening on *:${port}`);
});
