const express = require('express')
const router = express.Router()

const Payment = require('../controllers/payment')
const authenticate = require('../common/auth_middleware')

const swaggerJSDoc = require('swagger-jsdoc')



router.post('/addpayment', authenticate, Payment.addpayment)

module.exports = router