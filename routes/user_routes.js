const express = require('express')
const router = express.Router()

const user = require('../controllers/users')
const authenticate = require('../common/auth_middleware')

router.get('/getUser/:username',authenticate,user.getUserByUserNmae);
router.get('/getUserById/:id',authenticate,user.getUserById);
router.post('/editUser/:username',authenticate, user.editUser)
router.post('/deleteuser/:username',authenticate, user.deleteuser)


module.exports = router