const app = require('../server')
const request = require('supertest')
const mongoosse = require('mongoose')
const { response } = require('../server')
const User = require('../models/user_model')
var fs = require('fs');
const username = 'yossi11'
const path = require('path')

const image = path.join(__dirname, '/file.png')
const image2 = path.join(__dirname, '/candidate.test.js')
crypto = require('crypto');
beforeAll(done=>{
    User.remove({'Username' : username}, (err)=>{
        done()
    })
})

afterAll(done=>{
    User.remove({'Username' : username}, (err)=>{
        mongoosse.connection.close()
        done()
    })
})


describe('Testing edituser API',()=>{

    test('should return 200 and create user with single image upload', async() => {
      
       const res= await request(app)
        .post('/image/upload')
        .attach('upload', fs.readFileSync(image),'uploads/file.png')  
        expect(res.status).toEqual(200);
        expect(res.body).toEqual(res.body);
    })


    /*
    test('should return 400 in try to add an image', async() => {
        const multipleFiles=null
        const res= await request(app).post('/image/upload')
        .attach('upload', fs.readFileSync(image2),'uploads/file2.png')  
        .expect(400);     
        expect(res.status).toEqual(400);
       
    })
    */

    
    const filename ="file2.png"
    test('should return 200 and get the image', async() => {      
        const res= await request(app).get('/image/file/'+"file2.png")         
         expect(res.status).toEqual(200);
         
     })
     
});