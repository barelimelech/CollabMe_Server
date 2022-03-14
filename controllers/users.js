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

const getUserById = async (req, res) => {
    try {
        const user = await User.findOne({'_id' : req.params.id })
        res.status(200).send(user)
    } catch (err) {
        res.status(400).send({
            'status': 'fail',
            'error': err.message
        })
    }
}

const editUser = async(req, res) => {

    var updatedUser = {
        Username:req.body.Username,
        Password:req.body.Password,
        Email:req.body.Email,
        Tokens:req.body.Tokens,
        Sex :req.body.Sex,
        Age: req.body.Age,
        Followers: req.body.Followers,
        Profession:req.body.Profession,
        Platform:req.body.Platform,
        NumberOfPosts:req.body.NumberOfPosts,
        Company:req.body.Company,
        Influencer:req.body.Influencer

    };

    User.update({
         UserName: req.params.Username
         }, updatedUser, function(err, affected){
        res.send(200, updatedUser);
    });
}


module.exports = {
    getUserByUserNmae,
    editUser,
    getUserById
}
