const express = require('express')
const router = express.Router()

const user = require('../controllers/users')
const authenticate = require('../common/auth_middleware')

router.get('/getUser/:username',authenticate,user.getUserByUserNmae);
router.post('/editUser/:username',authenticate, user.editUser)

module.exports = router