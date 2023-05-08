import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
import http from 'http';
import handlebars from 'express-handlebars';
import { Server } from 'socket.io';
import fetch from 'node-fetch';

dotenv.config();

const app = express();
const port = process.env.PORT || 4400;
const server = http.createServer(app);
const io = new Server(server);
const __dirname = path.resolve();
const historySize = 50
let history = []

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

let username;
let users = [];
let genre;
let books = [];
let currentBook = {};
let activeRooms = [];

async function chooseGenre(genre) {
    const bookQueryByGenre = await fetch(`https://www.googleapis.com/books/v1/volumes?q=subject:${genre}&orderBy=relevance&maxResults=10&key=${process.env.API_KEY}`);
    const result = await bookQueryByGenre.json();
    return result.items.map((item) => item.volumeInfo);
}

function fetchRandomBook() {
    const randomBookIndex = Math.floor(Math.random() * books.length);
    return books[randomBookIndex];
}

app.get('/', async function (req, res) {
    res.render('main', { layout: 'index' });
});

app.get('/raad-het-boek', async function (req, res) {
    username = req.query.username;
    genre = req.query.genre;

    console.log('Users: ' + JSON.stringify(users));
    console.log(JSON.stringify(users.map((user) => user.username)));
    const user = users.find((user) => user.username === username);
    console.log('User: ' + JSON.stringify(user));

    if (!user) {
        console.log('User not found');
        res.redirect('/');
        return;
    }

    console.log('/raad-het-boek123, username: ' + username, 'genre: ' + genre)

    // books = await chooseGenre(genre);
    console.log('/raad-het-boek, ingeladen boeken: ' + books.length)

    // currentBook = fetchRandomBook()
    console.log('/raad-het-boek, random boek: ' + currentBook)

    res.render('genres', { layout: 'index', name: username, genre: genre, result: currentBook });
});

app.get('/chat/:roomName', async function (req, res) {
    // const username = req.query.username;
    // const genre = req.query.genre;
    // const currentBook = req.query.currentBook;

    console.log('Chatroom ' + username, genre);

    res.render('chat', { layout: 'index', name: username, genre: genre, result: currentBook });
});

io.on('connection', (socket) => {
    console.log('a user connected');
    // console.log('testestest ' + username)

    socket.on('newUser', (data) => {
        console.log('DATA ' + JSON.stringify(data))
        console.log('new user: ' + data.username + ' ' + data.genre);
        genre = data.genre;
        const user = {
            username: data.username,
            genre: data.genre,
            id: socket.id
        }
        users.push(user);

        io.emit('users', users);
    });

    socket.emit('history', history);

    socket.on('tryTitleBook', async (titleBook) => {
        console.log(titleBook.toLowerCase());
        const guessedTitleBook = titleBook.toLowerCase();
        const currentBookTitle = currentBook.title;
        const currentBookTitleLowerCase = currentBook.title.toLowerCase();
        if (guessedTitleBook === currentBookTitleLowerCase) {
            console.log('Gewonnen', currentBookTitle);
            socket.emit('win', currentBookTitle)
        } else {
            console.log('Verloren');
            socket.emit('lose', currentBookTitle)
        }
    });

    socket.on('createRoom', (roomName) => {
        console.log(`Creating room ${roomName} for user ${username}`);
        const socketRooms = socket.rooms;
        console.log('socket rooms' + socketRooms);
        if (!roomName) {
            console.log('No roomname');
            return;
        }

        if (activeRooms.includes(roomName)) {
            console.log(`User ${username} joined room ${roomName}`);
            socket.join(`${roomName}`);
            socket.emit("roomJoined", roomName, username);
        } else {
            console.log(`Room ${roomName} does not exist`);
            activeRooms.push(roomName);
            console.log('Activerooms:' + activeRooms);
            socket.emit('roomCreated', roomName, username);
        }
    });

    socket.on('chat', (data) => {
        let guessedBook = data.guessedBook;
        console.log('TEST: ' + guessedBook);
        console.log(data + ' username: ' + username);
        while (history.length > historySize) {
            history.shift()
        }
        history.push(data)
        io.sockets.emit("chat", data, username);
    });

    socket.on('typing', (inputName) => {
        console.log("Aan het typen");
        socket.broadcast.emit("typing", inputName);
    });

    socket.on('disconnect', () => {
        console.log('user disconnected')
    })
});

server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
