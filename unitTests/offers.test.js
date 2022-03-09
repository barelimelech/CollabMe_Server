const app = require('../server')
const request = require('supertest')
const mongoosse = require('mongoose')
const { response } = require('../server')
const User = require('../models/user_model')

const username = 'yossi9'
const pwd = '5566'
const description="hi"
const headline = "hello"
const price = 10
const cupon = "free dinner"
const idOffer = 1
const status = "now"
const profession = ["sport","art"];
const user = "62277413fe8636f7c2c9aff2"
const intrestedVerfiy= false
            

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


describe('Testing Offer API',()=>{
    let accessToken = ''
    let accsessOriginal='';
    let userId = ''

    test('test registration',async ()=>{
        const response = await request(app).post('/auth/register').send({
            'Username' : username,
            'Password':pwd,
            "Sex":"undefind",
            "Tokens":[],
            "Age":28, 
            "Followers":10,
             "Profession":["Art","Sport"],
            "Platform":["instagram","youtube"], 
             "NumberOfPosts":20,
             "Company":false,
            "Influencer":true 

        })
        expect(response.statusCode).toEqual(200)
        userId = response.body._id
    })

    test('test login',async ()=>{
        const response = await request(app).post('/auth/login').send({
            'Username' : username,
            'Password':pwd            
        })
        expect(response.statusCode).toEqual(200)
        accessToken = response.body.accessToken
        accsessOriginal=response.body.accessToken;
    })


    let newAccessToken = '';
    let newRefreshToken = '';
    
        test("Authorized access", async () => {
            const response = await request(app).get('/offer').set({ authorization: 'JWT ' + accessToken })
            expect(response.statusCode).toEqual(200);
        });
        test("UnAuthorized access", async () => {
            wrongToken = accsessOriginal.replace(10, accsessOriginal [10] + 1)
            const response = await request(app).get("/offer").set({authorization : 'JWT' + wrongToken })
            expect(response.statusCode).not.toEqual(200);
        });
    

    test('offer get',async ()=>{
        const response = await request(app).get('/offer').set({ authorization: 'JWT ' + accessToken })
        expect(response.statusCode).toEqual(200)
    })

    test('add new offer',async ()=>{
        const response = await request(app).post('/offer').set({ authorization: 'JWT ' + accessToken })
        .send({
            "Description":description,   
            "HeadLine":headline,
            "Price" :price,
            "Coupon":cupon,
            "IdOffer" :idOffer,
            "Status":status,
            "Profession": profession,  
            "User":user,      
            "IntrestedVerify":intrestedVerfiy
        })
        expect(response.statusCode).toEqual(200)
        const newOffer = response.body
        expect(newOffer.Description).toEqual(description)
        expect(newOffer.HeadLine).toEqual(headline)
        expect(newOffer.Price).toEqual(price)
        expect(newOffer.Coupon).toEqual(cupon)
        expect(newOffer.IdOffer).toEqual(idOffer)
        expect(newOffer.Status).toEqual(status)
        expect(newOffer.Profession).toEqual(profession)
        expect(newOffer.User).toEqual(user)
        expect(newOffer.IntrestedVerify).toEqual(intrestedVerfiy)        
      
        
        const response2 = await request(app).get('/offer/' + newOffer._id)
        .set({ authorization: 'JWT ' + accessToken })
        expect(response2.statusCode).toEqual(200)
        const offer2 = response2.body
        expect(offer2.Description).toEqual(description)
        expect(offer2.HeadLine).toEqual(headline)
        expect(offer2.Price).toEqual(price)
        expect(offer2.Coupon).toEqual(cupon)
        expect(offer2.IdOffer).toEqual(idOffer)
        expect(offer2.Status).toEqual(status)
        expect(offer2.Profession).toEqual(profession)
        expect(offer2.User).toEqual(user)
        expect(offer2.IntrestedVerify).toEqual(intrestedVerfiy)   
    })
})