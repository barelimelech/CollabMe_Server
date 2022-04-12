const app = require('./server')
const app2 = require('./server2')
const port = process.env.PORT
app.listen(port, ()=>{
    console.log('server is running on port ' + port)
})


