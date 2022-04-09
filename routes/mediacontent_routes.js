const express = require('express')
const router = express.Router()

const Offer = require('../controllers/mediacontent')
const authenticate = require('../common/auth_middleware')
const offer_model = require('../models/offer_model')

router.post('/addMediaContent', authenticate, Offer.addMediaContent)

router.get('/getMediaContentOfAnOffer/:id', authenticate, Offer.getMediaContentOfAnOffer)


module.exports = router
