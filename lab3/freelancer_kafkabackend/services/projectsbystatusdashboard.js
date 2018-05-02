let mongo = require('./mongo');

function handle_request( msg, callback) {

    console.log("In handle request : "+ JSON.stringify(msg));

    mongo.connect( (err, db) => {
        if(err) throw err;
        else {
            db.collection("projects").find({ status : msg.status,  employer : msg.username }).toArray(function(err, result) {
                if(err) throw err;
                else {
                    callback(null, result)
                }
            })
        }
    })
}

exports.handle_request = handle_request;