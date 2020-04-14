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

            this.collections["women_s_fashion"]= await conn.db("retailer").collection("women_s_fashion")
            this.collections["women_s_fashion_details"]= await conn.db("retailer").collection("women_s_fashion_details")

            this.collections["ratings"]= await conn.db("retailer").collection("ratings")



        }catch(e){
            console.error(`Unable to establish a collection handle in ProductModel: ${e}`);
            return { error: e }
        }
    }

    
    static async updateRating(rating){
        try{
            let resp = await this.collections[rating.category+'_details'].updateOne(
                { "_id" : new mongodb.ObjectID(rating.fk_product_details) },
                {$push: {
                    last_ratings: {
                      $each: [ rating ],
                      $slice: -5
                    }
                  }
                }
             );


             let rating_by_products = await this.collections['ratings'].aggregate([
                {
                    $group: {
                        _id: "$fk_product",
                        avg_rate: { "$avg": "$rate" } 
                      } 
                  },
                ]).toArray()
                
                let last_rate;
                let category;

                for (let i=0;i<rating_by_products.length;i++){




                    last_rate = await  this.collections['ratings'].find(
                        {fk_product : rating_by_products[i]._id},
                        {limit:1}
                    ).toArray()

                    category = last_rate[0].category


                    await this.collections[category].updateOne(
                        { "_id" : new mongodb.ObjectID(rating_by_products[i]._id)},
                        {'$set': {'rating': rating_by_products[i].avg_rate}
                        }
                     );
                    
                }
    
        
                

             return resp
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
            let resp = await this.insertProductBasicInformation(Product);
            resp = await this.insertProductDetailsInformation(Product,resp['insertedId']);
            return {details_id :resp['insertedId']}

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