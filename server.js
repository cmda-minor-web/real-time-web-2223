import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
import http from 'http';
import handlebars from 'express-handlebars';
import { router } from './router/routes.js';
import { Server } from 'socket.io';

dotenv.config();

const app = express();
const port = process.env.PORT || 4400;
const server = http.createServer(app);
const io = new Server(server);
const __dirname = path.resolve();
const historySize = 50
let history = []
let randomBook = {}

app.set('view engine', 'hbs');
app.set('views', 'views')

app.use('/', express.static(__dirname + '/'));
app.use(express.static(path.resolve('public')));

app.engine('hbs', handlebars.engine({
    layoutsDir: __dirname + '/views/layouts',
    extname: 'hbs',
    defaultLayout: 'index',
    partialsDir: __dirname + '/views/partials',
}))

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.emit('history', history)

    socket.on('chat', (data) => {
        console.log(data);
        while (history.length > historySize) {
            history.shift()
        }
        history.push(data)
        io.sockets.emit("chat", data);
    });

    socket.on('typing', (inputName) => {
        console.log("Aan het typen");
        socket.broadcast.emit("typing", inputName);
    });

    socket.on('tryTitleBook', (titleBook) => {
        console.log(titleBook);

    });

    socket.on('disconnect', () => {
        console.log('user disconnected')
    })
});

app.use('/', router);

server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
