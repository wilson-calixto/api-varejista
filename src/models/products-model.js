let productsCollection;

/*This class implements communication and request methods for mongo db*/

class ProductsModel {
    
    //This method is initialized with the application, check the 'app' file for more details

    static async injectDb(conn){

        //Check whether database connection already exists 
        if(productsCollection){
            return;
        }

        try{

            this.productsCollection = await conn.db("retailer").collection("products");
        }catch(e){
            console.error(`Unable to establish a collection handle in ProductsModel: ${e}`);
            return { error: e }
        }
    }
    
}

module.exports = { ProductsModel: ProductsModel };