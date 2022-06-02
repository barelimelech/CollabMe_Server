/**
 * @author Joyce Hong
 * @email soja0524@gmail.com
 * @create date 2019-09-02 20:51:10
 * @modify date 2019-09-02 20:51:10
 * @desc socket.io server !
 */

 const express = require('express');
 const bodyParser = require('body-parser');
 
 
 const socketio = require('socket.io')
 var app = express();
 
 app.use(bodyParser.urlencoded({ extended: true }));
 
 app.use(bodyParser.json());
 
 
 var server = app.listen(3000,()=>{
     console.log('Server is running on port number 3000')
 })
 
 
 //Chat Server
 
 var io = require('socket.io')(server);
 
 io.on('connection',function(socket) {
 
     //The moment one of your client connected to socket.io server it will obtain socket id
     //Let's print this out.
     console.log(`Connection : SocketId = ${socket.id}`)
     //Since we are going to use userName through whole socket connection, Let's make it global.   
     var userName = '';
     
     socket.on('subscribe', function(data) {
         console.log('subscribe trigged')
         const room_data = JSON.parse(data)
         userName = room_data.userName;
         const roomName = room_data.roomName;
     
         socket.join(`${roomName}`)
         console.log(`Username : ${userName} joined Room Name : ${roomName}`)
         
        
         // Let the other user get notification that user got into the room;
         // It can be use to indicate that person has read the messages. (Like turns "unread" into "read")
 
         //TODO: need to chose
         //io.to : User who has joined can get a event;
         //socket.broadcast.to : all the users except the user who has joined will get the message
         // socket.broadcast.to(`${roomName}`).emit('newUserToChatRoom',userName);
         io.to(`${roomName}`).emit('newUserToChatRoom',userName);
 
     })
 
     socket.on('unsubscribe',function(data) {
         console.log('unsubscribe trigged')
         const room_data = JSON.parse(data)
         const userName = room_data.userName;
         const roomName = room_data.roomName;
     
         console.log(`Username : ${userName} leaved Room Name : ${roomName}`)
         socket.broadcast.to(`${roomName}`).emit('userLeftChatRoom',userName)
         socket.leave(`${roomName}`)
     })
 
     socket.on('newMessage',function(data) {
         console.log('newMessage triggered')
         console.log(data)   
         //const messageData = JSON.parse(data)
         const messageContent = data.messageContent
         const roomName = data.roomName

 
         console.log(`[Room Number ${roomName}] : ${messageContent}`)
         
         // Just pass the data that has been passed from the writer socket
         const chatData = {
             userName : roomName,
             messageContent : messageContent,
             
         }

        socket.broadcast.emit('newMessage', data); // Need to be parsed into Kotlin object in Kotlin
     })
 
     //If you want to add typing function you can make it like this.
     
     // socket.on('typing',function(roomNumber){ //Only roomNumber is needed here
     //     console.log('typing triggered')
     //     socket.broadcast.to(`${roomNumber}`).emit('typing')
     // })
 
     // socket.on('stopTyping',function(roomNumber){ //Only roomNumber is needed here
     //     console.log('stopTyping triggered')
     //     socket.broadcast.to(`${roomNumber}`).emit('stopTyping')
     // })
 
    //  socket.on('disconnect', function () {
    //     console.log("One of sockets disconnected from our server.")
    // });
 })