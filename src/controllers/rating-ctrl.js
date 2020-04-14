const { RatingModel } = require('../models/rating-model');
const { ProductModel } = require('../models/product-model');

/*This class implements methods to structure the body of the responses and to make validations before requesting data from the database*/

class RatingCtrl {
    
    static async getRating(req, res, next){
        try{
            const rating = await RatingModel.getRatingFromDB();
            res.status(200).json(rating);
        }catch (e){
            console.log(e);
            res.status(500).json({ error: e });
        }
    }

    static async insertRating(req, res, next){
        try{            
            let query_result = await RatingModel.insertRatingInDB(req.body);

            query_result=await ProductModel.updateRating(req.body)

            res.status(200).json(query_result);
        }catch (e){
            console.log(e);
            res.status(500).json({ error: e });
        }
    }

}


module.exports = { RatingCtrl: RatingCtrl };