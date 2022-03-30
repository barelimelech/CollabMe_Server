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

        const offers = [], offers0 = [];
        offers[0] = offers1; offers[1] = offers2; offers[2] = offers3;offers[4] = offers4;offers[5]=offers5;
        var result =  offers.filter(e => e.length);

        res.status(200).send(result.flat());
    } catch (err) {
        res.status(400).send({
            'status': 'fail',
            'error': err.message
        })
    }
}
/*
const getOfferFromDescription = async (req, res) => {
    var description = req.params.description;

    try {
        const offers1 = await Offer.find({'Description':description});

        res.status(200).send(offers1);
    } catch (err) {
        res.status(400).send({
            'status': 'fail',
            'error': err.message
        })
    }
}*/
/*
        var result;
        Offer.createIndex({Description: 'text', HeadLine: 'text', FinishDate: 'text',
        Price: 'text', Profession: 'text', User: 'text' })
        result = await Offer.find( { $text: { $search: num1.toString() } } )

        res.status(200).send(result)
*/

const getOfferFromSpecificSearch = async (req, res) => {
    console.log('youre in offer from specific search ');
    var description = req.params.description;
    var headline = req.params.headline;
    var fromdate = req.params.fromdate;
    var todate = req.params.todate;
    var fromprice = req.params.fromprice;
    var toprice = req.params.toprice;
    var professions =req.params.professions;
    var user = req.params.user;

    try {
        var result = [];
        var flag=false;

        if (description!==("null")){
            result = await Offer.find({'Description':description});
            flag=true;
            console.log("hello1");
            
        }
        //
        if (headline!==("null")){
            flag=true;

            if(flag==true){
                result = await result.filter((d => d.HeadLine === headline));
                console.log("hello2");
                

                flag=true;
            }else{
                result = await Offer.find({'HeadLine':headline}); 
            }
            
        }
        //
        if (user!==("null")){
            flag=true;

            if(flag==true){
                result = await result.filter((d => d.User === user));
                console.log("hello3");
                
                flag=true;
            }else{
                result = await Offer.find({'User':user}); 
            }
        }
        //
        if (professions!=="null"){
            flag=true;
            if(flag==true){ 
                console.log(professions);
                var proffesions3 = JSON.stringify(professions);
                var profeesions2 =JSON.parse(proffesions3);                                     
                result =result.filter(d =>d.Profession==profeesions2);    
                console.log(result);              
                console.log("hello4");              

                flag=true;
            }else{
                result = await Offer.find({'Profession':professions}); 
            }
        }
        //
        if (fromdate!==("null")&&todate!==("null")){
            flag=true;

            if(flag==true){
                result = await result.filter((d => (d.FinishDate > fromdate-1 && d.FinishDate < todate+1)));
                console.log("hello5");
                console.log(result);
                flag=true;
            }else{
                result = await Offer.find({'FinishDate':{$gt : fromdate-1, $lt : todate+1}}); 
                console.log("hello5");
                console.log(result);
            }
        }
        //
        if (fromprice!=="null"&&toprice!=="null"){

            flag=true;

            if(flag==true){
                result = await result.filter((d => (d.Price > fromprice-1 && d.Price < toprice+1)));
                console.log("hello6");
                console.log(result);
                flag=true;
            }else{
                result = await Offer.find({'Price':{$gt : fromprice-1, $lt : toprice+1}}); 
                console.log("hello5");
                console.log(result);
            }
        }

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
   // getOfferFromDescription
}

//    getOfferFromSpecificSearch,