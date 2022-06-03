const UserChat = require('../models/userChat_model')

const { use } = require('../routes')

const getChatOtherSide = async (req, res) => {
    try {    
        var username = req.body.Username;
        var usernametext = req.body.theUserNameYouText;
       
       const user = await UserChat.find({'Username' : username})
    
       const user1 =  user.filter((d => d.theUserNameYouText === usernametext))
        
        if(user1==null){
            res.status(400).send({
                'status': 'fail',
                'error': err.message
            })
        }
        res.status(200).send(user1.flat())
    } catch (err) {
        res.status(400).send({
            'status': 'fail',
            'error': err.message
        })
    }
}


// const getusersChatConnectotherside = async (req, res) => {
//     try {      
//         const usernametext = req.body.theUserNameYouText;    
//         const username = req.body.Username;
//         const user = await UserChat.find({'theUserNameYouText' : usernametext})
//         // console.log(user)
//         const user2 = user.filter((d => d.Username === username))
//         // console.log(user2);
//         if(user2==null){
//             res.status(400).send({
//                 'status': 'fail',
//                 'error': err.message
//             })
//         }
//         res.status(200).send(user2)
//     } catch (err) {
//         res.status(400).send({
//             'status': 'fail',
//             'error': err.message
//         })
//     }
// }
module.exports = {
    getChatOtherSide,
    // getusersChatConnectotherside
}