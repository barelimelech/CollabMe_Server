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
        type: String,
        required: true
    },
    Tokens: {
        type: [String]
    },
    Sex: {
        type: String,
        required: false
    },
    Age: {
        type: String,
        required: false
    },
    Followers: {
        type: String,
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
        type: String,
        required: false
    },
    Company: {
        type: Boolean,
        required: false
    },
    Influencer: {
        type: Boolean,
        required: false
    },
    Image: {
        type: String,
        required: false
    }

    
})

module.exports = mongoose.model('User', userSchema)