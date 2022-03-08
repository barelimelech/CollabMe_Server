const mongoose = require("mongoose")

const offerSchema = new mongoose.Schema({
    message: {
        type: String,
        required: true
    },
  
})

module.exports = mongoose.model('Offer', offerSchema)