const express = require('express')
const router = express.Router()

const Auth = require('../controllers/auth')

/**
* @swagger
* tags:
*   name: User Authentication
*   description: Info User authentication
*/

/**
* @swagger
* /auth/login/:
*   post:
*     summary: log in user
*     tags: [Auth]
*     parameters:
*       - in: path
*         name: user name
*       - in: path
*         name: password
*         schema:
*           type: string
*         required: true
*     requred: true
*     content:
*     application/json:
*     responses:
*       200:
*         description: 
*         content:
*           application/json:
*             schema:
*               type: array
*               items:
*                 $ref: '#/components/schemas/User'
*/


router.post('/login', Auth.login)

/**
* @swagger
* /auth/register:
*   get:
*     summary: register (create new user)
*     tags: [Auth]
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/User'
*     responses:
*       200:
*         description: The user exist 
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/User'
*/
/**
// * @swagger
// * /auth/register:
// *   get:
// *     summary: register (create new user)
// *     tags: [Auth]
// *     parameters:
// *      - in: path
// *         name: user name
// *         schema:
// *             $ref: '#/components/schemas/User'
// *     responses:
// *       200:
// *         description: The user exist 
// *         content:
// *           application/json:
// *             schema:
// *               $ref: '#/components/schemas/User'
// */
router.post('/register', Auth.register)
/**
* @swagger
* /auth/logout:
*   get:
*     summary: logout user
*     tags: [Auth]
*     description: provide refresh token
*     security:
*       - bearerAuth: []
*     responses:
*       200:
*         description: logout successeded
*/
router.post('/logout', Auth.logout)
/**
* @swagger
* /auth/refreshToken:
*   get:
*     summary: get a new access token
*     tags: [Auth]
*     description: provide refresh token
*     security:
*       - bearerAuth: []
*     responses:
*       200:
*         description: acess and refresh token
*/
router.get('/refreshToken', Auth.refreshToken)
router.get('/getUserByUserNameInSignIn/:username', Auth.getUserByUserNameInSignIn)

module.exports = router