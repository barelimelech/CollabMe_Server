const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    Username: {
        type: String,
        required: true
    },
    Password: {
        type: String,
        required: true
    },
    Email: {
        type: String
    },
    Tokens: {
        type: [String]
    },
    Sex: {
        type: String,
        required: false
    },
    Age: {
        type: Number,
        required: false
    },
    Followers: {
        type: Number,
        required: false
    },
    Profession :{
        type: [String],
        required: false
    },
    Platform :{
        type: [String],
        required: false
    },
    NumberOfPosts: {
        type: Number,
        required: false
    },
    Company: {
        type: Boolean,
        required: false
    },
    Influencer: {
        type: Boolean,
        required: false
    }

    
})

module.exports = mongoose.model('User', userSchema)