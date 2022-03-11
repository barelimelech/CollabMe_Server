const app = require('../server')
const request = require('supertest')
const mongoosse = require('mongoose')
const { response } = require('../server')
const User = require('../models/user_model')

var refreshToken1;
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



describe("Token refresh test ",()=>{

    test('test registration',async ()=>{
        const response = await request(app).post('/auth/register').send({
            'Username' : username,
            'Password':pwd,
            'Email':"email@email.email",
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

});
