let mongoClient = require('mongodb').MongoClient;
let url = 'mongodb://pradnyesh:16071993@ds237979.mlab.com:37979/freelancer';

exports.connect = (callback) => {
    mongoClient.connect(url, { poolSize: 30 }, (err, db) => {
        if(err) {
            console.log("Error in connecting to mongodb", err)
        } else {
            callback(err, db);
        }
    });
};
