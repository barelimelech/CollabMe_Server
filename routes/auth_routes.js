const express = require('express')
const swaggerJSDoc = require('swagger-jsdoc')
const router = express.Router()

const Auth = require('../controllers/auth')

/**
* @swagger
* tags:
*   name: Auth
*   description: Info User authentication
*/

/**
* @swagger
* components:
*   securitySchemes:
*       bearerAuth:
*           type: http
*           scheme: bearer
*           bearerFormat: JWT
*/

/**
* @swagger
* components:
*   schemas:
*     Tokens:
*       type: object
*       required:
*         - accessToken
*         - refreshToken
*       properties:
*         acessToken:
*           type: string
*           description: The JWT access token
*         refreshToken:
*           type: string
*           description: The JWT refresh token
*       example:
*         accessToken: '123cdlkfjslfsj'
*         refreshToken: '123lkjdslkjfljdsfj'
*/



/**
* @swagger
* /auth/login/:
*   post:
*     summary: log in user
*     tags: [Auth]
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/Login'
*     responses:
*       200:
*         description: 
*         content:
*           application/json:
*             schema:
*                 $ref: '#/components/schemas/Tokens'
*/

///////////Log in schema:
/**
* @swagger
* components:
*   schemas:
*     Login:
*       type: object
*       required:
*         - Username
*         - Password
*       properties:
*         Username:
*           type: string
*           description: user name 
*         Password:
*           type: string
*           description: password
*       example:
*         Username: 'eli'
*         Password: '123123'
*/

router.post('/login', Auth.login)

/**
* @swagger
* /auth/register:
*   post:
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
*         description: new user was created
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/User'
*/

router.post('/register', Auth.register)
/**
* @swagger
* /auth/logout:
*   post:
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
*     summary: get refresh token
*     tags: [Auth]
*     description: provide refresh token
*     security:
*       - bearerAuth: []
*     responses:
*       200:
*         description: access and refresh token
*/
router.get('/refreshToken', Auth.refreshToken)

/**
* @swagger
* /auth/getUserByUserNameInSignIn/{username}:
*   get:
*     summary: get the user name in sign in page
*     tags: [Auth]
*     parameters:
*       - in: path
*         name: username
*         schema:
*           type: string
*         required: true
*         description: The user name
*     security:
*       - bearerAuth: []
*     responses:
*       200:
*         description: get the user
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/User'
*/

router.get('/getUserByUserNameInSignIn/:username', Auth.getUserByUserNameInSignIn)

module.exports = router