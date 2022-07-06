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
    // TODO: on disconnect

    // let userId;
    // socket.on('new player', function(id, name) {
    //     userId = id = parseInt(id);
    //     // ...
    // });

    socket.on('message', (message) => {
        console.log(message);
        io.emit('message', `${socket.id.substr(0, 2)} said ${message}`);
    });

    socket.on('movement', function (data) {
        console.log(socket.id + ' moved to ' + data.x + ' ' + data.y);
        io.emit('movement', JSON.stringify({socketId: socket.id, x: data.x, y: data.y}));
    });

    socket.on('enter', function (username) {
        console.log(socket.id + ' entered with name ' + username);
        io.emit('enter', JSON.stringify({socketId: socket.id, username: username}));
    });

    socket.on('leave', function () {
        console.log(socket.id + ' left');
        io.emit('leave', socket.id);
    });
});

server.listen(3000, () => {
    console.log('listening on *:3000');
});