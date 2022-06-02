
 const express = require('express');
 const bodyParser = require('body-parser');
 const UserChat = require('./models/userChat_model.js')
 
 
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
      
     
     socket.on('newMessage',function(data) {
         console.log('newMessage triggered')
         console.log(data)           
         const messageContent = data.messageContent
         const username = data.username
         const usernametaxting = data.usernametext

         console.log(`[Room Number ${username}] : ${messageContent} :${usernametaxting}`)
                 
         const userchat = UserChat({
            TheChatTextUsername:messageContent,
            Username:username,
            theUserNameYouText: usernametaxting,
                        
        }).save()    
        
         // Just pass the data that has been passed from the writer socket  

        socket.broadcast.emit('newMessage', data); // Need to be parsed into Kotlin object in Kotlin
     })
 
    
     socket.on('disconnect', function () {
        console.log("One of sockets disconnected from our server.")
    });


    
 })