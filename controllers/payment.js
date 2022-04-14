const Payment = require('../models/payment_model')


const addpayment = async(req, res) => {

    const cardno = req.body.CardNo;
    const expireday =req.body.ExpDay;
    const cvv = req.body.Cvv;
    const idperson = req.body.IdPerson;
    const name = req.body.Name;
    const offerid =  req.body.OfferId;
    const bankacount =  req.body.BankAcount;
   

    const payment = Payment({
        CardNo:cardno,
        ExpDay:expireday,
        Cvv: cvv,
        IdPerson :idperson,
        Name :name,
        OfferId: offerid,
        BankAcount: bankacount       
       
    })

    const payment1 = await payment.save();
    res.status(200).send(payment1)
    

}

module.exports = {
    addpayment
}