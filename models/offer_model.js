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
    Price: {
        type: String,
        required: false
    },
    Coupon: {
        type: String,
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
