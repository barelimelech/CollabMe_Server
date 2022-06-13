const app = require('../server')
const request = require('supertest')
const mongoosse = require('mongoose')
const { response } = require('../server')
const User = require('../models/user_model')
const Offers = require('../models/offer_model')
const username = 'liem4455662'
const pwd = '55661231'
const description="hi"
const headline = "hello"
const price = 10
const idOffer1 = "71"
const status = "now"
const profession = ["sport","art"];
let user = "62277413fe8636f7c2c9aff2"
let users = ["lola"]
let username2 = "lola";
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
    Offers.remove({'IdOffer':idOffer1}, (err)=>{
        done()
    })
})


describe('Testing candidates API',()=>{
    let accessToken = ''
    let Password
    
    test('test registration',async ()=>{
        const response = await request(app).post('/auth/register').send({
            'Username' : username,
            'Password':pwd,
            'Email': "email@email.email223",
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
            "Price" :price,
            "IdOffer" :idOffer1,
            "Status":status,
            "Profession": profession,  
            "User":user,  
            "Users":users  
            
        });
        expect(response.statusCode).toEqual(200)
        const newOffer = response.body    
        expect(newOffer.Description).toEqual(description)
        expect(newOffer.HeadLine).toEqual(headline)
        expect(newOffer.Price).toEqual(price)
        expect(newOffer.IdOffer).toEqual(idOffer1)
        expect(newOffer.Status).toEqual(status)
        expect(newOffer.Profession).toEqual(profession)
        expect(newOffer.User).toEqual(user)
        expect(newOffer.Users).toEqual(users)
          
           
        
    })
    test('test registration3',async ()=>{
        const response = await request(app).post('/auth/register').send({
            'Username' : "lola",
            'Password':pwd,
            'Email': "email@email.email223",
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

    test("get candidates", async() => {
        const response = await request(app).get('/candidates/getCandidates/'+idOffer1).set({ authorization: 'JWT ' + accessToken })
        .send({            
        });
            
        expect(response.body[0].Username).toEqual(users[0]);
        expect(response.statusCode).toEqual(200)
        
    });

    test('test isconnected',async ()=>{
        const response = await request(app).get('/users/authenticate').set({ authorization: 'JWT ' + accessToken })
        expect(response.statusCode).toEqual(200)
        expect(response.body).toEqual(true)
    })

    test("get offers from candidates", async() => {
        const response = await request(app).get('/candidates/getoffersofUsers/'+username2).set({ authorization: 'JWT ' + accessToken })
        .send({  

        });        
        expect(response.statusCode).toEqual(200)
        const newOffer = response.body[0];    
        expect(newOffer.Description).toEqual(description)
        expect(newOffer.HeadLine).toEqual(headline)
        expect(newOffer.Price).toEqual(price)
        expect(newOffer.IdOffer).toEqual(idOffer1)
        expect(newOffer.Status).toEqual(status)
        expect(newOffer.Profession).toEqual(profession)
        expect(newOffer.User).toEqual(user)
        expect(newOffer.Users).toEqual(users)
         
        
    });


     test("get getCandidateFromSearch", async() => {
        const response = await request(app).get('/candidates/getCandidateFromSearch/'+"lola").set({ authorization: 'JWT ' + accessToken })
        .send({            
        });         
        expect(response.statusCode).toEqual(200)
        const user1 = response.body
        expect(user1.Username).toEqual("lola")
        expect(user1.Email).toEqual("email@email.email223")
        expect(user1.Sex).toEqual("undefind")
        expect(user1.Age).toEqual("28")
        expect(user1.Followers).toEqual("10")
        expect(user1.Profession).toEqual(["Art","Sport"])
        expect(user1.Platform).toEqual(["instagram","youtube"])
        expect(user1.NumberOfPosts).toEqual("20") 
        expect(user1.Company).toEqual(false)  
        expect(user1.Influencer).toEqual(true)           
        
    });

    

});