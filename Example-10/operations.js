const assert=require('assert');

//Takes 4 parameters and is exported by this node module 
exports.insertDocument = (db, document, collection, callback)=>{
    //Accessing the collection here 
    const coll=db.collection(collection);
    //See here insert is a function supported by MongoDB 
    coll.insert(document,(err,result)=>{
        //Assertion 
        assert.equal(err,null); 
        //See that result parameter contains a Javascript object with one of the values called N - Number 
        console.log(`Inserted ${result.result.n} documents into the collection ${collection}`);
        callback(result);
    });
}; 

//All documents, so need of document parameter 
exports.findDocuments = (db, collection, callback)=>{
    const coll=db.collection(collection);
    coll.find({}).toArray((err,docs)=>{
        assert.equal(err,null);
        callback(docs);
    });
};

exports.removeDocument = (db, document, collection, callback)=>{
    const coll=db.collection(collection); 
    coll.deleteOne(document,(err,result)=>{
        assert.equal(err,null);
        console.log(`Removed the document`,document);
        callback(result);
    })

};

exports.updateDocument = (db, document, update, collection, callback)=>{
    const coll=db.collection(collection);

};

