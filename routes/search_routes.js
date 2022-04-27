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
*     summary: get offer by search
*     tags: [Search Api]
*     parameters:
*       - in: path
*         name: freesearch
*         schema:
*           type: string
*         required: true
*         description: search word for offers
*     security:
*       - bearerAuth: []
*     responses:
*       200:
*         description: list of offers by free sherch
*         content:
*           application/json:
*             schema:
*               type: array
*               items:
*                 $ref: '#/components/schemas/Offer'
*/
router.get('/getOfferFromFreeSearch/:freesearch', authenticate, Offer.getOfferFromFreeSearch);


/**
* @swagger
* /search/getOfferFromSpecificSearch:
*   post:
*     summary: get offer by specific search
*     tags: [Search Api]
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/searchbody'
*     security:
*       - bearerAuth: []
*     responses:
*       200:
*         description: list of offers
*         content:
*           application/json:
*             schema:
*               type: array
*               items:
*                 $ref: '#/components/schemas/Offer'
*/
 router.post('/getOfferFromSpecificSearch', authenticate, Offer.getOfferFromSpecificSearch);


module.exports = router
/**
* @swagger
* components:
*   schemas:
*     searchbody:
*       type: object
*       required:
*         - description
*       properties:
*         description:
*           type: String
*           description: description of offer
*         headline:
*           type: String
*           description: headline of offer
*         fromdate:
*           type: String
*           description: start date of offer
*         todate:
*           type: String
*           description: end date of offer
*         fromprice:
*           type: String
*           description: min price
*         toprice:
*           type: String
*           description: max price
*         professions:
*           type: [String]
*           description: professions
*         user:
*           type: String
*           description: user
*       example:
*         description: "null"
*         headline: "null"
*         fromdate: 'null'
*         todate: 'null'
*         fromprice: 'null'
*         toprice: 'null'
*         professions: ["Travel"]
*         user: 'null'
*/
