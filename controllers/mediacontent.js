const Offer = require('../models/offer_model')

const addMediaContent = async (req, res) => { 
    const idOffer = req.body.IdOffer;
    const mediaContent = req.body.MediaContent;
    var toUpdate;

    try {       
        res.status(200).send(toUpdate = await Offer.updateOne(
            {
                IdOffer:idOffer
            },{
                $set: {
                    MediaContent: mediaContent  
                    }
            }));

            res.status(200);
        
    } catch (err) {
        res.status(400).send({
            'status': 'fail',
            'error': err.message
        })
    }


       
}

const getMediaContentOfAnOffer = async (req, res) => {
    try {       
        const offers = await Offer.findOne({'IdOffer':req.params.id});

            res.status(200).send(offers.MediaContent)
        
    } catch (err) {
        res.status(400).send({
            'status': 'fail',
            'error': err.message
        })
    }
}

module.exports = {
    addMediaContent,
    getMediaContentOfAnOffer
}