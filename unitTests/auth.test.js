const app = require('../server')
const request = require('supertest')
const mongoosse = require('mongoose')
const { response } = require('../server')
const User = require('../models/user_model')

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
        refreshToken =  response.body.refreshToken
        console.log(refreshToken);


       
    })

      jest.setTimeout(30000);
        test("timeout access", async()=>{
             await new Promise(r => setTimeout(r, 3*1000 ));
             const response = await request(app).get("/post").set({authorization : 'JWT' + accessToken})
            expect(response.statusCode).not.toEqual(200);
        });
        
        test("Refresh Token", async () => {
            const response = await request(app).get("/auth/refreshToken").set({authorization : 'JWT ' + refreshToken})
            expect (response.statusCode).toEqual(200);
            newAccessToken = response.body.accessToken
            newRefreshToken = response.body.refreshToken
            expect (newAccessToken).not.toEqual(null);
            expect(newRefreshToken).not.toEqual(null);
        });

    
    test('test logout',async ()=>{
        const response = await request(app).post('/auth/logout').set({ authorization: 'JWT ' + accessToken })
        expect(response.statusCode).toEqual(200)
         newAccessToken = response.body.accessToken
            newRefreshToken = response.body.refreshToken
            expect (newAccessToken).not.toEqual(null);
            expect(newRefreshToken).not.toEqual(null);
    })
    


   
})