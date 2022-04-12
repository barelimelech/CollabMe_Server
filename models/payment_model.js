
const mongoose = require("mongoose")

const paymentSchema = new mongoose.Schema({
    CardNo: {
        type: String,
        required: false
    }, 
    ExpDay: {
        type: String,
        required: false
    },
    Cvv: {
        type: String,
        required: false
    },
    IdPerson: {
        type: String,
        required: false
    },
   
    Name: {
        type: String,
        required: false
    },
    OfferId: {
        type: String,
        required: false
    },
    BankAcount: {
        type: String,
        required: false
    }
   
    
})


module.exports = mongoose.model('payment', paymentSchema)
