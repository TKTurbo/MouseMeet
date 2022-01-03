const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const {Server} = require("socket.io");

// TODO: add cors url
const io = require('socket.io')(server, {
    cors: {
        origin: '*',
    }
});

app.get('/', (req, res) => {
    res.send('Server is running!');
});

io.on('connection', (socket) => {
    console.log('a user connected');

    // let userId;
    // socket.on('new player', function(id, name) {
    //     userId = id = parseInt(id);
    //     // ...
    // });

    socket.on('sendMessage', function (data) {
        console.log(data)
        socket.broadcast.emit('newMessage', 'Akkoord')
    });

    // TODO: move in and out and check socket id

    socket.on('movement', function (data) {
        console.log(data);
    });
});

server.listen(3000, () => {
    console.log('listening on *:3000');
});