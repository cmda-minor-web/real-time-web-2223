const {
  ifError
} = require('assert');
// Import required modules
const express = require('express');
const app = express();
const http = require('http').createServer(app);
const path = require('path');
const io = require('socket.io')(http);

// Set the port for the server to listen on
const port = process.env.PORT || 3001;

// Set up middleware to serve static files
app.use(express.static(path.resolve('public')));

// Set the view engine to ejs and set the views directory
app.set('view engine', 'ejs');
app.set('views', './views');

// Set up a route
app.get('/', (req, res) => {
  res.render('index.ejs', {
    //pageTitle: 'Home'
  });
})

// Set up socket.io event handlers
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

http.listen(port, () => {
  console.log('listening on port ', port)
})

/**
 * https://github.com/ju5tu5/barebonechat
   https://socket.io/get-started/chat
 */