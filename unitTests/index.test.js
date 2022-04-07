const app = require('../server')
const request = require('supertest')
const mongoosse = require('mongoose')
const { response } = require('../server')
const User = require('../models/user_model')
const { refreshToken } = require('../controllers/auth')
let refreshToken1;

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

describe('Testing Auth API',()=>{

    test('test index',async ()=>{
        const response = await request(app).get('/index').send({
        
        })
        expect(response.body).toEqual({});
    })


});


