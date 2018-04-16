let mongo = require('./mongo');

function handle_request( msg, callback) {

    console.log("In handle request:"+ JSON.stringify(msg));

    mongo.connect( (err, db) => {
        if(err) {
            console.log(err);
            db.close();
            throw err;
        }
        else {
            db.collection('users').find({username: msg.query.username}).toArray((err, result) => {
                if(err) {
                    console.log(err);
                    db.close();
                    callback( null, 'No Image found' );
                    // res.json('No Image found');
                } else {
                    db.close();
                    console.log(result);
                    callback(null, {image_name: result[0]} )
                    // res.json({image_name: result[0]});
                }
            })
        }
    })
}

exports.handle_request = handle_request;