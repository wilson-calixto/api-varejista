const { ProductsModel } = require('../models/products-model');

/*This class implements methods to structure the body of the responses and to make validations before requesting data from the database*/

class ProductsCtrl {
    
    static async getModels(req, res, next){
        try{            
            let models = {}//await ModelsModel.getModelsFromDb();
            res.status(200).json(models);
        }catch (e){
            console.log(e);
            res.status(500).json({ error: e });
        }
    }

}


module.exports = { ProductsCtrl: ProductsCtrl };