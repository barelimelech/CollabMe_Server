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
        user = response.body.User;
        
    })

    test('offers get',async ()=>{
        const response = await request(app).get('/offer/getoffers').set({ authorization: 'JWT ' + accessToken })
        expect(response.statusCode).toEqual(200)
    })

    test('offers get id wrong',async ()=>{
        const response = await request(app).get('/offer/getOfferById/'+4).set({ authorization: 'JWT ' + accessToken })
        expect(response.statusCode).toEqual(400)
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

    test('getbyidoffer offer',async ()=>{
        //get by id    
        const response2 = await request(app).get('/offer/getOfferById/'+ idOffer)
        .set({ authorization: 'JWT ' + accessToken })
        const newOffer1 = response2.body
        expect(response2.statusCode).toEqual(200)
        expect(newOffer1.Description).toEqual(description)
        expect(newOffer1.HeadLine).toEqual(headline)
        expect(newOffer1.Price).toEqual(price)
        expect(newOffer1.IdOffer).toEqual(idOffer)
        expect(newOffer1.Status).toEqual(status)
        expect(newOffer1.Profession).toEqual(profession)
        expect(newOffer1.User).toEqual(user)
         
    });

    test('edit offer',async ()=>{
        const response = await request(app).post('/offer/editOffer/' + idOffer).set({ authorization: 'JWT ' + accessToken })
        .send({
            "Description":description,   
            "HeadLine":"hi",
            "Price" :"30",
            "IdOffer" :idOffer,
            "Status":status,
            "Profession": profession,  
            "User":user   
            
        })
        expect(response.statusCode).toEqual(200)
        const newOffer = response.body
        expect(newOffer.Description).toEqual(description)
        expect(newOffer.HeadLine).toEqual("hi")
        expect(newOffer.Price).toEqual("30")
        expect(newOffer.IdOffer).toEqual(idOffer)
        expect(newOffer.Status).toEqual(status)
        expect(newOffer.Profession).toEqual(profession)
        expect(newOffer.User).toEqual(user)
               
               
    })

    test('autantication fail 403',async ()=>{
        const response = await request(app).post('/offer/editOffer/' + idOffer).set({ authorization: 'JWT ' + null })
        .send({
            "Description":description,   
            "HeadLine":"hi",
            "Price" :"30",
            "IdOffer" :idOffer,
            "Status":status,
            "Profession": profession,  
            "User":user   
            
        })
        expect(response.statusCode).toEqual(403)
             
               
    })

    test('autantication fail 401',async ()=>{
        const response = await request(app).post('/offer/editOffer/' + idOffer).set({ authorization: 'JWT '})
        .send({
            "Description":description,   
            "HeadLine":"hi",
            "Price" :"30",
            "IdOffer" :idOffer,
            "Status":status,
            "Profession": profession,  
            "User":user   
            
        })
        expect(response.statusCode).toEqual(401)
             
               
    })

    
    test('test deleteOffer',async ()=>{
        const response = await request(app).post('/offer/deleteOffer/' + idOffer).set({ authorization: 'JWT ' + accessToken })
        expect(response.statusCode).toEqual(200)
    })

    

    
})