const express = require('express')
const router = express.Router()

const candidates = require('../controllers/candidates')
const authenticate = require('../common/auth_middleware')

router.get('/getCandidates/:offerId',authenticate,candidates.getCandidates);

module.exports = router