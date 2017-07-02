const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');


const {generateMessage, generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');
const {Users} = require('./utils/users');
const {Rooms} = require('./utils/rooms');

const publicPath = path.join(__dirname, '..', '/public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);
var users = new Users();
var rooms = new Rooms();

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('New user connected');
    
   
    socket.on('join', (params, callback) => {
        if (!isRealString(params.name) || !isRealString(params.room)) {
            return callback('Name and room name are required!');
        }

        socket.join(params.room); 

        rooms.addRoom(params.room);
        io.emit('currentRooms', rooms.getRoomList());

        users.removeUser(socket.id); // 중복되는 아이디 제거
        users.addUser(socket.id, params.name, params.room);

        io.to(params.room).emit('updateUserList',users.getUserList(params.room));


        socket.emit('newMessage', generateMessage('Admin', 'Welcome To the chat app'));
        socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has joined`));



        callback(); // 에러 없음을 보냄
    });


    socket.on('getCurrentRooms', (message, callback) => {
        callback(rooms.getRoomList());
    });

    socket.on('createMessage', (message, callback) => { //메시지 받으면
        var user = users.getUser(socket.id);
        if (user && isRealString(message.text)) {
            io.to(user.room).emit('newMessage', generateMessage(user.name, message.text));

            callback('This is from the server');
        }


    });

    socket.on('createLocationMessage', (coords, callback) => {
        var user = users.getUser(socket.id);
        if (user) {
            io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name, coords.latitude, coords.longitude));
        }
    })

    socket.on('disconnect', () => {
        var user = users.removeUser(socket.id);
        

        if (user) {
            io.to(user.room).emit('updateUserList', users.getUserList(user.room));
            io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left`));
            if (users.getUserList(user.room).length <= 0) {
                rooms.removeRoom(user.room);
                io.emit('currentRooms', rooms.getRoomList());
            }
        }
    });
});

server.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});