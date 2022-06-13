const express = require('express')
const router = express.Router()

const userchat = require('../controllers/userChat')
const authenticate = require('../common/auth_middleware')



router.post('/getusersChat', authenticate, userchat.getChatOtherSide)


module.exports = router