
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
   
     //Since we are going to use userName through whole socket connection, Let's make it global.   
      
     
     socket.on('newMessage',async function(data) {
               
          const messageContent = data.messageContent
          const username = data.username
          const  usernametaxting = data.usernametext
       
        const user =  await UserChat.find({'Username' : username})
        const user1 =  user.filter((d => d.theUserNameYouText === usernametaxting))
        const user2=  await UserChat.find({'Username' : usernametaxting})
        const user3 =  user2.filter((d => d.theUserNameYouText === username))
        const count = Number(Object.keys(user1).length)
        const count1 = Number(Object.keys(user3).length)
        const userchat = UserChat({
            TheChatTextUsername:messageContent,
            Username:username,
            theUserNameYouText: usernametaxting,
            theOrder:count1+count+1
                        
        }).save();    
       
        
         // Just pass the data that has been passed from the writer socket  
       
       
        io.to(usernametaxting).emit('newMessage', data); // Need to be parsed into Kotlin object in Kotlin
     })


     socket.on('join', async function (data) {
        socket.join(data.username);
       // We are using room of socket io
     });


     socket.on('disconnect', function () {
        console.log("One of sockets disconnected from our server.")
    });


    
 })

 