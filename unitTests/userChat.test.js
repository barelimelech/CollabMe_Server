const app = require('../server')
const request = require('supertest')
const mongoosse = require('mongoose')
const { response } = require('../server')
const User = require('../models/user_model')
const Offers = require('../models/offer_model')
const UserChat = require('../models/userChat_model')

const username = 'roket1'
const pwd = '114422'
let NewPassword;
const proffesions = ["Art","Sport"];
const Platform = ["instagram","youtube"];
let refreshToken1;
const email = 'email@email11.email11';



beforeAll(done=>{
    User.remove({'Username' : username}, (err)=>{
        done()
    })
    User.remove({'Username' : "roro"}, (err)=>{
        done()
    })

   
})

afterAll(done=>{
    User.remove({'Username' : username}, (err)=>{
        mongoosse.connection.close()
        done()
    })
    User.remove({'Username' : "roro"}, (err)=>{
        done()
    })
    
})

describe('Testing Offer API',()=>{
    let accessToken = ''
    let accsessOriginal='';
    let userId = ''

    test('test registration1',async ()=>{
        const response = await request(app).post('/auth/register').send({
            'Username' : username,
            'Password':pwd,
            'Email': email,
            "Sex":"undefind",
            "Age":28, 
            "Followers":10,
             "Profession":proffesions,
            "Platform":Platform, 
             "NumberOfPosts":20,
             "Company":false,
            "Influencer":true 

        })
        NewPassword = response.body.Password;
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

    test('test registration2',async ()=>{
        const response = await request(app).post('/auth/register').send({
            'Username' : "roro",
            'Password':"12345678",
            'Email': email,
            "Sex":"undefind",
            "Age":28, 
            "Followers":10,
             "Profession":proffesions,
            "Platform":Platform, 
             "NumberOfPosts":20,
             "Company":false,
            "Influencer":true 

        })
        NewPassword = response.body.Password;
        expect(response.statusCode).toEqual(200)

        
    })

    

    test("chat convo", async() => {
        const userchat = UserChat({
            TheChatTextUsername:"hello",
            Username:username,
            theUserNameYouText: "roro",
            theOrder:1,
            date:"1010",
            time:"1010"
            
                        
        }).save();   
        
        const response = await request(app).post('/UserChatConvo/getusersChat').set({ authorization: 'JWT ' + accessToken })
        .send({   
            'Username':username,
            'theUserNameYouText':"roro"
            
            
        });
              
        expect(response.body[0].Username).toEqual(username);   
        expect(response.body[0].theUserNameYouText).toEqual("roro");
        expect(response.body[0].TheChatTextUsername).toEqual("hello");
        expect(response.statusCode).toEqual(200)
        
    });

})