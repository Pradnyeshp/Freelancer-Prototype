let mongo = require('./mongo');

function handle_request( msg, callback) {

    console.log("In handle request:"+ JSON.stringify(msg));

    mongo.connect( (err, connection) => {
        if(err) throw err;
        else {
            let dbo = connection.db("freelancer");
            let query = { username : msg.username };
            dbo.collection('users').find(query).toArray( (err, result) => {
                    if(err) throw err;
                    else {
                        console.log("User Found In DB");
                        console.log(result);
                        callback(null, result);
                    }
                }
            )
        }
    })

}

exports.handle_request = handle_request;