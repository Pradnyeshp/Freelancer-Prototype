var mongo = require('mongodb');
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
const bcrypt = require('bcryptjs');

function handle_request(msg, callback){

    console.log("In handle request:"+ JSON.stringify(msg));

    MongoClient.connect( url, function(err, connection) {
        if (err) throw err;
        else {
            let dbo = connection.db("freelancer");
            var query = { username : msg.username };
            dbo.collection("users").find(query).toArray(function(err, result) {
                if (err) throw err;
                else {
                    if(result.length > 0)
                    {
                        console.log(result)
                        var hash = result[0].password
                        bcrypt.compare( msg.password, hash , (err, match) => {
                            if (err)  return done(err);
                            if(match) {
                                console.log("In Password Match..", result[0].username)
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