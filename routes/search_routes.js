const express = require('express')
const router = express.Router()

const Offer = require('../controllers/search')
const authenticate = require('../common/auth_middleware')

router.get('/getOfferFromFreeSearch/:freesearch', authenticate, Offer.getOfferFromFreeSearch);

module.exports = router


