const app = require('../server')
const request = require('supertest')
const mongoosse = require('mongoose')
const { response } = require('../server')
const User = require('../models/user_model')
const { users } = require('../controllers/users')

const username = 'roket'
const pwd = '114422'
let NewPassword;
const proffesions = ["Art","Sport"];
const Platform = ["instagram","youtube"];
let refreshToken1;
const email = 'email@email.email11';





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


describe('Testing Users API',()=>{
    test('test registration',async ()=>{
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
    
    

    test('get userbyusername',async ()=>{                  
        const response2 = await request(app).get('/users/getUser/' + username).set({ authorization: 'JWT ' + accessToken });
        expect(response2.statusCode).toEqual(200)
                
        const user1 = response2.body
        expect(user1.Username).toEqual(username)
        expect(user1.Password).toEqual(NewPassword)
        expect(user1.Email).toEqual(email)
        expect(user1.Sex).toEqual("undefind")
        expect(user1.Age).toEqual("28")
        expect(user1.Followers).toEqual("10")
        expect(user1.Profession).toEqual(proffesions)
        expect(user1.Platform).toEqual(Platform)
        expect(user1.NumberOfPosts).toEqual("20") 
        expect(user1.Company).toEqual(false)  
        expect(user1.Influencer).toEqual(true)
           
    })

    test('getuserbyusername wrong', async () => {
        expect.assertions(1);
        const response2 = await request(app).get('/users/getUser/' +1).set({ authorization: 'JWT ' + accessToken });
        expect(response2.statusCode).toEqual(400);
      }); 

      test('get userbyemail',async ()=>{                  
        const response2 = await request(app).get('/users/getUser/getUserByEmail/'+email).set({ authorization: 'JWT ' + accessToken });
        expect(response2.statusCode).toEqual(200)           
        const user1 = response2.body
        expect(user1.Username).toEqual(username)
        expect(user1.Password).toEqual(NewPassword)
        expect(user1.Email).toEqual(email)
        expect(user1.Sex).toEqual("undefind")
        expect(user1.Age).toEqual("28")
        expect(user1.Followers).toEqual("10")
        expect(user1.Profession).toEqual(proffesions)
        expect(user1.Platform).toEqual(Platform)
        expect(user1.NumberOfPosts).toEqual("20") 
        expect(user1.Company).toEqual(false)  
        expect(user1.Influencer).toEqual(true)
           
    })
    test('get user by name is sigh in ', async () => {
       
        const response2 = await request(app).get('/auth/getUserByUserNameInSignIn/'+username).send({
           
        });
        expect(response2.status).toEqual(200);
        const user1 = response2.body
        expect(user1.Username).toEqual(username)
        expect(user1.Password).toEqual(NewPassword)
        expect(user1.Email).toEqual(email)
        expect(user1.Sex).toEqual("undefind")
        expect(user1.Age).toEqual("28")
        expect(user1.Followers).toEqual("10")
        expect(user1.Profession).toEqual(proffesions)
        expect(user1.Platform).toEqual(Platform)
        expect(user1.NumberOfPosts).toEqual("20") 
        expect(user1.Company).toEqual(false)  
        expect(user1.Influencer).toEqual(true)
    }); 
   
    test('getuserby email wrong', async () => {
        expect.assertions(1);
        const response2 = await request(app).get('/users/getUser/getUserByEmail/' +1).set({ authorization: 'JWT ' + accessToken });
        expect(response2.statusCode).toEqual(400);
      }); 
       
    test('test deleteuser',async ()=>{
        const response = await request(app).post('/users/deleteuser/' + username).set({ authorization: 'JWT ' + accessToken })
        expect(response.statusCode).toEqual(200)
    })

    test('delete user wrong', async () => {
        expect.assertions(1);
        const response2 = await request(app).get('/users/deleteuser/' +1).set({ authorization: 'JWT ' + accessToken });
        expect(response2.statusCode).toEqual(404);
      }); 
   
   
        
    test('get user by name is sigh in wrong ', async () => {
       
        const response2 = await request(app).get('/auth/getUserByUserNameInSignIn/'+null).send({
           
        });
        
        expect(response2.status).toEqual(400);
        
    });  

});