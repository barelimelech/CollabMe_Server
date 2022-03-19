const Candidate = require('../models/offer_model')
const Users = require('../models/user_model')
const { use } = require('../routes')


const getCandidates = async(req, res) =>{
    offerId = await Candidate.findOne({'offerId':req.params.offerId});
    const userArr = []; 
    for(var i=0; i<offerId.Users.length; i++){
         userArr[i] =  await Users.findOne({'Username':offerId.Users[i]}); 
    }
    res.status(200).send(userArr);
}

module.exports = {
    getCandidates
}