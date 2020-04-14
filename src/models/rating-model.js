const mongodb = require('mongodb');


let collections={}

class RatingModel {
    
    //This method is initialized with the application, check the 'app' file for more details

    static async injectDb(conn){

        //Check whether database connection already exists 
        // if(this.collections["ratings"]){
        //     return;
        // }

        try{
            
            this.collections = {"ratings": await conn.db("retailer").collection("ratings")}

        }catch(e){
            console.error(`Unable to establish a collection handle in RatingModel: ${e}`);
            return { error: e }
        }
    }

  

    static async insertRatingInDB(rating){

        try{
            //TODO remover o campo category E OUTROS CAMPOS NAO USADO NA TALEN DE DETALHES
            rating['fk_product'] = await new mongodb.ObjectID(rating['fk_product'])
            rating['date'] = new Date()

            

            return await this.collections['ratings'].insertOne(rating)

        }catch(e){
            console.error(`Error in insert operation: ${e}`);
            return { error: e }
        }
    }


    static async getRatingsFromDB(){
        try{
            return await this.collections['ratings'].find({}).toArray();
        }catch(e){
            console.error(`Error in insert operation: ${e}`);
            return { error: e }
        }
    }
    




    
}

module.exports = { RatingModel: RatingModel };