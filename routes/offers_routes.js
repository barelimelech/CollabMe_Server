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
*           description: description of the offer
*         HeadLine:
*           type: string
*           description: The Head Line of the offer
*         FinishDate:
*           type: string
*           description: The time in which the the influencer should post
*         Price:
*           type: string
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
*           description: 
*         Users:
*           type: [String]
*           description: all the candidates
*         IntrestedVerify:
*           type: Boolean
*           description: whether of not the company in intrested in verification 
*       example:
*         Description: 'aa'
*         HeadLine: 'aa'
*         Price: '11'
*         IdOffer: '60c463bf-63b5-4a91-b4b4-28a0e3f81572'
*         Status: 'inprogress'
*         Profession: []
*         User: 'e@e.com'
*         IntrestedVerify: 'false'
*/


/**
* @swagger
* /offers/getoffers:
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

// /**
// * @swagger
// * /offers/getOfferById/{id}:
// *   get:
// *     summary: get offer by id
// *     tags: [Offer Api]
// *     parameters:
// *       - in: path
// *         name: id
// *         schema:
// *           type: string
// *         required: true
// *         description: The offer 
// *     responses:
// *       200:
// *         description: The offer 
// *         content:
// *           application/json:
// *             schema:
// *               $ref: '#/components/schemas/Offer'
// */

//  /**
//  * @swagger
//  * /offers/getOfferById/{id}:
//  *   get:
//  *     summary: get offer
//  *     tags: [Offer Api]
//  *     parameters:
//  *       - in: path
//  *         name: id
//  *       - in: header
// *         name: token
// *         type: string
// *         required: true
// *         description: token
//  *     security:
//  *       - bearerAuth: []
//  *     responses:
//  *       200:
//  *         description: A single user.
// *         content:
// *           application/json:
// *             schema:
// *               $ref: '#/components/schemas/Offer'
// */
/**
* @swagger
* /offers/getOfferById/{id}:
*   get:
*     summary: get the offer by pffer id
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
*         description: offer exist
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Offer'
*/
router.get('/getOfferById/:id', authenticate, Offer.getOfferById)

/**
* @swagger
* /offers/addNewOffer:
*   post:
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
*         description: Add new Offer 
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Offer'
*/



router.post('/addNewOffer', authenticate, Offer.addNewOffer)

/**
* @swagger
* /offers/deleteOffer/{id}:
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
*     responses:
*       200:
*         description: offer was deleted
*/
router.post('/deleteOffer/:id', authenticate, Offer.deleteOffer)

/**
* @swagger
* /offers/editOffer/{id}:
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