const app = require('../server')
const request = require('supertest')
const mongoosse = require('mongoose')
const { response } = require('../server')
const User = require('../models/user_model')

const offerID = '6228bd95db9e1be2ea60bc69'

const username = 'liem'
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
let id ;
            

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
            'Email': "email@email.email",
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

    test('add new offer',async ()=>{
        const response = await request(app).post('/offer/addNewOffer').set({ authorization: 'JWT ' + accessToken })
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
         id = response.body._id;

        expect(newOffer.Description).toEqual(description)
        expect(newOffer.HeadLine).toEqual(headline)
        expect(newOffer.Price).toEqual(price)
        expect(newOffer.Coupon).toEqual(cupon)
        expect(newOffer.IdOffer).toEqual(idOffer)
        expect(newOffer.Status).toEqual(status)
        expect(newOffer.Profession).toEqual(profession)
        expect(newOffer.User).toEqual(user)
        expect(newOffer.IntrestedVerify).toEqual(intrestedVerfiy)        
        
    })

    test('edit offer',async ()=>{
        const response = await request(app).post('/offer/editOffer/' + id).set({ authorization: 'JWT ' + accessToken })
        .send({
            "Description":description,   
            "HeadLine":"hi",
            "Price" :"30",
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
        expect(newOffer.HeadLine).toEqual("hi")
        expect(newOffer.Price).toEqual("30")
        expect(newOffer.Coupon).toEqual(cupon)
        expect(newOffer.IdOffer).toEqual(idOffer)
        expect(newOffer.Status).toEqual(status)
        expect(newOffer.Profession).toEqual(profession)
        expect(newOffer.User).toEqual(user)
        expect(newOffer.IntrestedVerify).toEqual(intrestedVerfiy)        
               
    })

    test('test deleteOffer',async ()=>{
        const response = await request(app).post('/offer/deleteOffer/' + id).set({ authorization: 'JWT ' + accessToken })
        expect(response.statusCode).toEqual(200)
    })

    
})