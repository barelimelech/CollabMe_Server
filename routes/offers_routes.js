const express = require('express')
const router = express.Router()

const Offer = require('../controllers/offers')
const authenticate = require('../common/auth_middleware')

/**
* @swagger
* tags:
*   name: Offer Api
*   description: The Offer API
*/

/**
* @swagger
* components:
*   schemas:
*     Offer:
*       type: object
*       required:
*         - message
*         - sender
*       properties:
*         message:
*           type: string
*           description: The offer text 
*         sender:
*           type: string
*           description: The user who send the offer id
*       example:
*         message: 'this is swagger test message'
*         sender: '123456'
*/


/**
* @swagger
* /Offer:
*   get:
*     summary: get all offers
*     tags: [Offer Api]
*     responses:
*       200:
*         description: The offers list
*         content:
*           application/json:
*             schema:
*               type: array
*               items:
*                 $ref: '#/components/schemas/Offer'
*/
router.get('/getoffers', authenticate, Offer.getOffers)

/**
* @swagger
* /offer/{id}:
*   get:
*     summary: get all offers
*     tags: [Offer Api]
*     parameters:
*       - in: path
*         name: id
*         schema:
*           type: string
*         required: true
*         description: The offer id
*     responses:
*       200:
*         description: The offers list
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Offer'
*/

/**
* @swagger
* /offer:
*   offer:
*     summary: add new offer
*     tags: [Offer Api]
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/Offer'
*     responses:
*       200:
*         description: The offers list
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Offer'
*/

router.get('/getOfferById/:id', authenticate, Offer.getOfferById)

router.post('/addNewOffer', authenticate, Offer.addNewOffer)

router.post('/deleteOffer/:id', authenticate, Offer.deleteOffer)

router.post('/editOffer/:id', authenticate, Offer.editOffer)


module.exports = router