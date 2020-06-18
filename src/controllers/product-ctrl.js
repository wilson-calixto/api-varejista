const { ProductModel } = require('../models/product-model');
const { CategoryModel } = require('../models/category-model');
// const fs = require('fs');
var fs = require('fs'); 
/*This class implements methods to structure the body of the responses and to make validations before requesting data from the database*/

class ProductCtrl {


    static async getProductMainImagesById(req, res, next){
        const dir = "./imagens/products/"+req.params.id+"/main/";
        ProductCtrl.getProductImagesById(req, res, dir);
    }

    static async getProductAdtionalImagesById(req, res, next){
        const dir = "./imagens/products/"+req.params.id+"/adtional/";
        ProductCtrl.getProductImagesById(req, res, dir);
    }

    static async getProductImagesById(req, res, dir){
        try{
            let array_temp=[]


            fs.readdir( dir, (error, files) => {
                for (var i = 0; i < files.length; i++) {
                    let buff = fs.readFileSync(dir+files[i]);
                    let base64data = buff.toString('base64');
                    array_temp.push(base64data)
                    console.log("iiii",i)
                }
                
                res.status(200).json(array_temp);
            });

        }catch (e){
            console.log(e);
            res.status(500).json({ error: e });
        }
    }
    

    static async getProductById(req, res, next){
        try{
            const id=req.params.id
                //TODO ajeitar essa categoria
            let product = await ProductModel.getProductsByIdFromDB('men_s_fashion',id);                                    
            let array_temp=[]
            const dir = "./imagens/products/"+id+"/main/";

            fs.readdir( dir, (error, files) => { 
                for (var i = 0; i < files.length; i++) {
                    let buff = fs.readFileSync(dir+files[i]);
                    let base64data = buff.toString('base64');
                    array_temp.push(base64data)
                    console.log("iiii",i)
                }
                product.imagens=array_temp
                res.status(200).json(product);
    
            });




        }catch (e){
            console.log(e);
            res.status(500).json({ error: e });
        }
    }

    static async getProduct(req, res, next){
        try{
            const store_id=req.query.store_id
            let products;
            console.log('store_id',store_id)

            if(store_id === undefined){
                const description=req.body.description
                const probable_categories = await CategoryModel.getCategoryFromDB(description);
                console.log('probable_categories',probable_categories)
                products = await ProductModel.getProductsFromDB(probable_categories[0].name,description);
            }else{
            
                products = await ProductModel.getProductsFromDB('men_s_fashion','shorts')
            }
            
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

// const shell = require('shelljs')
// const path = require('path')

// module.exports.count = () => shell.exec(`cd ${path.join('path', 'to', 'folder')} || exit; ls -d -- */ | grep 'page-*' | wc -l`, { silent:true }).output