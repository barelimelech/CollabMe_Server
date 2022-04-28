const express = require('express')
const router = express.Router()

const Offer = require('../controllers/offers')
const authenticate = require('../common/auth_middleware')
const offer_model = require('../models/offer_model')
const swaggerJSDoc = require('swagger-jsdoc')

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
*       properties:
*         Description:
*           type: string
*           description: Description of the offer
*         HeadLine:
*           type: string
*           description: The Head Line of the offer
*         FinishDate:
*           type: Number
*           description: The time in which the the influencer should post
*         Price:
*           type: Number
*           description: Cost for the work
*         IdOffer:
*           type: string
*           description: ID number 
*         Status:
*           type: string
*           description: Offer Status
*         Profession:
*           type: [String]
*           description: The Profession of the User
*         User:
*           type: string
*           description: User that created the offer
*         Users:
*           type: [String]
*           description: List of arrpval user for the offer
*         IntrestedVerify:
*           type: Boolean
*           description: Whether of not the company in intrested in verification 
*         Image:
*           type: String
*           description: Image offer
*         MediaContent:
*           type: [String]
*           description: Media content of the of the offer
*       example:
*         Description: 'offer_tmp_from_swagger'
*         HeadLine: 'Sawgger Offer'
*         Price: 11
*         IdOffer: '60c463bf-63b5-4a91-b4b4-28a0e3f81572'
*         Status: 'InProgress'
*         Profession: []
*         User: 'e@e.com'
*         IntrestedVerify: 'false'
*         Image: '4342342342342344'
*         MediaContent: ["https://www.youtube.com/watch?v=EHkozMIXZ8w&list=RDMM&index=3&ab_channel=EminemVEVO"]
*/


/**
* @swagger
* /offer/getoffers:
*   get:
*     summary: get all offers
*     tags: [Offer Api]
*     security:
*       - bearerAuth: []
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
* /offer/getOfferById/{id}:
*   get:
*     summary: get the offer by offer id
*     tags: [Offer Api]
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
*         description: the offer
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Offer'
*/
router.get('/getOfferById/:id', authenticate, Offer.getOfferById)

/**
* @swagger
* /offer/addNewOffer:
*   post:
*     summary: add new offer
*     tags: [Offer Api]
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
*         description: Add new Offer 
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Offer'
*/



router.post('/addNewOffer', authenticate, Offer.addNewOffer)

/**
* @swagger
* /offer/deleteOffer/{id}:
*   post:
*     summary: delete offer by id
*     tags: [Offer Api]
*     parameters:
*       - in: path
*         name: id
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
*         description: offer was deleted
*/
router.post('/deleteOffer/:id', authenticate, Offer.deleteOffer)

/**
* @swagger
* /offer/editOffer/{id}:
*   post:
*     summary: edit the offer
*     tags: [Offer Api]
*     parameters:
*       - in: path
*         name: id
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
*         description: offer was updated
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Offer'
*/

router.post('/editOffer/:id', authenticate, Offer.editOffer)



module.exports = router

//router.get('/getOfferById/:id', authenticate, Offer.getOfferById)