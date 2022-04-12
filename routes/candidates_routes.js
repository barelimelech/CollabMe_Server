const express = require('express')
const router = express.Router()

const candidates = require('../controllers/candidates')
const authenticate = require('../common/auth_middleware')
/**
* @swagger
* tags:
*   name: Candidate Api
*   description: The Candidate API
*/


/**
* @swagger
* /candidates/getCandidates/{offerId}:
*   get:
*     summary: get all candidates
*     tags: [Offer Api]
*     responses:
*       200:
*         description: The offers list
*         content:
*           application/json:
*             schema:
*               type: array
*               items:
*                 $ref: '#/components/schemas/User'
*/
router.get('/getCandidates/:id',authenticate,candidates.getCandidates);

router.get('/getoffersofUsers/:username',authenticate,candidates.getoffersfromuserinCandidates);

router.get('/getCandidateFromSearch/:candidatesearch',authenticate,candidates.getCandidateFromSearch);


module.exports = router