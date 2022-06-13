const app = require('../server')
const request = require('supertest')
const mongoosse = require('mongoose')
const { response } = require('../server')
const User = require('../models/user_model')
const Offers = require('../models/offer_model')

const username = 'liem'
const pwd = '5566'
const description="hi"
const headline = "now"
const price = 10
const idOffer = "10"
const status = "now"
const profession = ["sport","art"];
const finishdate = 16082022;
let user = "62277413fe8636f7c2c9aff2"



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
    Offers.remove({'IdOffer':idOffer}, (err)=>{
        done()
    })
})

describe('Testing Offer API',()=>{
    let accessToken = ''
    let accsessOriginal='';
    let userId = ''

    test('test registration',async ()=>{
        const response = await request(app).post('/auth/register').send({
            'Username' : username,
            'Password':pwd,
            'Email': email,
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

    test("get candidates", async() => {
        const response = await request(app).get('/candidates/getCandidates/'+idOffer1).set({ authorization: 'JWT ' + accessToken })
        .send({            
        });
            
        expect(response.body[0].Username).toEqual(users[0]);
        expect(response.statusCode).toEqual(200)
        
    });

})