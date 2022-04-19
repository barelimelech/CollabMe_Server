const express = require('express')
const router = express.Router()

const user = require('../controllers/users')
const authenticate = require('../common/auth_middleware')

/**
* @swagger
* tags:
*   name: User Api
*   description: The User API
*/

/**
* @swagger
* components:
*   schemas:
*     User:
*       type: object
*       required:
*         - Username
*         - Password
*       properties:
*         Username:
*           type: string
*           description: User name
*         Email:
*           type: string
*           description: Email of user
*         Tokens:
*           type: [String]
*           description: Token
*         Sex:
*           type: string
*           description: Sex of user
*         Age:
*           type: string
*           description: Age of user
*         Followers:
*           type: string
*           description: Number of follwers user has
*         Profession:
*           type: [String]
*           description: The Professions of the user
*         Platform:
*           type: [String]
*           description: Platform types the user is active 
*         NumberOfPosts:
*           type: String
*           description: number of post the user uploded
*         Company:
*           type: Boolean
*           description: whether the user is a company 
*         Influencer:
*           type: Boolean
*           description: whether the user is an influenter
*       example:
*         Username: 'eli'
*         Password: '123123'
*         Email: 'e@e.com'
*         Tokens: []
*         Sex: 'Male'
*         Age: '26'
*         Followers: '100'
*         Profession: []
*         Platform: []
*         Company: 'true'
*         Influencer: 'false'
*/

/**
* @swagger
* /users/getUser/{username}:
*   get:
*     summary: get the user by user name
*     tags: [User Api]
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
*         description: The user exist 
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/User'
*/
router.get('/getUser/:username',authenticate,user.getUserByUserNmae);



/**
* @swagger
* /users/editUser/{username}:
*   post:
*     summary: edit user 
*     tags: [User Api]
*     parameters:
*       - in: path
*         name: username
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/User'
*     security:
*       - bearerAuth: []
*     responses:
*       200:
*         description: User was updated
*/
router.post('/editUser/:username',authenticate, user.editUser)

/**
* @swagger
* /users/deleteuser/{username}:
*   post:
*     summary: delete user 
*     tags: [User Api]
*     parameters:
*       - in: path
*         name: username
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/User'
*     security:
*       - bearerAuth: []
*     responses:
*       200:
*         description: User was deleted
*/
router.post('/deleteuser/:username',authenticate, user.deleteuser)

/**
* @swagger
* /users/authenticate:
*   get:
*     summary: is connected user 
*     tags: [User Api]
*     security:
*       - bearerAuth: []
*     responses:
*       200:
*         description: User is connected
*/
router.get('/authenticate',authenticate,user.isconnected);
/**
* @swagger
* /users/getUser/getUserByEmail/{email}:
*   get:
*     summary: get the user by user name
*     tags: [User Api]
*     parameters:
*       - in: path
*         name: email
*         schema:
*           type: string
*         required: true
*         description: The user acording to email
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
router.get('/getUser/getUserByEmail/:email',authenticate,user.getUserByEmail);
/**
* @swagger
* /users/editUserWithoutAuth/{username}:
*   post:
*     summary: edit user passwored 
*     tags: [User Api]
*     parameters:
*       - in: path
*         name: username
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/User'
*     security:
*       - bearerAuth: []
*     responses:
*       200:
*         description: User was updated from popup
*/
router.post('/editUserWithoutAuth/:username', user.editUserPassword)


module.exports = router