//Takes 4 parameters and is exported by this node module 
exports.insertDocument = (db, document, collection, callback)=>{
    //Accessing the collection here 
    const coll=db.collection(collection);
    //See here insert is a function supported by MongoDB 
    //Using promises to return and avoid callback hell
    return coll.insertOne(document);
}; 

//All documents, so need of document parameter 
exports.findDocuments = (db, collection, callback)=>{
    const coll=db.collection(collection);
    return coll.find({}).toArray();
};

exports.removeDocument = (db, document, collection, callback)=>{
    const coll=db.collection(collection); 
    return coll.deleteOne(document);

};

exports.updateDocument = (db, document, update, collection, callback)=>{
    const coll=db.collection(collection);
    return coll.updateOne(document,{$set:update},null);
};

