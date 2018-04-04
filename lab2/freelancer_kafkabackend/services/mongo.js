let mongoClient = require('mongodb').MongoClient;
let url = 'mongodb://localhost:27017/freelancer';

exports.connect = (callback) => {
    mongoClient.connect(url, { poolSize: 30 }, (err, db) => {
        if(err) {
            console.log("Error in connecting to mongodb", err)
        } else {
            callback(err, db);
        }
    });
}
