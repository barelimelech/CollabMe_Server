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
* /candidates/getCandidates/{id}:
*   get:
*     summary: get candidates by Offer ID 
*     tags: [Candidate Api]
*     parameters:
*       - in: path
*         name: id
*         schema:
*           type: string
*         required: true
*         description: ID Offer
*     security:
*       - bearerAuth: []
*     responses:
*       200:
*         description: list of candidates
*         content:
*           application/json:
*             schema:
*               type: array
*               items:
*                 $ref: '#/components/schemas/User'
*/           

router.get('/getCandidates/:id',authenticate,candidates.getCandidates);

/**
* @swagger
* /candidates/getoffersofUsers/{username}:
*   get:
*     summary: get offer of user 
*     tags: [Candidate Api]
*     parameters:
*       - in: path
*         name: username
*         schema:
*           type: string
*         required: true
*         description: The offer
*     security:
*       - bearerAuth: []
*     responses:
*       200:
*         description: list of offers
*         content:
*           application/json:
*             schema:
*               type: array
*               items:
*                 $ref: '#/components/schemas/Offer'
*/

router.get('/getoffersofUsers/:username',authenticate,candidates.getoffersfromuserinCandidates);


/**
* @swagger
* /candidates/getCandidateFromSearch/{candidatesearch}:
*   get:
*     summary: get the the candidates
*     tags: [Candidate Api]
*     parameters:
*       - in: path
*         name: candidate search
*         schema:
*           type: string
*         required: true
*         description: The candidate
*     security:
*       - bearerAuth: []
*     responses:
*       200:
*         description: get user result
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/User'
*/
router.get('/getCandidateFromSearch/:candidatesearch',authenticate,candidates.getCandidateFromSearch);


module.exports = router