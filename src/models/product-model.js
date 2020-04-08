const mongodb = require('mongodb');

let productCollection;
let mensFashionCollection
/*This class implements communication and request methods for mongo db*/
let collections={}

class ProductModel {
    
    //This method is initialized with the application, check the 'app' file for more details

    static async injectDb(conn){

        //Check whether database connection already exists 
        if(productCollection){
            return;
        }

        try{

            this.productCollection = await conn.db("retailer").collection("product");
            
            this.collections = {"men_s_fashion": await conn.db("retailer").collection("men_s_fashion")}
            this.collections["men_s_fashion_details"]= await conn.db("retailer").collection("men_s_fashion_details")

        }catch(e){
            console.error(`Unable to establish a collection handle in ProductModel: ${e}`);
            return { error: e }
        }
    }

    
    static async updateRating(rating){
        try{
            return await this.collections[rating.category].updateOne(
                { "_id" : rating.fk_product_details },
                [ { $set: { last_ratings: { $concatArrays: [ "$last_ratings", [ rating]  ] } } } ]
             );
        }catch(e){
            console.error(`Error in insert operation: ${e}`);
            return { error: e }
        }
    }

    static async getProductsFromDB(category,description){
        try{
            return await this.collections[category].find( { $text: { $search: description } } ).toArray();
        }catch(e){
            console.error(`Error in insert operation: ${e}`);
            return { error: e }
        }
    }

    static async insertProductInDB(Product){

        try{
            const resp = await this.insertProductBasicInformation(Product);
            await this.insertProductDetailsInformation(Product,resp['insertedId']);

        }catch(e){
            console.error(`Error in insert operation: ${e}`);
            return { error: e }
        }
    }

    static async insertProductBasicInformation(Product){
        return await this.insertData(Product.information.category,Product.information)
    }

    static async insertProductDetailsInformation(Product,id){
        Product.details['fk_product']=new mongodb.ObjectID(id)
        console.log('id gerado',id)
        return this.insertData(Product.information.category+"_details",Product.details)
    }

    static async insertData(category,data){
        try{
            return await this.collections[category].insertOne(data)
        }catch(e){
            console.error(`Error in insert operation: ${e}`);
            return { error: e }
        }
    }


    




    
}

module.exports = { ProductModel: ProductModel };