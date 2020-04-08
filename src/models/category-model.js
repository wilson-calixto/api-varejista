let categoryCollection;

/*This class implements communication and request methods for mongo db*/

class CategoryModel {
    
    //This method is initialized with the application, check the 'app' file for more details

    static async injectDb(conn){

        //Check whether database connection already exists 
        if(categoryCollection){
            return;
        }

        try{

            this.categoryCollection = await conn.db("retailer").collection("category");
        }catch(e){
            console.error(`Unable to establish a collection handle in categoryModel: ${e}`);
            return { error: e }
        }
    }
    

    static async insertProductInDB(category){
        console.log("@@@@@@@@@@@@",category)
        try{
            await this.categoryCollection.insertOne({category})
        }catch(e){
            console.error(`Error in insert operation: ${e}`);
            return { error: e }
        }
    }
    
    
    static async getCategoryFromDB(description){
        try{
            console.log('description',description)

            return await this.categoryCollection.find( { $text: { $search: description } } ).toArray();

        }catch(e){
            console.error(`Error in insert operation: ${e}`);
            return { error: e }
        }
    }
    



    
}

module.exports = { CategoryModel: CategoryModel };