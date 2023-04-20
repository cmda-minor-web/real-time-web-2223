/*
https://socket.io/get-started/chat
*/
const {
  ifError
} = require('assert')
const express = require('express')
const app = express()
const http = require('http').createServer(app)
const path = require('path')
const io = require('socket.io')(http)
const port = process.env.PORT || 3001

app.use(express.static(path.resolve('public')))
const typers = {}
// route handler
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  console.log('a user connected')

  socket.on('newMessage', (message) => {

    io.emit('sendMessage', {
      message: message,
      user: socket.username
    });

  })

  socket.on('newUser', (user) => {
    socket.username = user;
    console.log('User connected - Username: ' + socket.username);
  });

  socket.on("typing", (data) => {
    socket.broadcast.emit("typing", data);
  });

  socket.on('disconnect', () => {
    console.log('user disconnected')
  })
})

// function callApi(io) {
//   io.emit('message', 'whatever')
// }

http.listen(port, () => {
  console.log('listening on port ', port)
})

/**
 * https://github.com/ju5tu5/barebonechat
 */