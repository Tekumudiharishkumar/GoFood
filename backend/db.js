const mongoose = require('mongoose');
const { MongoClient } = require("mongodb");
const mongoURI = "mongodb+srv://gofood:gofood@cluster0.sytliu4.mongodb.net/gofoodmern?retryWrites=true&w=majority"

// const mongoURI = " mongodb+srv://gofood:gofood@ac-xfv4x2r-shard-00-00.sytliu4.mongodb.net:27017,ac-xfv4x2r-shard-00-01.sytliu4.mongodb.net:27017,ac-xfv4x2r-shard-00-02.sytliu4.mongodb.net:27017/gofoodmern?ssl=true&replicaSet=atlas-kjz9st-shard-0&authSource=admin&retryWrites=true&w=majority"
const mongoDB = async () => {
     try{
        await mongoose.connect(mongoURI, {useNewUrlParser: true});
        console.log("connected");
        const fetched_data =  await mongoose.connection.db.collection("food_items") ;
        try{
            const data = await fetched_data.find({}).toArray();
            global.food_items = data;
                
                const foodCategory = await mongoose.connection.db.collection("foodCategory");
                
                try{
                    const catData = await foodCategory.find({}).toArray();
                    global.foodCategory = catData;

                }catch(err){
                    console.log(err.message);
                }
                
        }catch(err){
            console.log(err.message);
        }
    }
    catch(err){
        console.log(err.message);
    };
    
}

module.exports = mongoDB;