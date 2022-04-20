const express = require('express')
const router = express.Router()

const Offer = require('../controllers/mediacontent')
const authenticate = require('../common/auth_middleware')
const offer_model = require('../models/offer_model')

/**
* @swagger
* tags:
*   name: Media Api
*   description: The Media API
*/

/**
* @swagger
* /mediacontent/addMediaContent:
*   post:
*     summary: add media content
*     tags: [Media Api]
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
*         description: add media content secceeded
*/

router.post('/addMediaContent', authenticate, Offer.addMediaContent)

/**
* @swagger
* /mediacontent/getMediaContentOfAnOffer/{id}:
*   get:
*     summary: get media content
*     tags: [Media Api]
*     parameters:
*       - in: path
*         name: id
*         schema:
*           type: string
*         required: true
*         description: The offer
*     security:
*       - bearerAuth: []
*     responses:
*       200:
*         description: Media content return seccessfully 
*         content:
*           application/json:
*             schema:
*               type: string
*/

router.get('/getMediaContentOfAnOffer/:id', authenticate, Offer.getMediaContentOfAnOffer)


module.exports = router
