const app = require('../server')
const request = require('supertest')
const mongoosse = require('mongoose')
const { response } = require('../server')
const User = require('../models/user_model')
const { refreshToken } = require('../controllers/auth')
let refreshToken1;

const username = 'yossi10'
const pwd = '5566'

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


describe('Testing Auth API',()=>{

    test('test registration',async ()=>{
        const response = await request(app).post('/auth/register').send({
            'Username' : username,
            'Password':pwd,
            'Email': 'email@email.email',
            "Sex":"undefind",
            "Age":28, 
            "Followers":10,
             "Profession":["Art","Sport"],
            "Platform":["instagram","youtube"], 
             "NumberOfPosts":20,
             "Company":false,
            "Influencer":true 

        })
        expect(response.statusCode).toEqual(200)
    })

    test('test login',async ()=>{
        const response = await request(app).post('/auth/login').send({
            'Username' : username,
            'Password':pwd
        })
        expect(response.statusCode).toEqual(200)
        accessToken = response.body.accessToken
        refreshToken1 =  response.body.refreshToken
        console.log(refreshToken);


       
    })         
    test('test logout',async ()=>{
        const response = await request(app).post('/auth/logout').set({ authorization: 'JWT ' + refreshToken1 })
        expect(response.statusCode).toEqual(200)
         newAccessToken = response.body.accessToken
            newRefreshToken = response.body.refreshToken
            expect (newAccessToken).not.toEqual(null);
            expect(newRefreshToken).not.toEqual(null);
    })    

    


   
})