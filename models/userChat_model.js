const mongoose = require("mongoose")
const userchatSchema = new mongoose.Schema({
    Username: {
        type: String,
        required: true
    },
    TheChatTextUsername: {
        type: String,
        required: false
    },
    theUserNameYouText:{
        type: String,
        required: true
    },
    theOrder:{
        type: Number,
        required: true

    },
    date:{
        type: String,
        required: true
    },
    time:{
        type: String,
        required: true
    }


    
})

module.exports = mongoose.model('UserChatSchema', userchatSchema)