const mongoose = require('mongoose');

const Dishes = require('./models/dishes');

const url = 'mongodb://localhost:27017/conFusion';
//Connecting to database using promises 
const connect = mongoose.connect(url);
//Here db is a mongoDB keyword (not used anywhere in code site)
connect.then((db) => {

    console.log('Connected correctly to server');

//Created a document according to the Schema

//Method -1 :

   /* var newDish = Dishes({
        name: 'Gurubalan',
        description: 'test'
    });
    //Saving it 
    newDish.save()
        .then((dish) => {
            console.log(dish);
            //Finding all documents 
            return Dishes.find({});
        })
        .then((dishes) => {
            console.log(dishes);
            //Deleting all documents -> We have to use deleteOne() or deleteMany() : remove() is depreciated 
            return Dishes.remove({});
        })
        .then(() => {
            //closing connection pools
            return mongoose.connection.close();
        })
        .catch((err) => {
            console.log(err);
        });
}).catch((err)=>{
    console.log(err);
}); */

//Method -2 : Directly using it with the exported Schema and passing in the document as the parameter 
        Dishes.create({
            name: 'Gurubalan-1.0',
            description: 'Test'
        })
        .then((dish) => {
            console.log(dish);
            
            return Dishes.find({}).exec();
        })
        .then((dishes) => {
            console.log(`Found dishes are:\n`,dishes);

            return Dishes.remove({});
        })
        .then(() => {
            return mongoose.connection.close();
        })
        .catch((err) => {
            console.log(err);
        });
    }).catch((err)=>{
        console.log(err);
})