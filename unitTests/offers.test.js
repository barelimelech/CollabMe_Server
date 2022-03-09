const app = require('../server')
const request = require('supertest')
const mongoosse = require('mongoose')
const { response } = require('../server')
const User = require('../models/user_model')

const username = 'test@a.com'
const pwd = '123456'

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
    const offerMessage = 'this is my test offer'
    const sender = 'Yossi'
    let accessToken = ''
    let userId = ''

    test('test registration',async ()=>{
        const response = await request(app).post('/auth/register').send({
            'Username' : username,
            'Password':pwd
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
    })

    test('offer get',async ()=>{
        const response = await request(app).get('/offer').set({ authorization: 'JWT ' + accessToken })
        expect(response.statusCode).toEqual(200)
    })

    test('add new offer',async ()=>{
        const response = await request(app).post('/offer').set({ authorization: 'JWT ' + accessToken })
        .send({
            'message' : offerMessage,
            'sender' : sender
        })
        expect(response.statusCode).toEqual(200)
        const newOffer = response.body
        expect(newOffer.message).toEqual(offerMessage)
        
        const response2 = await request(app).get('/offer/' + newOffer._id)
        .set({ authorization: 'JWT ' + accessToken })
        expect(response2.statusCode).toEqual(200)
        const offer2 = response2.body
        expect(offer2.message).toEqual(offerMessage)
    })
})