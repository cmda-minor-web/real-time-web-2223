const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 4242;

app.set('views', 'views');
app.set('view engine', 'ejs');
app.use(express.static("public"));

// home page
app.get('/', async (req, res) => {
    try {
        res.render('index');
    } catch (error) {
        res.status(500).send(error.message);
    }
});

io.on('connection', (socket) => {
    console.log('A user connected.');

    socket.on('chat message', (data) => {
        const [username, message] = data.split(': ');
        console.log(`${username}: ${message}`);
        io.emit('chat message', data);
    });

    socket.on('disconnect', () => {
        console.log('A user disconnected.');
    });
});

http.listen(port, () => {
    console.log(`Listening on port: ${port}`);
});
