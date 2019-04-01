const MongoClient = require('mongodb').MongoClient;
const dboperation=require('./operations');


const url = 'mongodb://localhost:27017/';
const dbname = 'conFusion';

//Connecting to the MongoDB Server and (err,client) call back takes place 
MongoClient.connect(url).then((client) => {
    
    console.log('Connected correctly to server');
    //Connecting the database here 
    const db = client.db(dbname);
    //Inserting document by accessing database
    dboperation.insertDocument(db,{name:"Gurubalan", description: "Some test data"},'dishes').then((result)=>{ 
        console.log('Insert document:\n',result.ops); //result.ops gives the number 

        //Finding documents here and printing them
        return dboperation.findDocuments(db,'dishes');
        
    }).then((docs)=>{
            console.log('Found documents:\n',docs);

            //Here we are updating document by finding the documents with name - Gurubalan and updating the description part alone
            return dboperation.updateDocument(db,{name: "Gurubalan"},{description: "Updated Test data"},'dishes');

    }).then((result)=>{ 

                console.log('Updated records/document:\n',result.result)

                //Finding once again and dropping the collection we created 
                return dboperation.findDocuments(db,'dishes');
    }).then((docs)=>{
                    console.log('Found documents:\n',docs);
                    
                    return db.dropCollection('dishes');
    }).then((result)=>{
                        console.log('Dropped collection: ',result);

                        //Closing the client connection pools
                        return client.close();
    })

    .catch((err) => console.log(err));
})
.catch((err)=>{
    console.log(err)
});
//Callback hell is avoided with promises 
//No more assertion required 