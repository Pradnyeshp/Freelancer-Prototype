let mongo = require('./mongo');
const ObjectId = require('mongodb').ObjectId;

function handle_request( msg, callback) {

    console.log("In handle request:"+ JSON.stringify(msg));

    const pid = msg.pid;
    const o_id = new ObjectId(pid);

    mongo.connect( (err, db) => {
        if(err) throw err;
        else {
            db.collection('projects').updateOne( { _id : o_id }, { $set : { comment : msg.comment }}, (err, result) => {
                if(err) throw err;
                else {
                    callback(null, result)
                }
            })
        }
    })
}

exports.handle_request = handle_request;