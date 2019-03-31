const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const url = 'mongodb://localhost:27017/';
const dbname = 'conFusion';

//Connecting to the MongoDB Server and (err,client) call back takes place 
MongoClient.connect(url, (err, client) => {

    //Will give an error if it is not connected properly, this is where assert is used 
    assert.equal(err,null);

    console.log('Connected correctly to server');

    //Connecting the database here 
    const db = client.db(dbname);
    //We are accessing the collecion we created here 
    const collection = db.collection("dishes");
    //Insertion of the first value (Document)
    collection.insertOne({"name": "Uthappizza", "description": "test"},

    //2nd argument to the callback function and we check after insertion what action is to be done
    (err, result) => {
        //Assertion again confirming no errors are present
        assert.equal(err,null);

        console.log("After Insert:\n");
        console.log(result.ops);

        //Fetching and finding out all jSON objects by giving an empty jSON string {} and converting it into an array
        collection.find({}).toArray((err, docs) => { //Takes another parameter
            assert.equal(err,null);
            
            console.log("Found:\n");
            console.log(docs);//Will return all the documents from the collection conFusion

            //dropping the collection dishes, first parameter is the collection name and second is a callback which returns a result/Error
            db.dropCollection("dishes", (err, result) => {
                assert.equal(err,null);

                //Closing the connection pool with MongoDB
                client.close();
            });
        });
    });

});