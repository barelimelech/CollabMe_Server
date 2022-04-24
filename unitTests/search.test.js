const app = require('../server')
const request = require('supertest')
const mongoosse = require('mongoose')
const { response } = require('../server')
const User = require('../models/user_model')
const Offers = require('../models/offer_model')

const username = 'nona'
const pwd = '5566'
const description="over"
const headline = "over"
const fromprice = "10"
const idOffer = "100"
const status = "pause"
const fromdate = "16082022";
const todate = "16082022";
const toprice="100";
const profession = ["Art","music"];
const price = "12";

const intrestedVerfiy= false
const freesearch = "over";
const finishdate = "16082022";
const Ttodate = "null", Tfromdate = "null", Tfromprice = "null", Ttoprice ="null";
let id ;

beforeAll(done=>{
    User.remove({'Username' : username}, (err)=>{
        done()
    })
    Offers.remove({'IdOffer':idOffer}, (err)=>{
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
            "User":username 
            
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
        expect(newOffer.User).toEqual(username)
         
    })

    test('test getOfferFromSpecificSearch1',async ()=>{
        const response = await request(app).post('/search/getOfferFromSpecificSearch').set({ authorization: 'JWT ' + accessToken })
        .send({
            "description":"null",   
            "headline":"null",
            "fromdate":"null",
            "todate" :"null",
            "fromprice":"null",
            "toprice" :"null",
            "professions":profession,  
            "user":username
        });
        expect(response.statusCode).toEqual(200)
        const newOffer = response.body    
        expect(newOffer[0].Description).toEqual(description)
        expect(newOffer[0].HeadLine).toEqual(headline)
        expect(newOffer[0].FinishDate).toEqual(finishdate)
        expect(newOffer[0].Price).toEqual(price)
        expect(newOffer[0].Profession).toEqual(profession)
        expect(newOffer[0].User).toEqual(username)
      

       
    })

    test('test getOfferFromFreeSearch', async () =>{
        const response2 = await request(app).get('/search/getOfferFromFreeSearch/'+freesearch)
        .set({authorization: 'JWT ' + accessToken })
        const newOffer1 = response2.body
        expect(response2.statusCode).toEqual(200)
        expect(newOffer1[0].Description).toEqual(freesearch)
        expect(newOffer1[0].HeadLine).toEqual(headline)
        expect(newOffer1[0].FinishDate).toEqual(finishdate)
        expect(newOffer1[0].Price).toEqual(price)
        expect(newOffer1[0].Status).toEqual(status)
        expect(newOffer1[0].User).toEqual(username)
    })

    test('test getOfferFromSpecificSearch2',async ()=>{
        const response = await request(app).post('/search/getOfferFromSpecificSearch').set({ authorization: 'JWT ' + accessToken })
        .send({
            "description":description,   
            "headline":headline,
            "fromdate":finishdate,
            "todate" :finishdate,
            "fromprice":price,
            "toprice" :price,
            "professions":"null",  
            "user":username
        });
        expect(response.statusCode).toEqual(200)
        const newOffer = response.body    
        expect(newOffer[0].Description).toEqual(description)
        expect(newOffer[0].HeadLine).toEqual(headline)
        expect(newOffer[0].FinishDate).toEqual(finishdate)
        expect(newOffer[0].Price).toEqual(price)
        expect(newOffer[0].Profession).toEqual(profession)
        expect(newOffer[0].User).toEqual(username)
      
               
    })

    test('test getOfferFromSpecificSearch3',async ()=>{
        const response = await request(app).post('/search/getOfferFromSpecificSearch').set({ authorization: 'JWT ' + accessToken })
        .send({
            "description":description,   
            "headline":"null",
            "fromdate":"null",
            "todate" :"null",
            "fromprice":"null",
            "toprice" :"null",
            "professions":"null",  
            "user":"null"
        });
        expect(response.statusCode).toEqual(200)
        const newOffer = response.body    
        expect(newOffer[0].Description).toEqual(description)
        expect(newOffer[0].HeadLine).toEqual(headline)
        expect(newOffer[0].FinishDate).toEqual(finishdate)
        expect(newOffer[0].Price).toEqual(price)
        expect(newOffer[0].Profession).toEqual(profession)
        expect(newOffer[0].User).toEqual(username)
      
               
    })

    test('test getOfferFromSpecificSearch4',async ()=>{
        const response = await request(app).post('/search/getOfferFromSpecificSearch').set({ authorization: 'JWT ' + accessToken })
        .send({
            "description":"null",   
            "headline":headline,
            "fromdate":"null",
            "todate" :"null",
            "fromprice":"null",
            "toprice" :"null",
            "professions":"null",  
            "user":"null"
        });
        expect(response.statusCode).toEqual(200)
        const newOffer = response.body    
        expect(newOffer[0].Description).toEqual(description)
        expect(newOffer[0].HeadLine).toEqual(headline)
        expect(newOffer[0].FinishDate).toEqual(finishdate)
        expect(newOffer[0].Price).toEqual(price)
        expect(newOffer[0].Profession).toEqual(profession)
        expect(newOffer[0].User).toEqual(username)
      
               
    })

    test('test getOfferFromSpecificSearch5',async ()=>{
        const response = await request(app).post('/search/getOfferFromSpecificSearch').set({ authorization: 'JWT ' + accessToken })
        .send({
            "description":"null",   
            "headline":"null",
            "fromdate":"null",
            "todate" :"null",
            "fromprice":"null",
            "toprice" :"null",
            "professions":profession,  
            "user":"null"
        });
        expect(response.statusCode).toEqual(200)
        const newOffer = response.body    
        expect(newOffer[0].Description).toEqual(description)
        expect(newOffer[0].HeadLine).toEqual(headline)
        expect(newOffer[0].FinishDate).toEqual(finishdate)
        expect(newOffer[0].Price).toEqual(price)
        expect(newOffer[0].Profession).toEqual(profession)
        expect(newOffer[0].User).toEqual(username)
      
               
    })

    test('test getOfferFromSpecificSearch6',async ()=>{
        const response = await request(app).post('/search/getOfferFromSpecificSearch').set({ authorization: 'JWT ' + accessToken })
        .send({
            "description":"null",   
            "headline":"null",
            "fromdate":finishdate,
            "todate" :finishdate,
            "fromprice":"null",
            "toprice" :"null",
            "professions":"null",  
            "user":"null"
        });
        expect(response.statusCode).toEqual(200)
        const newOffer = response.body    
        expect(newOffer[0].Description).toEqual(description)
        expect(newOffer[0].HeadLine).toEqual(headline)
        expect(newOffer[0].FinishDate).toEqual(finishdate)
        expect(newOffer[0].Price).toEqual(price)
        expect(newOffer[0].Profession).toEqual(profession)
        expect(newOffer[0].User).toEqual(username)
      
               
    })

    // test('test getOfferFromSpecificSearch7',async ()=>{
    //     const response = await request(app).post('/search/getOfferFromSpecificSearch').set({ authorization: 'JWT ' + accessToken })
    //     .send({
    //         "description":"null",   
    //         "headline":"null",
    //         "fromdate":"null",
    //         "todate" :"null",
    //         "fromprice":price,
    //         "toprice" :"100",
    //         "professions":"null",  
    //         "user":"null"
    //     });
    //     expect(response.statusCode).toEqual(200)
    //     const newOffer = response.body    
    //     expect(newOffer[0].Description).toEqual(description)
    //     expect(newOffer[0].HeadLine).toEqual(headline)
    //     expect(newOffer[0].FinishDate).toEqual(finishdate)
    //     expect(newOffer[0].Price).toEqual(price)
    //     expect(newOffer[0].Profession).toEqual(profession)
    //     expect(newOffer[0].User).toEqual(username)
      
               
    // })
    
    

});