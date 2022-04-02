const express = require('express')
const router = express.Router()

const Offer = require('../controllers/search')
const authenticate = require('../common/auth_middleware')

/**
* @swagger
* tags:
*   name: Search Api
*   description: The Search API
*/

/**
* @swagger
* /search/getOfferFromFreeSearch/{freesearch}:
*   get:
*     summary: get the user by user name
*     tags: [User Api]
*     parameters:
*       - in: path
*         name: user name
*         schema:
*           type: string
*         required: true
*         description: The user name
*     responses:
*       200:
*         description: The user exist 
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Offer'
*/
router.get('/getOfferFromFreeSearch/:freesearch', authenticate, Offer.getOfferFromFreeSearch);


/**
* @swagger
* /search/getOfferFromSpecificSearch/{description,headline,fromdate,todate,fromprice,user}:
*   get:
*     summary: get the user by user name
*     tags: [User Api]
*     parameters:
*       - in: path
*         name: user name
*         schema:
*           type: string
*         required: true
*         description: The user name
*     responses:
*       200:
*         description: The user exist 
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Offer'
*/
 router.get('/getOfferFromSpecificSearch/:description/:headline/:fromdate/:todate/:fromprice/:toprice/:user', authenticate, Offer.getOfferFromSpecificSearch);

module.exports = router


module.exports = router