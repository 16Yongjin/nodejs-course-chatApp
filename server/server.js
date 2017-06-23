const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '..', '/public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('New user connected');
    
    socket.emit('newMessage', { //환영 메시지
        from: 'Admin',
        text: 'Welcome to the chat app',
        createAt: new Date().getDate()
    });

    socket.broadcast.emit('newMessage', { //새 유저에게는 안보이는 입장 메시지,
        from: 'Admin',
        text: 'New user joined',
        createAt: new Date().getDate()

    });

    socket.on('createMessage', (message) => { //메시지 받으면
        console.log(message);

        io.emit('newMessage', { //모두에게 보내기
            from: message.from,
            text: message.text,
            createAt: new Date().getTime()
        });
    });

    socket.on('disconnect', () => {
        console.log('User was disconnected');
    });
});

server.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});