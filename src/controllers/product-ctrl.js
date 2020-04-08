const { ProductModel } = require('../models/product-model');
const { CategoryModel } = require('../models/category-model');

/*This class implements methods to structure the body of the responses and to make validations before requesting data from the database*/

class ProductCtrl {
    
    static async getProduct(req, res, next){
        try{
            const description=req.body.description
            const probable_categories = await CategoryModel.getCategoryFromDB(description);
            console.log('probable_categories',probable_categories)
            const products = await ProductModel.getProductsFromDB(probable_categories[0].name,description);
            res.status(200).json(products);
        }catch (e){
            console.log(e);
            res.status(500).json({ error: e });
        }
    }

    static async insertProduct(req, res, next){
        try{            

            let query_result = await ProductModel.insertProductInDB(req.body);
            res.status(200).json(query_result);
        }catch (e){
            console.log(e);
            res.status(500).json({ error: e });
        }
    }

}


module.exports = { ProductCtrl: ProductCtrl };