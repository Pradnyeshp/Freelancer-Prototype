let mongo = require('./mongo');

function handle_request( msg, callback) {

    console.log("In handle request:"+ JSON.stringify(msg));

    mongo.connect( (err, db) => {
        if(err) throw  err
        else {
            db.collection("projects").find({}).toArray(function(err, result) {
                if (err) throw err;
                else {
                    console.log( 'All the Projects from Database are as follows ' , result);
                    callback(null, result)
                }
            });
        }
    })
}

exports.handle_request = handle_request;