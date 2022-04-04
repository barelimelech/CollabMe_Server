const dotenv = require('dotenv').config()
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')


if (process.env.NODE_ENV == "development") {
    const swaggerUI = require("swagger-ui-express")
    const swaggerJsDoc = require("swagger-jsdoc")
    const options = {
        definition: {
            openapi: "3.0.0",
            info: {
                title: "Node API Description",
                version: "1.0.0",
                description: "Explanatin about API",
            },
            servers: [{url: "http://localhost:" + process.env.PORT,},],
        },
        apis: ["./routes/*.js"],
    };
    const specs = swaggerJsDoc(options);
    app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));
 }

// Include the node file module  

app.use(bodyParser.urlencoded({extended:true, limit: '1m'}))
app.use(bodyParser.json())






mongoose.connect(process.env.DATABASE_URL,{useNewUrlParser : true})
const db = mongoose.connection
db.on('error',error=>{console.error(error)})
db.once('open',()=>{console.log('db connected!')})

const port = process.env.PORT

const indexRouter = require('./routes/index')
app.use('/index',indexRouter)

const offerRouter = require('./routes/offers_routes')
app.use('/offer',offerRouter)

const authRouter = require('./routes/auth_routes')
app.use('/auth',authRouter)

const userrouter = require('./routes/user_routes')
app.use('/users',userrouter)

const candidates = require('./routes/candidates_routes')
app.use('/candidates',candidates)

const search = require('./routes/search_routes')
app.use('/search',search)

const images1 = require('./routes/images_route')
app.use('/image',images1)



module.exports = app