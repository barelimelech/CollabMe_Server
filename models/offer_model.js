const { verify } = require("jsonwebtoken")
const mongoose = require("mongoose")

const offerSchema = new mongoose.Schema({
    Description: {
        type: String,
        required: false
    }, 
    HeadLine: {
        type: String,
        required: true
    },
    Price: {
        type: Number,
        required: true
    },
    Coupon: {
        type: String,
        required: false
    },
    IdOffer: {
        type: Number,
        required: true
    },
    Status: {
        type: String,
        required: true
    },
    Proffesion: {
        type: Array,
        required: false
    },
    User: {
        type: mongoose.Schema.Types.ObjectId, ref: 'users',
        required: true
    },
    // Users: {
    //     type: mongoose.Schema.Types.ObjectId, ref: 'users',
    //     required: true
    // },
    IntrestedVerify: {
        type: Boolean,
        required: false
    }


    

  
})
module.exports = mongoose.model('Offer', offerSchema)
