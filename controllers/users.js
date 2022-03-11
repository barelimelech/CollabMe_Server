const User = require('../models/user_model')
const bcrypt = require('bcrypt')
const { use } = require('../routes')


const sendError = (res,code,msg)=>{
    return res.status(code).send({
        'status': 'fail',
        'error': msg
    })
}

const getUserByUserNmae = async (req, res) => {
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
    getUserByUserNmae
}
