const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Creating the new schema for dishes
const dishSchema= new Schema({

    name:{
        type:String,
        required:true,
        unique:true,
    },

    description: {
        type:String,
        required:true,
    }
},{
    //Adds createdAt and updatedAt in the documents and automatically updates the documents 
    timestamps: true
});

//In mongoose this takes Dish as Dishes, not as Dish, mongoDB automatically has a system to take in plural forms 
var Dishes = mongoose.model('Dish',dishSchema);

//Exporting for encapsulation and importing 
module.exports= Dishes;