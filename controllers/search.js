const Offer = require('../models/offer_model')

const getOfferFromFreeSearch = async (req, res) => {
    console.log('youre in offer from free search ');
    var num1 = req.params.freesearch;

    try {
        const offers1 = await Offer.find({'User':req.params.freesearch});
        const offers2 = await Offer.find({'Description':req.params.freesearch});
        const offers3 = await Offer.find({'HeadLine':req.params.freesearch});
        const offers4 = await Offer.find({'Price':num1.toString()});
        const offers5 = await Offer.find({'Profession':req.params.freesearch});
        const offers6 = await Offer.find({'FinishDate': num1.toString()});

        const offers = [];
        offers[0] = offers1; offers[1] = offers2; offers[2] = offers3;offers[4] = offers4;offers[5]=offers5;
        var result =  offers.filter(e => e.length);

        res.status(200).send(result)
    } catch (err) {
        res.status(400).send({
            'status': 'fail',
            'error': err.message
        })
    }
}

module.exports = {
    getOfferFromFreeSearch
}