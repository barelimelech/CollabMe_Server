const express = require('express')
const router = express.Router()

const Payment = require('../controllers/payment')
const authenticate = require('../common/auth_middleware')

/**
* @swagger
* tags:
*   name: Payment Api
*   description: The Payment API
*/

/**
* @swagger
* components:
*   schemas:
*     Payment:
*       type: object
*       required:
*         - CardNo
*         - Cvv
*       properties:
*         CardNo:
*           type: String
*           description: Card number
*         ExpDay:
*           type: String
*           description: ExpDay of card
*         Cvv:
*           type: String
*           description: Cvv of card
*         IdPerson:
*           type: String
*           description: IdPerson of user
*         Name:
*           type: String
*           description: Name of user
*         OfferId:
*           type: String
*           description: OfferId of the offer to pay
*         BankAcount:
*           type: String
*           description: BankAcount of the user        
*       example:
*         CardNo: '112233'
*         ExpDay: '12/12/2019'
*         Cvv: '222'
*         Name: 'amit'
*         IdPerson: '223'
*         OfferId: '26'
*         BankAcount: '100'
*/
/**
* @swagger
* /payment/addpayment:
*   post:
*     summary: add payment
*     tags: [Payment Api]
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/Payment'
*     security:
*       - bearerAuth: []
*     responses:
*       200:
*         description: payment was added
*/
router.post('/addpayment', authenticate, Payment.addpayment)

module.exports = router