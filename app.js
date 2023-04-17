import express from 'express';
import httpModule from 'http';
import { Server } from 'socket.io';
import path from 'path';

const app = express();
const http = httpModule.createServer(app);
const io = new Server(http);
const port = process.env.PORT || 4242;

app.use(express.static(path.resolve('public')));

app.get('/', (request, response) => {
  response.sendFile(path.resolve('public', 'index.html'));
});

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

  socket.on('message', (message) => {
    console.log('message:', message);
    io.emit('message', message);
  });
});

http.listen(port, () => {
  console.log(`listening on ${port}`);
});
