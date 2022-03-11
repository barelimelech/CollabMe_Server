const app = require('../server')
const request = require('supertest')
const mongoosse = require('mongoose')
const { response } = require('../server')
const User = require('../models/user_model')
const { users } = require('../controllers/users')

const username = 'liem'
const pwd = '5566'
let NewPassword;
const proffesions = ["Art","Sport"];
const Platform = ["instagram","youtube"];
let refreshToken1;


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
             "Profession":proffesions,
            "Platform":Platform, 
             "NumberOfPosts":20,
             "Company":false,
            "Influencer":true 

        })
        NewPassword = response.body.Password;
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
        


       
    })    

    test('get user',async ()=>{                  
        const response2 = await request(app).get('/users/getUser/' + username).set({ authorization: 'JWT ' + accessToken });
        expect(response2.statusCode).toEqual(200)
        const user1 = response2.body
        expect(user1.Username).toEqual(username)
        expect(user1.Password).toEqual(NewPassword)
        expect(user1.Email).toEqual('email@email.email')
        expect(user1.Sex).toEqual("undefind")
        expect(user1.Age).toEqual(28)
        expect(user1.Followers).toEqual(10)
        expect(user1.Profession).toEqual(proffesions)
        expect(user1.Platform).toEqual(Platform)
        expect(user1.NumberOfPosts).toEqual(20) 
        expect(user1.Company).toEqual(false)  
        expect(user1.Influencer).toEqual(true)    
    })

});