const Offer = require('../models/offer_model')

const addMediaContent = async (req, res) => { 
    const idOffer = req.body.IdOffer;
    const mediaContent = req.body.MediaContent;
    var toUpdate;

    toUpdate = await Offer.update(
        {
            IdOffer:idOffer
        },{
            $set: {
                MediaContent: mediaContent  
                }
        });

        res.send(200, "done adding media!");
       
}

module.exports = {
    addMediaContent
}