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
*     summary: get the the candidates
*     tags: [Candidate Api]
*     parameters:
*       - in: path
*         name: id
*         schema:
*           type: string
*         required: true
*         description: The candidate
*     security:
*       - bearerAuth: []
*     responses:
*       200:
*         description: The user exist 
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/User'
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
*         description: offer exist
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Offer'
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
*         name: candidatesearch
*         schema:
*           type: string
*         required: true
*         description: The candidate
*     security:
*       - bearerAuth: []
*     responses:
*       200:
*         description: The user exist 
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/User'
*/
router.get('/getCandidateFromSearch/:candidatesearch',authenticate,candidates.getCandidateFromSearch);


module.exports = router