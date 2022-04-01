const express = require('express')
const router = express.Router()

const Offer = require('../controllers/search')
const authenticate = require('../common/auth_middleware')

router.get('/getOfferFromFreeSearch/:freesearch', authenticate, Offer.getOfferFromFreeSearch);

router.get('/getOfferFromSpecificSearch/:description/:headline/:fromdate/:todate/:fromprice/:toprice/:user', authenticate, Offer.getOfferFromSpecificSearch);

module.exports = router