const app = require('../server')
const request = require('supertest')
const mongoosse = require('mongoose')
const { response } = require('../server')
const Payment = require('../models/payment_model')
const User = require('../models/user_model')
const description="hi"
const headline = "now"
const price = 10
const idOffer = "12"
const status = "now"
const profession = ["sport","art"];
const finishdate = 14062022;
let user = "62277413fe8636f7c2c9aff2"
const intrestedVerfiy= false
const username = 'liem22'
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


describe('Testing mediacontent API',()=>{
    let accessToken = ''
    let accsessOriginal='';
    let userId = ''

    test('test registration',async ()=>{
        const response = await request(app).post('/auth/register').send({
            'Username' : username,
            'Password':pwd,
            'Email': "email@email.email22",
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
        user = response.body.User;
        
    })

    test('add new offer',async ()=>{
        const response = await request(app).post('/offer/addNewOffer').set({ authorization: 'JWT ' + accessToken })
        .send({
            "Description":description,   
            "HeadLine":headline,
            "FinishDate":finishdate,
            "Price" :price,
            "IdOffer" :idOffer,
            "Status":status,
            "Profession": profession,  
            "User":user     
            
        });
        expect(response.statusCode).toEqual(200)
        const newOffer = response.body    
        expect(newOffer.Description).toEqual(description)
        expect(newOffer.HeadLine).toEqual(headline)
        expect(newOffer.FinishDate).toEqual(finishdate)
        expect(newOffer.Price).toEqual(price)
        expect(newOffer.IdOffer).toEqual(idOffer)
        expect(newOffer.Status).toEqual(status)
        expect(newOffer.Profession).toEqual(profession)
        expect(newOffer.User).toEqual(user)
       
    })

    test('test addMediaContent',async ()=>{
        const response = await request(app).post('/mediacontent/addMediaContent').set({ authorization: 'JWT ' + accessToken }).send({
            "MediaContent": ["sop", "m", "c", "d"],
            "IdOffer": idOffer            
        })
        expect(response.statusCode).toEqual(200)
        
               
    })

    test('test getMediaContentOfAnOffer',async ()=>{
        const response = await request(app).get('/mediacontent/getMediaContentOfAnOffer/'+idOffer).set({ authorization: 'JWT ' + accessToken }).send({
                       
        })
        expect(response.statusCode).toEqual(200)
        expect(response.body).toEqual(["sop", "m", "c", "d"])
        
               
    })
});