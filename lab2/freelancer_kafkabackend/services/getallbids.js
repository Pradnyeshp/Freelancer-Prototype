let mongo = require('./mongo');
const ObjectId = require('mongodb').ObjectId;

function handle_request( msg, callback) {

    console.log("In handle request:"+ JSON.stringify(msg));

    let pid = msg.projectid;
    let o_id = new ObjectId(pid);

    mongo.connect( (err, db) => {
        if(err) throw err;
        else {
            let query = { projectid : o_id };
            db.collection("bids").find(query).toArray( (err, result) => {
                if(err) throw err;
                else {
                    callback(null, result)
                }
            })
        }
    })
}

exports.handle_request = handle_request;