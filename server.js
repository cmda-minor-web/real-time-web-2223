const express = require('express')
const app = express()
const http = require('http').createServer(app)
const io = require('socket.io')(http)
const port = process.env.PORT || 4242

app.set('views', 'views');
app.set('view engine', 'ejs');
app.use(express.static("public"))


// home page
app.get('/', async (req, res) => {
    try {
        res.render('index');
    } catch (error) {
        res.status(500).send(error.message);
    }
})


// We passen het server script aan om een console bericht te loggen zodra 
// er een gebruiker verbinding maakt met via socket.io, dat zie je aan het connection event.
io.on('connection', (socket) => {
    console.log('connected');

    socket.on('chat message', (chat) => {
        // console.log(`${username}: ${message}`);
        io.emit('chat message', chat); // broadcast the message to all clients
      });

    // Als een gebruiker connectie maakt zie je de log message die we ingesteld hebben, 
    // misschien willen we ook zien wanneer een gebruiker disconnect.
    socket.on('disconnect', () => {
        console.log('user disconnected')
    })

    socket.on('focus', (hasFocus) => {
        socket.broadcast.emit('focus', hasFocus);
      });
});



app.get('/', (request, response) => {
    //   response.send('<h1>Hallo wereld! LOL</h1>')
    response.render('index')
})

http.listen(port, () => {
    console.log('listening on port:', port)
})