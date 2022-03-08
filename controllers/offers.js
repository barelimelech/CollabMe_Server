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
    sender = req.user.id

    const offer = Offer({
        message: req.body.message,
        sender: sender
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

module.exports = {
    getOffers,
    getOfferById,
    addNewOffer
}