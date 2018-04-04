let mongo = require('./mongo');

function handle_request( msg, callback) {

    console.log("In handle request:"+ JSON.stringify(msg));

    mongo.connect( (err, db) => {
        if(err) throw err;
        else {
            db.collection('projects').find().toArray( (err, result) => {
                if(err) throw err
                if( result.length === 0 ) {
                    callback(null, "No Project found in database")
                }
                else {
                    callback(null, result)
                }
            })
        }
    })
}

exports.handle_request = handle_request;