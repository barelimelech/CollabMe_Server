const { verify } = require("jsonwebtoken")
const mongoose = require("mongoose")

const offerSchema = new mongoose.Schema({
    Description: {
        type: String,
        required: false
    }, 
    HeadLine: {
        type: String,
        required: false
    },
    FinishDate: {
        type: Number,
        required: false
    },
    Price: {
        type: Number,
        required: false
    },
   
    IdOffer: {
        type: String,
        required: false
    },
    Status: {
        type: String,
        required: false
    },
    Profession: {
        type: [String],
        required: false
    },
    User: {
        type: String,
        required: false
    },
    Users: {
        type: [String],
        required: false
    },
    Image: {
        type: String,
        required: false
    },
    MediaContent: {
        type: [String],
        required: false
    }
    
})


module.exports = mongoose.model('Offer', offerSchema)
