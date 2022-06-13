const Offer = require('../models/offer_model')

const getOfferFromFreeSearch = async (req, res) => {

    var num1 = req.params.freesearch;

    try {
        let offers4, offers6;
        const offers1 = await Offer.find({'User': num1});
        const offers2 = await Offer.find({'Description': num1});
        const offers3 = await Offer.find({'HeadLine': num1});

        if (Number.isInteger(parseInt(num1)))
        {
             offers4 = await Offer.find({'Price':parseInt(num1)});
             offers6 = await Offer.find({'FinishDate': parseInt(num1)});
        }
        else{
             offers4 = [];
             offers6 =[];
        }
        const offers5 = await Offer.find({'Profession': num1});

        const offers = [], offers0 = [];
        offers[0] = offers1; offers[1] = offers2; offers[2] = offers3;offers[4] = offers4;offers[5]=offers5;
        offers[6] = offers6;

        var result =  offers.filter(e => e.length);

        res.status(200).send(result.flat());
    } catch (err) {
        res.status(400).send({
            'status': 'fail',
            'error': err.message
        })
    }
}

const getOfferFromSpecificSearch = async (req, res) => {

    var description = req.body.description;
    var headline = req.body.headline;
    var fromdate = req.body.fromdate;
    var todate = req.body.todate;
    var fromprice = req.body.fromprice;
    var toprice = req.body.toprice;
    var professions =req.body.professions;
    var user = req.body.user;

    try {
        var result = [];
        var flag=false;

        if (description!==("null")){
            result = await Offer.find({'Description':description});
            flag=true;
            
        }
        //
        if (user!==("null")){
            if(flag==true){
                result = await result.filter((d => d.User === user));
            }else{
                result = await Offer.find({'User':user}); 
                flag=true;
            }

        }
        //
            if (fromprice!=="null"&&toprice!=="null"){

                var fromprice1 = parseInt(fromprice);
                var toprice1 = parseInt(toprice);

                if(flag==true){
                result = await result.filter((d => (d.Price > fromprice1-1 && d.Price < toprice1+1)));
                flag=true;
            }else{
                result = await Offer.find({'Price':
                {
                    $gt : fromprice1-1, 
                    $lt : toprice1+1
                }}
                ); 

                flag=true;

            }

        }
        //
        if (headline!==("null")){
            if(flag==true){
                result = await result.filter((d => d.HeadLine === headline));
            }else{
                result = await Offer.find({'HeadLine':headline}); 
                flag=true;
            }

        }
        //
        if (professions!=="null" && professions!==null && professions!==undefined){
            
            if(flag==true){ 
                                   
                result =result.filter(d =>JSON.stringify(d.Profession)==JSON.stringify(professions));    
              
                flag=true;
            }else{
                result = await Offer.find({'Profession':professions}); 
                flag=true;
            }
        }
        
        if (fromdate!==("null")&&todate!==("null")){
            var fromdate1 = parseInt(fromdate);
            var todate1 = parseInt(todate);

            var from3=(Math.floor(fromdate1%10000));
            var to3 =(Math.floor(todate1%10000));

            if(flag==true){
                result = await result.filter((d => Math.floor(d.FinishDate%10000) <= to3
                     && Math.floor(d.FinishDate%10000) >= from3));

            }else{
                result = await Offer.find({});
                result = await result.filter((d => Math.floor(d.FinishDate%10000) <= to3
                && Math.floor(d.FinishDate%10000) >= from3));
                flag=true;

            }

        }
        //
        res.status(200).send(result);
    } catch (err) {
        res.status(400).send({
            'status': 'fail',
            'error': err.message
        })
    }
}


module.exports = {
    getOfferFromFreeSearch,
    getOfferFromSpecificSearch
}
