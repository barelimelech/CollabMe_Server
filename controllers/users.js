const User = require('../models/user_model')
const bcrypt = require('bcrypt')
const { use } = require('../routes')

const getUserByUserNmae = async (req, res) => {
    try {        
        const user = await User.findOne({'Username' : req.params.username })
        if(user==null){
            res.status(400).send({
                'status': 'fail',
                'error': err.message
            })
        }
        res.status(200).send(user)
    } catch (err) {
        res.status(400).send({
            'status': 'fail',
            'error': err.message
        })
    }
}

const getUserByEmail = async (req, res) => {
    try {        
        const user = await User.findOne({'Email' : req.params.email})
        if(user==null){
            res.status(400).send({
                'status': 'fail',
                'error': err.message
            })
        }
        res.status(200).send(user)
    } catch (err) {
        res.status(400).send({
            'status': 'fail',
            'error': err.message
        })
    }
}

const editUser = async(req, res) => {
    const user = await User.findOne({'Username':req.params.username })  
    var updatedUser = {
        Username:req.body.Username,
        Password:user.Password,
        Email:req.body.Email,
        Tokens:req.body.Tokens,
        Sex :req.body.Sex,
        Age: req.body.Age,
        Followers: req.body.Followers,
        Profession:req.body.Profession,
        Platform:req.body.Platform,
        NumberOfPosts:req.body.NumberOfPosts,
        Company:req.body.Company,
        Influencer:req.body.Influencer,
        Image:req.body.Image,
        RejectedOffers:req.body.RejectedOffers

    };

    await User.updateOne({
         UserName: req.params.Username
         }, updatedUser, function(err, affected){
            res.send(200, updatedUser);
        }).clone().catch(function(err){ })
    
}

const deleteuser = async(req, res) => {
    try{
    usertodelete = await User.findOne({'Username':req.params.username });
    User.deleteOne({
        Username: usertodelete.UserName
        }, function (err) {
        if (err) {
          res.status(404).send({
            'status': 'fail',
            'error': err.message
            });
        }
        res.status(200).send();
        });
    }catch(err){

    }

}

const isconnected = async(req, res) => {
    res.status(200).send(true);
};


module.exports = {
    getUserByUserNmae,
    editUser,
    getUserByEmail,
    deleteuser,
    isconnected
}