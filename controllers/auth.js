const User = require('../models/user_model')
const bcrypt = require('bcrypt')
const { use } = require('../routes')
const jwt = require('jsonwebtoken')

const sendError = (res,code,msg)=>{
    return res.status(code).send({
        'status': 'fail',
        'error': msg
    })
}

const register = async (req, res) => {
    const username = req.body.Username
    const password = req.body.Password
    const email = req.body.Email
    const tokens = req.body.Tokens
    const sex = req.body.Sex
    const age = req.body.Age
    const platform = req.body.Platform
    const followers = req.body.Followers
    const profession = req.body.Profession
    const numOfPosts = req.body.NumberOfPosts
    const company = req.body.Company
    const influencer= req.body.Influencer

    try{
        const exists = await User.findOne({'Username' : username})
        if (exists != null){
            return res.status(400).send({
                'status': 'fail',
                'error': 'user exists'
            })
        }
        const salt = await bcrypt.genSalt(10)
        const hashPwd = await bcrypt.hash(password,salt)

        const user = User({
            "Username" : username,
            "Password": hashPwd,
            "Email": email,
            "Tokens" : tokens,
            "Sex":sex,
            "Age":age, 
            "Followers":followers,
            "Profession":profession,
            "Platform":platform, 
            "NumberOfPosts":numOfPosts,
            "Company":company,
            "Influencer":influencer 
        })
        newUser = await user.save();
        res.status(200).send(newUser)

    }catch(err){
        res.status(400).send({
            'status': 'fail',
            'error': err.message
        })
    }
}


const login = async (req, res) => {
    const username = req.body.Username
    const password = req.body.Password
    if (username == null || password == null) return sendError(res,400,'wrong username or password')
    
    try{
        const user = await User.findOne({'Username' : username })
        if (user == null) return sendError(res,400,'wrong username or password')

        const match = await bcrypt.compare(password, user.Password)
        if (!match) return sendError(res,400,'wrong username or password')

        const accessToken = await jwt.sign(
            {'id':user._id},
            process.env.ACCESS_TOKEN_SECRET,
            {expiresIn: process.env.JWT_TOKEN_EXPIRATION}
            )
        const refreshToken = await jwt.sign (
            {'id':user._id},
            process.env.REFRESH_TOKEN_SECRET
        )
        if (user.Tokens == null) user.Tokens = [refreshToken]
        else user.Tokens.push(refreshToken);
        await user.save();
        res.status(200).send({
            'accessToken' : accessToken, 
            'refreshToken' : refreshToken})

    }catch(err){
        return sendError(res,400,err.message)
    }

}

const refreshToken = async (req, res, next)=> {
    authHeaders = req.headers['authorization']
    const token = authHeaders && authHeaders.split(' ')[1]
    if (token == null) return res.sendStatus('401')

    jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, async(err, userInfo)=>{
        if (err) return res.status(403).send(err.message)
        const userId = userInfo.id
        try {
        user = await User.findById(userId)
        if (user == null) return res.status(405).send('error user')
        if (!user.Tokens.includes(token)) {
            user.Tokens=[]//invalidate all user tokens
            await user.save()
            return res.status(403).send('invalid request')
        }
        const accessToken = await jwt.sign(
            {'id': user.id },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: process.env.JWT_TOKEN_EXPIRATION })
        const refreshToken = await jwt.sign(
            {'id': user.id },
            process.env.REFRESH_TOKEN_SECRET)
        
        user.Tokens[user.Tokens.indexOf(token)] = refreshToken
        await user.save()
        res.status(200).send({'accessToken': accessToken, 'refreshToken': refreshToken});
        } catch (err) {
            res.status(403).send(err.message)
        }
    })
}


const logout = async (req, res, next) => {
    authHeaders = req.headers['authorization']
    const token = authHeaders && authHeaders.split(' ')[1]
    if(token == null) return res.sendStatus('401')
    jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, async(err, userInfo) => {
        if (err) return res.status(403).send(err.message)
        const userId = userInfo.id
        try {
            user = await User.findById(userId)
            if (user == null) return res.status(404).send('invalid request')
            if (!user.Tokens.includes(token)) {
                user.Tokens = [] //invalidate all user tokens
                await user.save()
                return res.status(403).send('invalid request')
            }
            user.Tokens.splice(user.Tokens.indexOf(token), 1)
            await user.save()
            res.status(200).send();
        } catch(err) {
            res.status(403).send(err.message)
        }
    })
}

const getUserByUserNameInSignIn = async (req, res) => {
    try {
        
        const user = await User.findOne({'Username' : req.params.username })
        res.status(200).send(user)
    } catch (err) {
        res.status(400).send({
            'status': 'fail',
            'error': err.message
        })
    }
}

module.exports = {
    login,
    register,
    logout,
    refreshToken,
    getUserByUserNameInSignIn
}