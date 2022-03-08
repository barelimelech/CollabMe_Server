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
        type: Array,
        required: false
    },
    Platform :{
        type: Array,
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