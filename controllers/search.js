const Offer = require('../models/offer_model')

const getOfferFromFreeSearch = async (req, res) => {

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

const getOfferFromSpecificSearch = async (req, res) => {
   // console.log('youre in offer from specific search ');
    var description = req.body.description;
    var headline = req.body.headline;
    var fromdate = req.body.fromdate;
    var todate = req.body.todate;
    var fromprice = req.body.fromprice;
    var toprice = req.body.toprice;
    var professions =req.body.professions;
    var user = req.body.user;


  //  console.log(professions.length);

    try {
        var result = [];
        var flag=false;

        if (description!==("null")){
            result = await Offer.find({'Description':description});
            flag=true;
        //    console.log("description in");
        //    console.log(result);
            
        }
        //
        if (user!==("null")){
            if(flag==true){
                result = await result.filter((d => d.User === user));
         //       console.log("user in");
            }else{
                result = await Offer.find({'User':user}); 
                flag=true;
            }
           // console.log(result);

        }
        //
            if (fromprice!=="null"&&toprice!=="null"){
          //      console.log(toprice);
           //     console.log(fromprice);

            if(flag==true){
                result = await result.filter((d => (d.Price > fromprice-1 && d.Price < toprice+1)));
              //  console.log("price in");
                flag=true;
            }else{
                result = await Offer.find({'Price':{$gt : fromprice-1, $lt : toprice+1}}); 
               // console.log("hello5");
                flag=true;

            }
           // console.log(result);

        }
        //
        if (headline!==("null")){
            if(flag==true){
                result = await result.filter((d => d.HeadLine === headline));
               // console.log("headline in");
            }else{
                result = await Offer.find({'HeadLine':headline}); 
                flag=true;
            }
            //console.log(result);

        }
        //
        //console.log(professions);
        if (professions!=="null"){
            
            if(flag==true){ 
                                   
                result =result.filter(d =>JSON.stringify(d.Profession)==JSON.stringify(professions));    
              
            //   console.log("professions in");              

                flag=true;
            }else{
                result = await Offer.find({'Profession':professions}); 
                flag=true;
            }
            //console.log(result);

        }
        
        if (fromdate!==("null")&&todate!==("null")){

            if(flag==true){
                result = await result.filter((d => parseInt(d.FinishDate) <= parseInt(todate)));
              //  console.log(result);

                result = await result.filter((d => parseInt(d.FinishDate) >= parseInt(fromdate)));
               // console.log(result);

              // console.log("date in");
            }else{
                result = await Offer.find({'FinishDate':{
                    $gt : fromdate-1, $lt : todate+1
                }}); 
               // console.log("hello5");
                flag=true;

            }
            //console.log(result);

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
