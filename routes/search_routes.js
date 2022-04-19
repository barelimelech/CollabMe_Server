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
*     summary: get offer
*     tags: [Search Api]
*     parameters:
*       - in: path
*         name: freesearch
*         schema:
*           type: string
*         required: true
*         description: The offer
*     security:
*       - bearerAuth: []
*     responses:
*       200:
*         description: offer exist
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Offer'
*/
router.get('/getOfferFromFreeSearch/:freesearch', authenticate, Offer.getOfferFromFreeSearch);


/**
* @swagger
* /search/getOfferFromSpecificSearch:
*   post:
*     summary: add new offer
*     tags: [Search Api]
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/Offer'
*     security:
*       - bearerAuth: []
*     responses:
*       200:
*         description: get offer 
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Offer'
*/
 router.post('/getOfferFromSpecificSearch', authenticate, Offer.getOfferFromSpecificSearch);


module.exports = router