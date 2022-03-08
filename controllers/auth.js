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
            'Username' : username,
            'Password': hashPwd
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
        res.status(200).send({'accessToken' : accessToken})

    }catch(err){
        return sendError(res,400,err.message)
    }

}

const logout = async (req, res) => {
    res.status(400).send({
        'status': 'fail',
        'error': 'not implemented'
    })
}

module.exports = {
    login,
    register,
    logout
}