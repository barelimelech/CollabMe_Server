const express = require('express')
const app = express()


describe('Testing swagger API',()=>{

    test('test swagger',async ()=>{
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
        
    })
})