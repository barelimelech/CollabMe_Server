const Offer = require('../models/offer_model')

const getOffers = async (req, res) => {
    try {
        offers = await Offer.find()
        res.status(200).send(offers)
    } catch (err) {
        res.status(400).send({
            'status': 'fail',
            'error': err.message
        })
    }
}

const getOfferById = async (req, res) => {
    try {
        offers = await Offer.findById(req.params.id)
        res.status(200).send(offers)
    } catch (err) {
        res.status(400).send({
            'status': 'fail',
            'error': err.message
        })
    }
}

const addNewOffer = (req, res) => {
    console.log('addNewOffer ' + req.body.message)
    const description = req.body.Description;
    const headLine =req.body.HeadLine;
    const price = req.body.Price;
    const coupon =  req.body.Coupon;
    const idOffer = req.body.IdOffer;
     const status =  req.body.Status;
     const profession =  req.body.Profession;
     const user =  req.body.User;
     //const users =  req.body.Users;
     const intrestedVerify =  req.body.IntrestedVerify;
    
    const offer = Offer({
        Description:description,
        HeadLine:headLine ,
        Price :price,
        Coupon:coupon,
        IdOffer :idOffer,
        Status: status,
        Profession: profession,
        User:user,
        //Users: users,
        IntrestedVerify:intrestedVerify,
    })

    offer.save((error, newOffer) => {
        if (error) {
            res.status(400).send({
                'status': 'fail',
                'error': error.message
            })
        } else {
            res.status(200).send(newOffer)
        }
    })
}

const deleteOffer = async(req, res) => {

        offerTodelete = await Offer.findById(req.params.id)
        Offer.deleteOne({
            _id: offerTodelete.id
            }, function (err) {
            if (err) {
              console.log(err);
              return res.send(err.message);
            }
            res.send('removed successfuly');
            });

}


module.exports = {
    getOffers,
    getOfferById,
    addNewOffer,
    deleteOffer
}