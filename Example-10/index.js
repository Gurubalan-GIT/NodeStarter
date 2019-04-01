const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const dboperation=require('./operations');


const url = 'mongodb://localhost:27017/';
const dbname = 'conFusion';

//Connecting to the MongoDB Server and (err,client) call back takes place 
MongoClient.connect(url, (err, client) => {

    //Will give an error if it is not connected properly, this is where assert is used 
    assert.equal(err,null);

    console.log('Connected correctly to server');

    //Connecting the database here 
    const db = client.db(dbname);
    //Inserting document by accessing database
    dboperation.insertDocument(db,{name:"Gurubalan", description: "Some test data"},'dishes',(result)=>{ //here (result) is the callback function
        console.log('Insert document:\n',result.ops); //result.ops gives the number 

        //Finding documents here and printing them
        dboperation.findDocuments(db,'dishes',(docs)=>{
            console.log('Found documents:\n',docs);

            //Here we are updating document by finding the documents with name - Gurubalan and updating the description part alone
            dboperation.updateDocument(db,{name: "Gurubalan"},{description: "Updated Test data"},'dishes',(result)=>{ 

                console.log('Updated records/document:\n',result.result)

                //Finding once again and dropping the collection we created 
                dboperation.findDocuments(db,'dishes',(docs)=>{
                    console.log('Found documents:\n',docs);
                    
                    db.dropCollection('dishes',(result)=>{
                        console.log('Dropped collection: ',result);

                        //Closing the client connection pools
                        client.close();
                    });
                });
            });
        });
    });
});
//Since everything is nested inside callbacks here, once a callback is completed only then the body gets executed further