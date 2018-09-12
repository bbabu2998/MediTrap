var MongoClient = require('mongodb').MongoClient
    , format = require('util').format;
MongoClient.connect('mongodb://127.0.0.1:27017/login', function (err, db) {
    if (err) {
        throw err;
        console.log("problem in the connection...");
    } else {
        console.log("successfully connected to the database");
    }
    db.close();
});
