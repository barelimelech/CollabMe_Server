const UserChat = require('../models/userChat_model.js')
const bcrypt = require('bcrypt')
const { use } = require('../routes')

const getChatOtherSide = async (req, res) => {
    try {      
       const user = await UserChat.find({'Username' : req.body.Username})
       const user1 = await user.filter((d => d.theUserNameYouText === req.body.theUserNameYouText))
      
        if(user1==null){
            res.status(400).send({
                'status': 'fail',
                'error': err.message
            })
        }
        res.status(200).send(user1)
    } catch (err) {
        res.status(400).send({
            'status': 'fail',
            'error': err.message
        })
    }
}


const getusersChatConnectotherside = async (req, res) => {
    try {        
        const user = await UserChat.find({'theUserNameYouText' : req.body.theUserNameYouText})
        const user2 = await user.filter((d => d.Username === req.body.Username))
        console.log(user2);
        if(user2==null){
            res.status(400).send({
                'status': 'fail',
                'error': err.message
            })
        }
        res.status(200).send(user2)
    } catch (err) {
        res.status(400).send({
            'status': 'fail',
            'error': err.message
        })
    }
}
module.exports = {
    getChatOtherSide,
    getusersChatConnectotherside
}