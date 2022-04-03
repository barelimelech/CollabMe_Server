const Candidate = require('../models/offer_model')
const Users = require('../models/user_model')
const { use } = require('../routes')


const getCandidates = async(req, res) =>{

    try {
    offerId = await Candidate.findOne({'IdOffer':req.params.id});
    const userArr = [];    
    for(var i=0; i<offerId.Users.length; i++){
         userArr[i] =  await Users.find({'Username':offerId.Users[i]}); 
         
    }   
    const newArry = userArr.flat();         
        res.status(200).send(newArry);
    }catch(err){

    }
}

module.exports = {
    getCandidates
}