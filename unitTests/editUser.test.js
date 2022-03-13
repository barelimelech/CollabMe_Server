const app = require('../server')
const request = require('supertest')
const mongoosse = require('mongoose')
const { response } = require('../server')
const User = require('../models/user_model')
const { refreshToken } = require('../controllers/auth')
let refreshToken1;

const username = 'yossi11'
const pwd = '5566'
var newPassword;

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
        newPassword = response.body.Password;    
        console.log(refreshToken);


       
    })      
    
    
    test('edit a User',async ()=>{
        const response3 = await request(app).post('/users/editUser/' + username).set({ authorization: 'JWT ' + accessToken })
        .send({
            'Username' : username,
            'Password':pwd,
            'Email': 'email@email.email',
            "Sex":"undefind",
            "Age":28, 
            "Followers":12,
             "Profession":["Art","Sport"],
            "Platform":["instagram","youtube"], 
             "NumberOfPosts":21,
             "Company":false,
            "Influencer":true 
        })
        console.log(response.body);
        expect(response3.statusCode).toEqual(200)
        const theUser = response3.body
        expect(theUser.Username).toEqual(username)
        expect(theUser.Password).toEqual(pwd)
        expect(theUser.Email).toEqual("email@email.email")
        expect(theUser.Sex).toEqual("undefind")
        expect(theUser.Age).toEqual(28)
        expect(theUser.Followers).toEqual(12)
        expect(theUser.Profession).toEqual(["Art", "Sport"])
        expect(theUser.Platform).toEqual(["instagram","youtube"])
        expect(theUser.NumberOfPosts).toEqual(21)       
        expect(theUser.Company).toEqual(false)        
        expect(theUser.Influencer).toEqual(true)           
    })


});