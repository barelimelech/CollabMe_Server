const Candidate = require('../models/offer_model')
const Users = require('../models/user_model')
const { use } = require('../routes')
const Offer = require('../models/offer_model')

const getCandidates = async(req, res) =>{
    offerId = await Candidate.findOne({'IdOffer':req.params.id});
    const userArr = [];    
    for(var i=0; i<offerId.Users.length; i++){
         userArr[i] =  await Users.find({'Username':offerId.Users[i]}); 
    }        
   
    res.status(200).send(userArr.flat());
}

const getoffersfromuserinCandidates=async(req, res) =>{
    const offers = await Offer.find()
    let user;  
    let count=0;
    const offersArr=[];    
    for(var i=0; i<offers.length; i++){
       for(var j=0;j<offers[i].Users.length;j++){
        if(offers[i].Users!=[]){ 
            if(offers[i].Users[j]==req.params.username){

                  offersArr[count]=offers[i];   
                  count++;
                
            }            
       } 
     
    } 
   }    
    res.status(200).send(offersArr.flat());
}

const getCandidateFromSearch = async (req, res) => {

    var candidateName = req.params.candidatesearch;

    try {
        
        const candidateFree = await Users.find({'Username':req.params.candidatesearch});

        res.status(200).send(candidateFree[0]);
    } catch (err) {
        res.status(400).send({
            'status': 'fail',
            'error': err.message
        })
    }
}



module.exports = {
    getCandidates,
    getoffersfromuserinCandidates,
    getCandidateFromSearch
}