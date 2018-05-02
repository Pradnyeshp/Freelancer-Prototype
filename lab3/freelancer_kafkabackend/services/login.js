let mongo = require('./mongo');

const bcrypt = require('bcryptjs');

function handle_request(msg, callback){

    console.log("In handle request:"+ JSON.stringify(msg));

    mongo.connect( (err, db) => {
        if (err) throw err;
        else {
            let query = { username : msg.username };
            db.collection("users").find(query).toArray(function(err, result) {
                if (err) throw err;
                else {
                    if(result.length > 0)
                    {
                        console.log(result);
                        let hash = result[0].password;
                        bcrypt.compare( msg.password, hash , (err, match) => {
                            if (err)  return done(err);
                            if(match) {
                                console.log("In Password Match..", result[0].username);
                                callback(null, result);
                            }
                            else {
                                callback(null, []);
                            }
                        })
                    } else {
                        callback(null, []);
                    }
                }});
        }});
}

exports.handle_request = handle_request;