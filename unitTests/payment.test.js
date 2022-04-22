const app = require('../server')
const request = require('supertest')
const mongoosse = require('mongoose')
const { response } = require('../server')
const User = require('../models/user_model')
let CardNo="655341231";
let ExpDay="12/12/2019";
let Cvv="9900";
let IdPerson="1";
let Name="amit";
let OfferId="3";
let BankAcount="1122334455";
const username = 'liem'
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


describe('Testing payment API',()=>{
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

    test('test addpayment',async ()=>{
        const response = await request(app).post('/payment/addpayment').set({ authorization: 'JWT ' + accessToken }).send({
            'CardNo' : CardNo,
            'ExpDay':ExpDay,      
            'Cvv' : Cvv,
            'IdPerson':IdPerson,  
            'Name' : Name,
            'OfferId':OfferId,
            'BankAcount' : BankAcount                     

        })
        expect(response.statusCode).toEqual(200)
        const newPayment = response.body    
        expect(newPayment.CardNo).toEqual(CardNo)
        expect(newPayment.ExpDay).toEqual(ExpDay)
        expect(newPayment.Cvv).toEqual(Cvv)
        expect(newPayment.IdPerson).toEqual(IdPerson)
        expect(newPayment.Name).toEqual(Name)
        expect(newPayment.OfferId).toEqual(OfferId)
        expect(newPayment.BankAcount).toEqual(BankAcount)
       
    })
});