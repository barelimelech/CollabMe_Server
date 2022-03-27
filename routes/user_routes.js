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
*         Username: 'e123'
*         Password: '$2b$10$Mb4YroOB41PRMhJYxJal8uj2LsQf7Ef'
*         Email: 'eli@eli.com'
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
* /user/{username}:
*   get:
*     summary: get the user by user name
*     tags: [User Api]
*     parameters:
*       - in: path
*         name: user name
*         schema:
*           type: string
*         required: true
*         description: The user name
*     responses:
*       200:
*         description: The user exist 
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Offer'
*/
router.get('/getUser/:username',authenticate,user.getUserByUserNmae);

/**
* @swagger
* /user/{id}:
*   get:
*     summary: get the user by id
*     tags: [User Api]
*     parameters:
*       - in: path
*         name: user id
*         schema:
*           type: string
*         required: true
*         description: The user id
*     responses:
*       200:
*         description: The user exist 
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Offer'
*/
router.get('/getUserById/:id',authenticate,user.getUserById);

/**
* @swagger
* /user/{username}:
*   put:
*     summary: edit user 
*     tags: [User Api]
*     parameters:
*       - in: path
*         name: user name
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/Offer'
*     responses:
*       200:
*         description: User was updated
*/
router.post('/editUser/:username',authenticate, user.editUser)

/**
* @swagger
* /user/{username}:
*   delete:
*     summary: delete user 
*     tags: [User Api]
*     parameters:
*       - in: path
*         name: user name
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/Offer'
*     responses:
*       200:
*         description: User was deleted
*/
router.post('/deleteuser/:username',authenticate, user.deleteuser)

/**
* @swagger
* /user/{username}:
*   get:
*     summary: check if user is connected
*     tags: [User Api]
*     parameters:
*       - in: path
*         name: user name
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/Offer'
*     responses:
*       200:
*         description: User is connected
*/

router.get('/authenticate',authenticate,user.isconnected);


module.exports = router