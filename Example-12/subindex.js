const mongoose = require('mongoose');

const Dishes = require('./models/dishes');

const url = 'mongodb://localhost:27017/conFusion';
//Connecting to database using promises 
const connect = mongoose.connect(url);
//Here db is a mongoDB keyword (not used anywhere in code site)
connect.then((db) => {

    console.log('Connected correctly to server');

//
Dishes.create({
    name: 'Gurubalans',
    description: 'test'
})
.then((dish) => {
    console.log(dish);

    return Dishes.findByIdAndUpdate(dish._id, { $set: { description: 'Updated test'} },{new: true }).exec();
})
.then((dish) => {
    console.log(dish);

    dish.comments.push({
        rating: 5,
        comment: 'I\'m getting a sinking feeling!',
        author: 'Leonardo di Carpaccio'
    });

    return dish.save();
})
.then((dish) => {
    console.log(dish);

    return Dishes.find({});
})
.then((dishes)=> {
    //See doing just dishes doesn't print comments out, the comment field will return [object], hence we Stringify it, and null,4 actually
    //Gives the line breaks and spaces now because it gets printed as a sting 
    console.log(`Finding the documents->\n`,JSON.stringify(dishes,null,4));

    return Dishes.remove({});
})
.then(() => {

    return mongoose.connection.close();
}).catch((err) => {
        console.log(err);
    })
}).catch((err)=>console.log(err)
);
