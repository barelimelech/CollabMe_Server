const Offer = require('../models/offer_model')

const getOffers = async (req, res) => {
    try {
        offers = await Offer.find()
        res.status(200).send(offers)
    } catch (err) {
       
    }
}

const getOfferById = async (req, res) => {
    try {       
        const offers = await Offer.findOne({'IdOffer':req.params.id});
        if(offers==null){
            res.status(400).send({
                'status': 'fail',
                'error': err.message
            })

        }else{
            res.status(200).send(offers)
        }
    } catch (err) {
        res.status(400).send({
            'status': 'fail',
            'error': err.message
        })
    }
}

const addNewOffer = async (req, res) => { 
    const description = req.body.Description;
    const headLine =req.body.HeadLine;
    const finishDate = req.body.FinishDate;
    const price = req.body.Price;
    const idOffer = req.body.IdOffer;
    const status =  req.body.Status;
    const profession =  req.body.Profession;
    const user =  req.body.User;
    const users =  req.body.Users;
    const intrestedVerify =  req.body.IntrestedVerify;
    const image =  req.body.Image;
    

    const offer = Offer({
        Description:description,
        HeadLine:headLine,
        FinishDate: finishDate,
        Price :price,
        IdOffer :idOffer,
        Status: status,
        Profession: profession,
        User:user,
        Users: users,
        IntrestedVerify:intrestedVerify,
        Image:image
    })

    const offer2 = await offer.save();
    res.status(200).send(offer2)
    
       
}

const deleteOffer = async(req, res) => {
    try{
        offerTodelete = await Offer.findOne({'_id':req.params.id})
        Offer.deleteOne({
            id: offerTodelete.IdOffer
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
            return res.send(err.message);
        }

}

const editOffer = async(req, res) => {
    var updatedPost = {
        Description:req.body.Description,
        HeadLine:req.body.HeadLine,
        FinishDate:req.body.FinishDate,
        Price:req.body.Price,
        IdOffer :req.body.IdOffer,
        Status: req.body.Status,
        Profession: req.body.Profession,
        User:req.body.User,
        Users: req.body.Users,
        IntrestedVerify:req.body.IntrestedVerify,
        Image:req.body.Image
    };

    Offer.updateOne({
        IdOffer: req.params.id
         }, updatedPost, function(err, affected){
        res.send(200, updatedPost);
    });
}




module.exports = {
    getOffers,
    getOfferById,
    addNewOffer,
    deleteOffer,
    editOffer
}