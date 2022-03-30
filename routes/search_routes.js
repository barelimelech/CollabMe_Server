const express = require('express')
const router = express.Router()

const Offer = require('../controllers/search')
const authenticate = require('../common/auth_middleware')

router.get('/getOfferFromFreeSearch/:freesearch', authenticate, Offer.getOfferFromFreeSearch);
//router.get('/getOfferFromDescription/:description', authenticate, Offer.getOfferFromDescription);

 router.get('/getOfferFromSpecificSearch/:description/:headline/:fromdate/:todate/:fromprice/:toprice/:professions/:user', authenticate, Offer.getOfferFromSpecificSearch);

module.exports = router


