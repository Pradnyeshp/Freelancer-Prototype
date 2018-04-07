let mongo = require('./mongo');
const ObjectId = require('mongodb').ObjectId;

function handle_request( msg, callback) {

    console.log("In handle request:"+ JSON.stringify(msg));

    let pid = msg.projectid;
    let o_id = new ObjectId(pid);

    mongo.connect( (err, db) => {
        if(err) throw err;
        else {
            db.collection('projects').find({ _id : o_id }).toArray((err, result) => {
                if(err) throw err;
                else {
                    callback(null, result)
                }
            })
        }
    })
}

exports.handle_request = handle_request;