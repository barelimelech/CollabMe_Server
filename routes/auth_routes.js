const express = require('express')
const router = express.Router()

const Auth = require('../controllers/auth')

/**
* @swagger
* tags:
*   name: User Authentication
*   description: Info User authentication
*/
router.post('/login', Auth.login)
router.post('/register', Auth.register)
router.post('/logout', Auth.logout)
router.get('/refreshToken', Auth.refreshToken)
router.get('/getUserByUserNameInSignIn/:username', Auth.getUserByUserNameInSignIn)

module.exports = router